<template>
  <section class="container">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-black has-text-centered">Sign Up</h3>
      <hr class="login-hr" />

      <b-field label="Email">
        <b-input v-model="email" type="email" maxlength="30"> </b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal> </b-input>
      </b-field>

      <b-field label="Repeat Password">
        <b-input v-model="repeatPassword" type="password" password-reveal>
        </b-input>
      </b-field>

      <b-button
        type="is-info"
        icon-right="login-variant"
        tag="router-link"
        to="/transcripts"
      >
        Sign Up
      </b-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: ''
    }
  }
}
</script>
