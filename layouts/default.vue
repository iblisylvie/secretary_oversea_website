<template>
  <div>
    <b-navbar spaced transparent wrapper-class="container" class="nav-bar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/images/logo.svg" alt="TicMeet Brand Logo" />
          <span class="level is-size-4 m-l-10">TicMeet</span>
        </b-navbar-item>
      </template>
      <template slot="start"></template>

      <template slot="end">
        <b-navbar-item href="#">Product</b-navbar-item>
        <b-navbar-item href="#">How it works</b-navbar-item>
        <b-navbar-item href="#">Price</b-navbar-item>
        <b-navbar-item href="#">FAQ</b-navbar-item>
        <b-navbar-item href="#">Contact Us</b-navbar-item>
        <b-navbar-item :href="signup" class="gradient">Sign Up</b-navbar-item>
        <b-navbar-item :href="login">Login</b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
const endpoint = 'https://passport.mobvoi.com/pages'
export default {
  layout: 'default',
  data() {
    return {
      login: `${endpoint}/login?lang=en-us&from=secretary-oversea&redirect_url=${process.env.RETURN_URL}`,
      signup: `${endpoint}/register?lang=en-us&from=secretary-oversea&redirect_url=${process.env.RETURN_URL}`
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
}

.gradient {
  background: -webkit-linear-gradient(0deg, #0084ff, #34ddff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
