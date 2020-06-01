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
        password-reveal
        required
        placeholder="Password"
      >
      </b-input>
    </b-field>

    <b-field
      :type="samePassword ? '' : 'is-danger'"
      :message="samePassword ? '' : 'The passwords are not the same.'"
    >
      <b-input
        v-model="rePassword"
        type="password"
        password-reveal
        required
        placeholder="Re-Password"
      >
      </b-input>
    </b-field>

    <!-- <b-field grouped>
      <b-input v-model="captcha" required placeholder="Captcha"> </b-input>
      <div class="control captcha">
        <img src="~assets/images/sample-code.png" alt="ReCaptcha" />
      </div>
    </b-field> -->

    <b-field grouped>
      <b-input v-model="verifyCode" required placeholder="Email Verification">
      </b-input>
      <p class="control">
        <span @click="sendCode">Send Code</span>
      </p>
    </b-field>

    <div class="field checkbox">
      <b-checkbox v-model="agreeItem">
        <span>
          Agree with the
          <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          and
          <a href="/terms-of-services" target="_blank">Terms of Use</a>
        </span>
      </b-checkbox>
    </div>

    <div class="submit">
      <Button text="Sign Up" @click.native="submit" />
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

import validEmail from '~/components/utils/validEmail'
import Button from '~/components/utils/Button.vue'

// @TODO
// enum captcha api type
export default {
  layout: 'auth',
  components: { Button },
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      // captcha: '',
      verifyCode: '',
      agreeItem: false
    }
  },
  computed: {
    samePassword() {
      return this.password === this.rePassword
    }
  },
  methods: {
    sendCode() {
      if (validEmail(this.email)) {
        // this.$message.open({
        //   message: 'valid email, go send code Herry!',
        //   type: 'is-success'
        // })
        const timestamp = Date.now()
        this.$accountAxios({
          method: 'GET',
          url: '/api/captcha/email',
          params: {
            email: this.email,
            usage: 1,
            lang: 2
          },
          headers: {
            appkey: process.env.APP_KEY,
            sign: CryptoJS.SHA256(
              `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
            ).toString(CryptoJS.enc.Hex),
            timestamp
          }
        })
      } else {
        this.$message.open({
          message: 'Please provide valid info.',
          type: 'is-warning'
        })
      }
    },
    async submit() {
      if (
        validEmail(this.email) &&
        this.password &&
        this.samePassword &&
        // this.captcha &&
        this.verifyCode &&
        this.agreeItem
      ) {
        // this.$message.open({
        //   message: 'valid form, go register Herry!',
        //   type: 'is-success'
        // })
        // const timestamp = Date.now()
        // await this.$accountAxios({
        //   method: 'POST',
        //   url: '/api/captcha/verify',
        //   data: {
        //     key: 1,
        //     type: 2,
        //     usage: 1,
        //     value: this.verifyCode
        //   },
        //   headers: {
        //     appkey: process.env.APP_KEY,
        //     sign: CryptoJS.SHA256(
        //       `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
        //     ).toString(CryptoJS.enc.Hex),
        //     timestamp
        //   }
        // })
        await this.$accountAxios({
          method: 'POST',
          url: '/v2/register',
          params: {
            origin: process.env.APP_KEY
          },
          data: {
            email: this.email,
            origin: process.env.APP_KEY,
            password: CryptoJS.MD5(this.password).toString(),
            type: 'email',
            captcha_value: this.verifyCode,
            usage: 'register'
          }
        })
        this.$router.replace({ path: '/auth/login' })
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
.checkbox {
  margin-top: 1rem;
}

/deep/ .field.is-grouped {
  justify-content: space-between;
  align-items: center;

  .help.is-danger {
    display: none;
  }
}

.captcha.control {
  height: 3rem;

  img {
    height: 3rem;
  }
}

/deep/ .control-label a {
  color: $primary;
}

.submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @include touch {
    justify-content: center;
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
