<template>
  <div class="auth-container">
    <!-- Find Your Password - STEP 1 -->
    <div v-if="!nextStep">
      <div class="type">
        <h3>Find Your Password</h3>
      </div>

      <b-field>
        <b-input v-model="email" type="email" required placeholder="Email">
        </b-input>
      </b-field>

      <b-field grouped>
        <b-input v-model="verifyCode" required placeholder="Email Verification">
        </b-input>
        <p class="control">
          <span @click="sendCode">Send Code</span>
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

      <div class="submit">
        <Button text="Reset" @click.native="resetPassword" />
      </div>
    </div>
  </div>
</template>

<script>
import validEmail from '~/components/utils/validEmail'
import Button from '~/components/utils/Button.vue'

export default {
  layout: 'auth',
  components: { Button },
  data() {
    return {
      nextStep: false,
      email: '',
      verifyCode: '',
      password: '',
      rePassword: ''
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
        this.$message.open({
          message: 'valid email, go send code Herry!',
          type: 'is-success'
        })
      } else {
        this.$message.open({
          message: 'Please provide valid Email.',
          type: 'is-warning'
        })
      }
    },
    goNext() {
      if (validEmail(this.email) && this.verifyCode) {
        this.$message.open({
          message: 'valid email, go verify code Herry!',
          type: 'is-success'
        })
        this.nextStep = true
      } else {
        this.$message.open({
          message: 'Please provide valid info.',
          type: 'is-warning'
        })
      }
    },
    resetPassword() {
      if (validEmail(this.email) && this.password && this.samePassword) {
        this.$message.open({
          message: 'valid form, go reset password Herry!',
          type: 'is-success'
        })
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
