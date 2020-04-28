import { isObject } from 'lodash-es'
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
    POST_USER_INFO: (state, userInfo) => {
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
        return
      }
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${env.RETURN_URL}${route.path}`
      })
      redirect(`https://passport.mobvoi.com/pages/login?${params.toString()}`)
    },
    async LOGOUT({ commit }) {
      // Logout using Mobvoi way
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      commit('POST_LOGIN_CERT', '')
      commit('POST_USER_INFO', { wwid: '' })
      await this.$axios.$get('https://passport.mobvoi.com/pages/logout')
    },
    async FETCH_USER({ getters, commit }) {
      const hasFetchedUser = getters.hasFetchedUser
      if (hasFetchedUser) {
        return
      }
      const { base_info: baseInfo } = await this.$axios({
        url: 'https://passport.mobvoi.com/v1/api/users/me/info',
        method: 'get'
      })
      commit('POST_USER_INFO', baseInfo)
    }
  }
}
