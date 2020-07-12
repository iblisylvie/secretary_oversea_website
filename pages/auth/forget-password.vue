<template>
  <div class="auth-container">
    <!-- Find Your Password - STEP 1 -->
    <div v-if="!nextStep">
      <div class="type">
        <h3>Find Your Password</h3>
        <p>
          Enter your email, and we’ll send you a code to reset your password.
        </p>
      </div>

      <b-field>
        <b-input
          key="email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
        >
        </b-input>
      </b-field>

      <b-field grouped>
        <b-input v-model="verifyCode" required placeholder="Email Verification">
        </b-input>
        <p class="control">
          <t-button
            type="secondary"
            class="send-code"
            :disabled="!sendCodeAvaliable"
            @click="sendCode"
          >
            {{ sendCodeText }}
          </t-button>
          <!-- <span @click="sendCode">Send Code</span> -->
        </p>
      </b-field>

      <div class="submit">
        <Button text="Next" @click.native="goNext" />
      </div>
    </div>

    <!-- Reset Your Password - STEP 2 -->
    <div v-if="nextStep">
      <div class="type">
        <h3>Reset Your Password</h3>
      </div>

      <b-field>
        <b-input
          key="password"
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
          key="rePassword"
          v-model="rePassword"
          type="password"
          password-reveal
          required
          placeholder="Re-Password"
        >
        </b-input>
      </b-field>

      <div class="submit">
        <Button text="Reset" @click.native="resetPassword" />
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash-es'
import CryptoJS from 'crypto-js'

import validEmail from '~/components/utils/validEmail'
import Button from '~/components/utils/Button.vue'

export default {
  name: 'ForgetPassword',
  layout: 'auth',
  components: { Button },
  data() {
    return {
      nextStep: false,
      email: '',
      verifyCode: '',
      password: '',
      rePassword: '',

      sendCodePending: false,
      sendCodeCountdown: 60,
      sendCodeText: 'Send Code'
    }
  },
  computed: {
    samePassword() {
      return this.password === this.rePassword
    },
    sendCodeAvaliable() {
      return validEmail(this.email) && this.sendCodeCountdown === 60
    }
  },
  watch: {
    sendCodePending(newVal) {
      if (newVal) {
        const timer = setInterval(() => {
          if (this.sendCodeCountdown === 0) {
            timer && clearInterval(timer)
            this.sendCodeText = 'Send Code'
            this.sendCodeCountdown = 60
            return
          }
          this.sendCodeText = `Sent ${this.sendCodeCountdown--}s`
        }, 1000)
      }
    }
  },
  methods: {
    async sendCode() {
      if (this.sendCodePending) {
        return
      }
      if (!validEmail(this.email)) {
        this.$message.open({
          message: 'Please provide valid info.',
          type: 'is-warning'
        })
        return
      }
      this.sendCodePending = true
      const timestamp = Date.now()
      await this.$accountAxios({
        method: 'GET',
        url: '/api/captcha/email',
        params: {
          email: this.email,
          usage: 6,
          lang: 4
        },
        headers: {
          appkey: process.env.APP_KEY,
          sign: CryptoJS.SHA256(
            `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
          ).toString(CryptoJS.enc.Hex),
          timestamp
        }
      })
      this.sendCodePending = false
    },
    async goNext() {
      if (validEmail(this.email) && this.verifyCode) {
        // this.$message.open({
        //   message: 'valid email, go verify code Herry!',
        //   type: 'is-success'
        // })
        const timestamp = Date.now()
        const res = await this.$accountAxios({
          method: 'POST',
          url: '/api/captcha/verify',
          data: {
            key: this.email,
            type: 2,
            usage: 6,
            value: this.verifyCode
          },
          headers: {
            appkey: process.env.APP_KEY,
            sign: CryptoJS.SHA256(
              `${process.env.APP_KEY}${process.env.APP_SECRET}${timestamp}`
            ).toString(CryptoJS.enc.Hex),
            timestamp
          }
        })
        if (get(res, 'err_code') === 0) {
          this.nextStep = true
        }
      } else {
        this.$message.open({
          message: 'Please provide valid info.',
          type: 'is-warning'
        })
      }
    },
    async resetPassword() {
      if (validEmail(this.email) && this.password && this.samePassword) {
        // this.$message.open({
        //   message: 'valid form, go reset password Herry!',
        //   type: 'is-success'
        // })
        const res = await this.$accountAxios({
          method: 'POST',
          url: '/v2/password/reset',
          params: {
            origin: process.env.APP_KEY
          },
          data: {
            need_captcha: false,
            usage: 'reset_pwd',
            type: 'email',
            email: this.email,
            origin: process.env.APP_KEY,
            new_password: CryptoJS.MD5(this.password).toString()
          }
        })
        if (get(res, 'err_code') === 0) {
          this.$router.push({ path: '/auth/login' })
        }
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

    h3 {
      font-size: 1.5rem;
      color: $secondary-text-color;
      display: inline;
      margin-right: 1rem;
      font-weight: bold;
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
