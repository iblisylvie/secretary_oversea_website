<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/images/logo.svg" alt="TicMeet Brand Logo" />
          <span class="level is-size-4 m-l-10">TicMeet</span>
        </b-navbar-item>
      </template>
      <template slot="start"> </template>

      <template slot="end">
        <b-navbar-item href="#">Product</b-navbar-item>
        <b-navbar-item href="#">How it works</b-navbar-item>
        <b-navbar-item href="#">Price</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link to="/signup" class="button is-primary">
              <strong>Sign up</strong>
            </nuxt-link>
            <nuxt-link to="/login" class="button is-light">
              <strong>Log in</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'default'
  // page component definitions
}
</script>
