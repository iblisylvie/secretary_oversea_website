import { isObject, get, remove } from 'lodash-es'
export default {
  state: () => ({
    // See doc https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
    accountId: null,
    agree: true,
    birthday: '',
    career: '',
    company: '',
    create_time: '',
    email: '',
    head_image_url: '',
    height: null,
    home: '',
    nickname: '',
    phone: '',
    pii: false,
    referral_code: '',
    region: '',
    sex: null,
    true_name: '',
    update_time: '',
    username: '',
    weight: null,
    wwid: '',

    /**
     * Login certificate from Mobvoi
     * See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
     */
    loginCert: '',

    /**
     * [{
     *    path: <String>,
     *    mapToAsideMenu:? <Object>
     * }]
     */
    availableRoutes: null
  }),
  getters: {
    loggedIn: (state) => {
      return Boolean(state.loginCert)
    }
  },
  mutations: {
    POST_LOGIN_CERT: (state, { loginCert }) => {
      state.loginCert = loginCert
    },
    PUT_USER_INFO: (state, userInfo) => {
      if (!isObject(userInfo)) return
      for (const [prop, value] of Object.entries(userInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    }
  },
  actions: {
    async LOGIN({ commit, dispatch, rootState }) {
      // Lead to Mobvoi login page
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      const context = get(this, 'app.context', {})
      const { redirect, route } = context
      const loginCert = this.$cookies.get('ww_token')
      if (loginCert) {
        commit('POST_LOGIN_CERT', { loginCert })
        // Fetch user info immediately after login
        await dispatch('INIT_PREQ_INFO')
        return
      }
      // Lead to dashboard route if login after landing page
      let redirectRoutePath = route.path
      if (route.path === '/') {
        redirectRoutePath = '/get-started'
      }
      const redirectDomain =
        get(rootState, 'app.domain') || process.env.returnUrl
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${redirectDomain}${redirectRoutePath}`
      })
      try {
        redirect(`https://passport.mobvoi.com/pages/login?${params.toString()}`)
      } catch (_) {} // See https://github.com/nuxt/nuxt.js/blob/f791d786e0996e4cad2b1ddbe244a747e7e700aa/packages/vue-app/template/utils.js#L180
    },
    LOGOUT({ commit, rootState }) {
      // Logout using Mobvoi way
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      commit('POST_LOGIN_CERT', '')
      commit('PUT_USER_INFO', { wwid: '' })
      const context = get(this, 'app.context', {})
      const { redirect } = context
      const redirectDomain = get(rootState, 'app.host') || process.env.returnUrl
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${redirectDomain}/`
      })
      try {
        redirect(
          `https://passport.mobvoi.com/pages/logout?${params.toString()}`
        )
      } catch (_) {} // See https://github.com/nuxt/nuxt.js/blob/f791d786e0996e4cad2b1ddbe244a747e7e700aa/packages/vue-app/template/utils.js#L180
    },
    /**
     * Initialize prerequisite info
     * @param {*} param0
     */
    async INIT_PREQ_INFO({ dispatch, state }) {
      if (!state.wwid) {
        await dispatch('FETCH_USER')
      }
      if (!state.availableRoutes) {
        await dispatch('FETCH_AVAILABLE_ROUTES')
      }
    },
    async FETCH_USER({ commit }) {
      const { base_info: baseInfo } = await this.$axios({
        url: 'https://passport.mobvoi.com/v1/api/users/me/info',
        method: 'GET'
      })
      commit('PUT_USER_INFO', baseInfo)
    },
    async FETCH_AVAILABLE_ROUTES({ commit, dispatch, rootState }) {
      const routes = [
        {
          path: '/get-started',
          mapToAsideMenu: {
            order: 1,
            name: 'Get Started',
            icon: 'aside-logo'
          }
        },
        {
          path: '/call-history',
          mapToAsideMenu: {
            order: 2,
            name: 'Call History',
            icon: 'phone'
          }
        },
        {
          path: '/customization',
          mapToAsideMenu: {
            order: 3,
            name: 'Customization',
            icon: 'customization'
          }
        },
        {
          path: '/premium',
          mapToAsideMenu: {
            order: 4,
            name: 'Premium',
            icon: 'premium'
          }
        },
        {
          path: '/mbr-faq',
          mapToAsideMenu: {
            order: 5,
            name: 'FAQ',
            icon: 'mbr-faq'
          }
        },
        {
          path: '/account-settings'
        },
        {
          path: '/call-history/:id?'
        }
      ]
      await dispatch('relation/FETCH_RELATION', null, { root: true })
      const activated = get(rootState, 'relation.activated')
      if (activated) {
        remove(routes, (route) => route.path === '/get-started')
      }
      commit('PUT_USER_INFO', { availableRoutes: routes })
    }
  }
}
