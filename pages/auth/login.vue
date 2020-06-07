<template>
  <div class="auth-container">
    <div class="type">
      <nuxt-link to="/auth/sign-up">Sign Up</nuxt-link>
      <nuxt-link to="/auth/login">Login</nuxt-link>
    </div>
    <b-field>
      <b-input v-model="email" type="email" required placeholder="Email">
      </b-input>
    </b-field>

    <b-field>
      <b-input
        v-model="password"
        type="password"
        required
        password-reveal
        placeholder="Password"
      >
      </b-input>
    </b-field>
    <b-field grouped>
      <b-input v-model="captcha" required placeholder="Captcha"> </b-input>
      <div class="control captcha">
        <img :src="captchaUrl" alt="ReCaptcha" @click="() => fetchCaptcha()" />
      </div>
    </b-field>
    <div class="submit">
      <Button text="Login" @click.native="submit" />
      <nuxt-link to="/auth/forget-password">Forget Password</nuxt-link>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { get, random } from 'lodash-es'

import validEmail from '~/components/utils/validEmail'
import Button from '~/components/utils/Button.vue'

export default {
  name: 'Login',
  layout: 'auth',
  components: { Button },
  data() {
    return {
      email: '',
      password: '',
      captcha: '',
      captchaUrl: '',

      randomCode: '' // Used for request payload
    }
  },
  mounted() {
    this.fetchCaptcha()
  },
  methods: {
    generateRandomCode(length = 4) {
      const codeArray = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
        ''
      )
      let randomCode = ''
      for (let i = 0; i < length; i++) {
        randomCode += codeArray[random(0, codeArray.length - 1)]
      }
      return randomCode
    },
    async fetchCaptcha() {
      const timestamp = Date.now()
      const randomCode = (this.randomCode = this.generateRandomCode())
      const data = await this.$accountAxios({
        method: 'GET',
        url: '/api/captcha/img',
        params: {
          random_code: randomCode
        },
        responseType: 'blob',
        headers: {
          appkey: process.env.APP_KEY,
          sign: CryptoJS.SHA256(
            `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
          ).toString(CryptoJS.enc.Hex),
          timestamp
        }
      })
      this.captchaUrl = URL.createObjectURL(data)
    },
    async submit() {
      if (validEmail(this.email) && this.password && this.captcha) {
        // this.$message.open({
        //   message: 'valid form, go login Herry!',
        //   type: 'is-success'
        // })
        const timestamp = Date.now()
        try {
          const verifyRes = await this.$accountAxios({
            method: 'POST',
            url: '/api/captcha/verify',
            data: {
              key: this.randomCode,
              type: 0,
              usage: 3,
              value: this.captcha
            },
            headers: {
              appkey: process.env.APP_KEY,
              sign: CryptoJS.SHA256(
                `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
              ).toString(CryptoJS.enc.Hex),
              timestamp
            }
          })
          if (verifyRes.err_code !== 0) {
            return
          }
          const res = await this.$accountAxios({
            method: 'POST',
            url: '/v2/login',
            params: {
              origin: process.env.APP_KEY
            },
            data: {
              need_captcha: false,
              email: this.email,
              origin: process.env.APP_KEY,
              password: CryptoJS.MD5(this.password).toString(),
              usage: 'login'
              // need_captcha: true,
              // random_code: this.randomCode,
              // captcha_value: this.captcha,
              // type: 0
            }
          })
          this.$store.commit('auth/PUT_AUTH_INFO', {
            ...get(res, 'base_info', {}),
            token: get(res, 'token')
          })
          // @workaround
          // Sync login session to server side
          this.$cookies.set('ww_token', get(res, 'token'), {
            path: '/',
            maxAge: 60 * 60 * 1,
            sameSite: true
          })
          this.$message.open({
            message: 'Success',
            type: 'is-success'
          })
          this.$router.push({ path: '/call-history' })
        } catch (_) {}
      } else {
        this.$message.open({
          message: 'Please provide valid info.',
          type: 'is-warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.captcha.control {
  height: 3rem;

  img {
    height: 3rem;
  }
}
.submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @include touch {
    justify-content: center;
    flex-direction: column-reverse;

    a {
      align-self: baseline;
      margin-bottom: 2rem;
    }
  }

  a {
    color: $primary;
    font-weight: bold;
  }

  /deep/ button {
    min-height: 0;
    background: $primary;

    span {
      font-size: 18px;
    }
  }
}

/* Auth Layout Style */
.auth-container {
  width: 500px;
  background-color: $white;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  margin-top: 3rem;

  @include touch {
    padding: 3rem 2rem;
  }

  .type {
    margin-bottom: 2rem;

    a {
      font-size: 1.5rem;
      color: $secondary-text-color;
      display: inline;
      margin-right: 1rem;

      &.nuxt-link-active {
        color: $dark;
        font-weight: bold;
      }
    }
  }
}

/deep/ input {
  background: #f3f6f8;
  border-color: transparent;
  box-shadow: none;
  border-radius: 8px;
  color: $dark;
  height: 3.4rem;
}

/deep/ .icon.is-right {
  top: calc((3.4rem - 2.25em) / 2);
}
</style>
