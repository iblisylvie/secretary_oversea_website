<template>
  <section class="container">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-black has-text-centered">Login</h3>
      <hr class="login-hr" />

      <b-field label="Email">
        <b-input v-model="email" type="email" maxlength="30"> </b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal> </b-input>
      </b-field>
      <b-field>
        <b-checkbox>Remember Me</b-checkbox>
      </b-field>
      <b-button
        type="is-info"
        icon-right="login-variant"
        tag="router-link"
        to="/transcripts"
      >
        Login
      </b-button>
      <p class="has-text-grey m-t-20">
        <nuxt-link to="/signup">Sign Up</nuxt-link> &nbsp;·&nbsp;
        <a href="#">Forgot Password</a> &nbsp;·&nbsp;
        <a href="#">Need Help?</a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: 'John-Silver@gmail.com',
      password: 'iwantmytreasure'
    }
  }
}
</script>
