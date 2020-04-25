<template>
  <div>
    <!-- Nav Bar -->
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

    <!-- Content -->
    <section class="main-content">
      <nuxt />
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="wrapper columns">
          <div class="column is-2">
            <img src="~assets/images/logo.svg" alt="TicMeet Brand Logo" />
          </div>
          <div class="column is-offset-6 is-4">
            <p>Copyright © 2020 Mobvoi, Inc. <br />All Rights Reserved.</p>
          </div>
          <!-- <div class="column is-three-fifths">
            <div class="columns">
              <div class="column is-one-third">
                <div class="category">
                  <h5>Product</h5>
                  <span>How It Works</span>
                  <span>Plans</span>
                </div>
              </div>
              <div class="column is-one-third">2</div>
              <div class="column is-one-third">3</div>
            </div>
          </div>
          <div class="column is-offset-one-fifth is-one-fifths">
            <p>Follow Us</p>
            <a href="facebook.com">
              <b-icon icon="facebook"></b-icon>
            </a>
            <a href="facebook.com">
              <b-icon icon="twitter"></b-icon>
            </a>
            <a href="facebook.com">
              <b-icon icon="instagram"></b-icon>
            </a>
            <a href="facebook.com">
              <b-icon icon="youtube"></b-icon>
            </a>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const endpoint = 'https://passport.mobvoi.com/pages'
export default {
  layout: 'default',
  data() {
    return {
      login: `${endpoint}/login?lang=en-us&from=secretary-oversea&redirect_url=${process.env.returnUrl}`,
      signup: `${endpoint}/register?lang=en-us&from=secretary-oversea&redirect_url=${process.env.returnUrl}`
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

footer {
  background: $background;

  .wrapper {
    width: 85%;
    margin: 0 auto;
  }
}
</style>
