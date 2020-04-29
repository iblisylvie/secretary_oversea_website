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

      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/', hash: 'product' }">
          Product
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/', hash: 'how-it-works' }"
        >
          How it works
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/', hash: 'pricing' }">
          Pricing
        </b-navbar-item>
        <b-navbar-item href="#">FAQ</b-navbar-item>
        <b-navbar-item href="#">Contact Us</b-navbar-item>
        <b-navbar-item :href="signup">Sign Up</b-navbar-item>
        <b-navbar-item :href="login">Login</b-navbar-item>
      </template>
    </b-navbar>

    <!-- Content -->
    <section class="main-content">
      <nuxt />
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="bg-shape">
        <img src="~assets/images/shape-2.png" alt="Footer Shape" />
      </div>
      <div class="container">
        <div class="wrapper columns">
          <div class="column is-three-fifths">
            <div class="columns mobile-flex">
              <div class="column is-one-half">
                <div class="category">
                  <h5>Product & Services</h5>
                  <router-link :to="{ path: '/', hash: 'pricing' }">
                    Plans
                  </router-link>
                  <span>Terms of Services</span>
                  <span>Privacy Policy</span>
                </div>
              </div>
              <div class="column is-one-half">
                <h5>Support</h5>
                <span>FAQ</span>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
          <div class="column is-offset-one-fifth is-one-fifths community">
            <h5>Community</h5>
            <a href="https://www.instagram.com/mobvoi/" target="__blank">
              <b-icon icon="instagram"></b-icon>
            </a>
            <a href="https://www.facebook.com/MobvoiTicWatch/" target="__blank">
              <b-icon icon="facebook"></b-icon>
            </a>
            <a href="https://twitter.com/Mobvoi_Official" target="__blank">
              <b-icon icon="twitter"></b-icon>
            </a>
            <a href="https://www.linkedin.com/company/mobvoi/" target="__blank">
              <b-icon icon="linkedin"></b-icon>
            </a>
          </div>
        </div>
      </div>
      <p class="copyright">
        {{ new Date().getFullYear() }} Made with love from © Mobvoi Inc. ♥
      </p>
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

  @include mobile {
    .navbar-brand {
      padding: 2rem;
    }
  }
}

/deep/ .navbar-brand {
  padding: 1rem;
}

@include mobile {
  /deep/ .navbar-end {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: scroll;
    width: 100vw;
    height: 100vh;
    background: $colored-bg;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      font-size: 18px;
      line-height: 48px;
      color: #141b24;
    }
  }

  /deep/ .is-active.navbar-burger {
    z-index: 999;
    position: fixed;
    right: 1rem;
  }
}

footer {
  position: relative;
  background: $colored-bg;
  padding-bottom: 16px;
  padding-top: 0;
  margin-top: 3rem;

  @include mobile {
    margin-top: 8rem;

    .mobile-flex {
      display: flex;
    }
  }

  .bg-shape {
    position: absolute;
    z-index: -2;
    left: 0;
    top: -220px;

    @include mobile {
      top: -80px;
    }
  }

  .wrapper {
    width: 85%;
    margin: 0 auto;

    @include mobile {
      width: 100%;
    }
  }

  h5 {
    font-size: 16px;
    color: $dark;
    margin-bottom: 25px;

    @include mobile {
      font-size: 14px;
      margin-bottom: 14px;
    }
  }

  a,
  span {
    font-size: 14px;
    color: #59687a;
    display: block;
    margin-bottom: 21px;

    @include mobile {
      font-size: 12px;
      margin-bottom: 12px;
    }
  }

  .community {
    span.icon {
      display: inline;
      color: $dark;
      margin-right: 12px;
    }

    a {
      display: inline;
    }
  }

  p.copyright {
    text-align: center;
    margin-top: 32px;

    @include mobile {
      text-align: left;
    }
  }
}
</style>
