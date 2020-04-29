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
    availableRoutes: []
  }),
  getters: {
    loggedIn: (state) => {
      return Boolean(state.loginCert)
    },
    hasFetchedUser: (state) => {
      return Boolean(state.wwid)
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
    async LOGIN({ commit, dispatch }, payload) {
      // Lead to Mobvoi login page
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      const { redirect, env, route } = payload
      const loginCert = this.$cookies.get('ww_token')
      if (loginCert) {
        commit('POST_LOGIN_CERT', { loginCert })
        // Fetch user info immediately after login
        await dispatch('FETCH_USER')
        await dispatch('FETCH_AVAILABLE_ROUTES')
        return
      }
      // Lead to dashboard call-list route if login after landing page
      const redirectRoutePath = route.path === '/' ? '/call-list' : route.path
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${env.RETURN_URL}${redirectRoutePath}`
      })
      redirect(`https://passport.mobvoi.com/pages/login?${params.toString()}`)
    },
    async LOGOUT({ commit }, payload) {
      // Logout using Mobvoi way
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      const { env } = payload
      commit('POST_LOGIN_CERT', '')
      commit('PUT_USER_INFO', { wwid: '' })
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${env.RETURN_URL}/`
      })
      await this.$axios({
        url: 'https://passport.mobvoi.com/pages/logout',
        method: 'GET',
        params
      })
    },
    async FETCH_USER({ getters, commit }) {
      const hasFetchedUser = getters.hasFetchedUser
      if (hasFetchedUser) {
        return
      }
      const { base_info: baseInfo } = await this.$axios({
        url: 'https://passport.mobvoi.com/v1/api/users/me/info',
        method: 'GET'
      })
      commit('PUT_USER_INFO', baseInfo)
    },
    async FETCH_AVAILABLE_ROUTES(store) {
      const { state, commit, dispatch } = store
      const routes = [
        {
          path: '/get-started',
          mapToAsideMenu: {
            order: 1,
            name: 'Get Started',
            icon: 'logo'
          }
        },
        {
          path: '/call-list',
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
            name: 'MBRFAQ',
            icon: 'mbr-faq'
          }
        },
        {
          path: '/account-settings'
        },
        {
          path: '/call-list/:id?'
        }
      ]
      await dispatch('relation/FETCH_RELATION', null, { root: true })
      const activated = get(state, 'relation.activated')
      if (activated) {
        remove(routes, (route) => route.path === '/get-started')
      }
      commit('PUT_USER_INFO', { availableRoutes: routes })
    }
  }
}
