<template>
  <div :class="{ variant: variant }">
    <!-- Nav Bar -->
    <b-navbar spaced transparent wrapper-class="container" class="nav-bar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/images/logo.svg" alt="HeyTico Brand Logo" />
          <span class="level is-size-4 m-l-10">HeyTico</span>
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
        <b-navbar-item tag="router-link" :to="{ path: '/faq' }">
          FAQ
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/contact' }">
          Contact Us
        </b-navbar-item>
        <b-navbar-item v-if="!user" :href="signup">Sign Up</b-navbar-item>
        <b-navbar-item v-if="!user" @click="login">Login</b-navbar-item>
        <b-navbar-item
          v-if="user"
          tag="router-link"
          :to="{ path: '/call-history' }"
        >
          Dashboard
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- Content -->
    <section class="main-content">
      <nuxt />
    </section>

    <!-- Footer -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,160L80,138.7C160,117,320,75,480,69.3C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg> -->

    <footer class="footer">
      <svg
        class="shape"
        viewBox="0 0 1440 187"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="variant ? '#eff5fc' : 'white'"
          d="M1440 31.4676C1303.69 13.442 1184.9 53.2617 1053.9 97.1755C906.948 146.433 744.634 200.841 524.999 184.543C326.115 169.785 157.821 91.991 0 0.81748V0H1440V31.4676Z"
        />
      </svg>
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
                  <router-link :to="{ path: '/terms-of-services' }">
                    Terms of Services
                  </router-link>
                  <router-link :to="{ path: '/privacy-policy' }">
                    Privacy Policy
                  </router-link>
                </div>
              </div>
              <div class="column is-one-half">
                <h5>Support</h5>
                <router-link :to="{ path: '/faq' }">FAQ</router-link>
                <router-link :to="{ path: '/contact' }">Contact Us</router-link>
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
      user: this.$store.getters['auth/loggedIn'],
      signup: `${endpoint}/register?lang=en-us&from=secretary-oversea&redirect_url=${process.env.returnUrl}/get-started`
    }
  },
  computed: {
    variant() {
      return this.$route.matched.map((r) => {
        return r.components.default.options
          ? r.components.default.options.layoutVariant
          : r.components.default.layoutVariant
      })[0]
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/LOGIN')
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

/deep/ .navbar-item {
  color: $colored-bg;

  &:hover {
    color: $colored-bg;
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
    align-items: flex-start;
    padding-left: 3rem;

    a {
      font-size: 18px;
      line-height: 60px;
      color: #141b24;
    }
  }

  /deep/ .navbar-burger span {
    background-color: $colored-bg;
    transition: background-color 0.5s;
  }

  /deep/ .is-active.navbar-burger {
    z-index: 999;
    position: fixed;
    right: 1rem;

    span {
      background-color: $dark;
    }
  }
}

footer {
  position: relative;
  padding-bottom: 16px;
  overflow: hidden;
  padding-top: 16rem;
  margin-top: -5rem;
  z-index: -1;
  background-image: linear-gradient(90deg, #00a3ff 20.21%, #335ffe 83.61%);

  @include mobile {
    margin-top: 0rem;
    padding-top: 8rem;

    .mobile-flex {
      display: flex;
    }
  }

  .shape {
    width: 105%;
    position: absolute;
    top: 0;
    left: -1.5rem;
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
    color: $white;
    margin-bottom: 25px;

    @include mobile {
      font-size: 14px;
      margin-bottom: 14px;
      font-weight: bold;
    }
  }

  a,
  span {
    font-size: 14px;
    color: $colored-bg;
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
      color: $colored-bg;
      margin-right: 12px;
    }

    a {
      display: inline;
    }
  }

  p.copyright {
    text-align: center;
    margin-top: 32px;
    color: $colored-bg;

    @include mobile {
      text-align: left;
    }
  }
}

/** for layout with white header and colored background */
.variant {
  background: $colored-bg;

  .navbar {
    background: white;
    padding: 0;

    /deep/ .navbar-item {
      color: $dark;
    }

    /deep/ .nuxt-link-exact-active {
      color: $primary;
    }

    /deep/ .navbar-burger span {
      background-color: $dark;
    }
  }

  .footer {
    z-index: 0;
  }
}
</style>
