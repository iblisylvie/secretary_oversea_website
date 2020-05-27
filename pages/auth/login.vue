<template>
  <div class="auth-container">
    <div class="type">
      <nuxt-link to="/auth/signup">Sign Up</nuxt-link>
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
    <div class="submit">
      <Button text="Login" @click.native="submit" />
      <nuxt-link to="/auth/forget-password">Forget Password</nuxt-link>
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
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      if (validEmail(this.email) && this.password) {
        this.$message.open({
          message: 'valid form, go login Herry!',
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
