export default {
  state: () => ({
    // See doc https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
    accountId: '',
    agree: false,
    birthday: '',
    career: '',
    company: '',
    createTime: '',
    email: '',
    headImageUrl: '',
    height: 0,
    home: '',
    nickname: '',
    phone: '',
    pii: false,
    referralCode: '',
    region: '',
    sex: 1,
    trueName: '',
    updateTime: '',
    username: '',
    weight: 0,
    wwid: '',

    /**
     * Login certificate from Mobvoi
     * See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
     */
    loginCert: ''
  }),
  getters: {
    loggedIn: (state) => {
      return state.loginCert
    }
  },
  mutations: {
    POST_LOGIN_CERT: (state, { loginCert }) => {
      state.loginCert = loginCert
    }
  },
  actions: {
    LOGIN({ commit }, payload) {
      // Lead to Mobvoi login page,
      // see https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      const { redirect, env, route } = payload
      const loginCert = this.$cookies.get('ww_token')
      if (loginCert) {
        commit('POST_LOGIN_CERT', { loginCert })
        return
      }
      const params = new URLSearchParams({
        lang: 'en-us',
        from: 'secretary-oversea',
        redirect_url: `${env.RETURN_URL}${route.path}`
      })
      redirect(`https://passport.mobvoi.com/pages/login?${params.toString()}`)
    },
    LOGOUT({ commit }) {
      // Logout using Mobvoi way
      // see https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      commit('user/POST_LOGIN_CERT', '')
      this.$axios.$get('https://passport.mobvoi.com/pages/logout')
    },
    FETCH_USER() {
      this.$axios.$get(' https://passport.mobvoi.com//v1/api/users/me/info')
    }
  }
}
