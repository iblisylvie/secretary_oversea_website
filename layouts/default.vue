<template>
  <div :class="{ variant: variant }">
    <!-- Nav Bar -->
    <b-navbar spaced transparent wrapper-class="container" class="nav-bar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style="width: 1.8rem;"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :fill="variant ? '#02aefc' : 'white'"
              d="M35.4586 7.36686L31.249 5.17271C31.2039 5.14924 30.8794 4.98139 30.2752 4.66914C28.9996 4.00985 27.4505 4.01477 26.1797 4.68216L25.8392 4.86105C25.7033 4.93256 25.342 5.12533 24.7552 5.43936C24.6918 5.47331 24.6389 5.52215 24.6017 5.58106C24.4834 5.7685 24.5498 6.01024 24.75 6.121C25.3211 6.4369 25.6973 6.6422 25.8784 6.73688C27.2018 7.42845 29.6459 8.70727 33.2108 10.5734C34.8082 11.4096 35.7978 12.989 35.7978 14.7023V25.2801C35.7978 26.984 34.819 28.5563 33.2353 29.3962L24.3156 34.1266C24.1866 34.195 24.0286 34.1949 23.8998 34.1262L21.4096 32.7998C21.3969 32.793 21.3838 32.7869 21.3704 32.7813C19.9805 32.211 18.7157 32.2138 17.5761 32.7897C16.2605 33.4547 15.4819 34.9009 15.5807 36.236C15.6475 37.1383 16.047 37.9142 16.7792 38.5638C16.8518 38.6282 17.2716 38.8782 18.0386 39.3138C19.6157 40.2096 21.589 40.2297 23.1865 39.3661L35.5788 32.6675C38.3146 31.1887 40 28.4558 40 25.4982V14.5999C40 11.5962 38.262 8.82804 35.4586 7.36686ZM22.439 2.1477L22.8578 1.92044C22.9225 1.88529 22.9761 1.83462 23.013 1.77365C23.1276 1.5842 23.0564 1.34364 22.8541 1.23636C22.6346 1.12001 22.5041 1.0519 22.4625 1.03203L21.2041 0.430838C19.9398 -0.173214 18.4355 -0.140313 17.2027 0.518355L4.45985 7.32657C1.70222 8.79991 0 11.5442 0 14.5166V25.4794C0 28.4372 1.68561 31.1703 4.42184 32.6491L9.05368 35.1523C9.11769 35.1869 9.1903 35.2051 9.26422 35.2051C9.49678 35.2051 9.68532 35.0286 9.68532 34.8109V33.1985C9.68532 31.7826 8.86268 30.4788 7.53811 29.7953L6.90867 29.4706L6.8313 29.4308C5.21526 28.5997 4.21101 27.0106 4.21101 25.2845V14.713C4.21101 13.0213 5.17591 11.4584 6.74165 10.6139L22.439 2.1477ZM14.9491 15.3885C14.9491 14.1366 13.865 13.1218 12.5277 13.1218C11.1905 13.1218 10.1064 14.1366 10.1064 15.3885V20.3163C10.1064 21.5682 11.1905 22.583 12.5277 22.583C13.865 22.583 14.9491 21.5682 14.9491 20.3163V15.3885ZM29.1864 13.7792C30.1229 14.6404 30.1362 16.0492 29.2163 16.9258L29.1864 16.9538L28.2109 17.8509L29.1864 18.7481C30.1229 19.6093 30.1362 21.0181 29.2163 21.8947L29.1864 21.9226C28.2283 22.8038 26.6928 22.8038 25.7346 21.9226L23.0332 19.4382C22.0968 18.577 22.0835 17.1682 23.0034 16.2916C23.0132 16.2822 23.0232 16.2729 23.0332 16.2637L25.7346 13.7792C26.6928 12.8981 28.2283 12.8981 29.1864 13.7792Z"
            />
          </svg>
          <span class="level is-size-4 m-l-10">HeyTico</span>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item
          class="hide-active"
          tag="router-link"
          :to="{ path: '/', hash: 'product' }"
        >
          Product
        </b-navbar-item>
        <b-navbar-item
          class="hide-active"
          tag="router-link"
          :to="{ path: '/', hash: 'how-it-works' }"
        >
          How it works
        </b-navbar-item>
        <b-navbar-item
          class="hide-active"
          tag="router-link"
          :to="{ path: '/', hash: 'pricing' }"
        >
          Pricing
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/faq' }">
          FAQ
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/contact' }">
          Contact Us
        </b-navbar-item>
        <!-- <b-navbar-item v-if="!user" :href="signup">Sign Up</b-navbar-item> -->
        <b-navbar-item v-if="!user" @click="login">Login</b-navbar-item>
        <b-navbar-item
          v-if="user"
          tag="router-link"
          :to="{ path: '/call-history' }"
        >
          <avatar :src="avatar" class="avatar" />
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- Content -->
    <section class="main-content">
      <nuxt />
    </section>

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
export default {
  layout: 'default',
  data() {
    return {
      user: this.$store.getters['auth/loggedIn'],
      avatar: this.$store.state.auth.head_image_url,
      signup: `https://passport.mobvoi.com/pages/register?lang=en-us&from=secretary-oversea&redirect_url=${process.env.returnUrl}/get-started`
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

  span {
    font-weight: bold;
  }

  /deep/ & > .container {
    max-width: none;
  }

  @include mobile {
    .navbar-brand {
      padding: 2rem;
    }
  }
}

/deep/ .navbar-item {
  color: $colored-bg;
  font-size: 1.15rem;

  &:hover {
    color: $colored-bg;
  }

  &.hide-active.nuxt-link-exact-active {
    color: $colored-bg;

    @include mobile {
      color: $primary;
    }
  }
}

/deep/ .navbar-brand {
  padding: 1rem;
}

@include touch {
  /deep/ .navbar-burger span {
    background-color: $colored-bg;
    transition: background-color 0.5s;
  }
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
    font-weight: bold;

    @include mobile {
      font-size: 14px;
      margin-bottom: 14px;
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

    span {
      color: $primary;
    }

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
