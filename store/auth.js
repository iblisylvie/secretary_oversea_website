import { isObject, get, isEmpty } from 'lodash-es'
export default {
  state: () => ({
    // See doc https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
    // accountId: null,
    // account_id: null,
    // agree: false,
    // birthday: '',
    // company: '',
    // create_time: '',
    // email: '',
    // head_image_url: '',
    // home: '',
    // nickname: '',
    // pii: false,
    // referral_code: '',
    // sex: 1,
    // true_name: '',
    // update_time: '',
    // wwid: '',
    token: ''
  }),
  getters: {
    loggedIn: (state) => {
      return Boolean(state.token)
    }
  },
  mutations: {
    POST_LOGIN_CERT: (state, { token }) => {
      state.token = token
    },
    PUT_AUTH_INFO: (state, authInfo) => {
      if (!isObject(authInfo)) return
      for (const [prop, value] of Object.entries(authInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    }
  },
  actions: {
    // @TODO clean up
    async LOGIN({ commit, dispatch }) {
      const redirect = get(this, 'app.context.redirect', () => {})
      const loginCert = this.$cookies.get('ww_token')
      if (loginCert) {
        commit('PUT_AUTH_INFO', { token: loginCert })
        // Fetch user info immediately after login
        await dispatch('INIT_PREQ_INFO')
        return
      }
      redirect('/auth/login')
      // Lead to dashboard route if login after landing page
      // let redirectRoutePath = route.path
      // if (route.path === '/') {
      //   redirectRoutePath = '/call-history'
      // }
      // const redirectDomain =
      //   get(rootState, 'app.domain') || process.env.returnUrl
      // const params = new URLSearchParams({
      //   lang: 'en-us',
      //   from: 'secretary-oversea',
      //   redirect_url: `${redirectDomain}${redirectRoutePath}`
      // })
      // try {
      //   redirect(`https://passport.mobvoi.com/pages/login?${params.toString()}`)
      // } catch (_) {} // See https://github.com/nuxt/nuxt.js/blob/f791d786e0996e4cad2b1ddbe244a747e7e700aa/packages/vue-app/template/utils.js#L180
    },
    async LOGOUT({ commit, state }) {
      const redirect = get(this, 'app.context.redirect', () => {})
      commit('PUT_AUTH_INFO', { token: '' })
      await this.$accountAxios({
        method: 'POST',
        url: '/logout',
        params: {
          token: state.token,
          origin: process.env.APP_KEY
        }
      })
      this.$cookies.remove('ww_token')
      redirect('/auth/login')
      // Logout using Mobvoi way
      // See https://docs.google.com/document/d/1IdZlyTY-v3epAOwU1k7nW0UfgUYdyKgcR36BovSbAEo/edit
      // commit('POST_LOGIN_CERT', '')
      // commit('PUT_AUTH_INFO', { wwid: '' })
      // const context = get(this, 'app.context', {})
      // const { redirect } = context
      // const redirectDomain =
      //   get(rootState, 'app.domain') || process.env.returnUrl
      // const params = new URLSearchParams({
      //   lang: 'en-us',
      //   from: 'secretary-oversea',
      //   redirect_url: `${redirectDomain}/`
      // })
      // try {
      //   redirect(
      //     `https://passport.mobvoi.com/pages/logout?${params.toString()}`
      //   )
      // } catch (_) {} // See https://github.com/nuxt/nuxt.js/blob/f791d786e0996e4cad2b1ddbe244a747e7e700aa/packages/vue-app/template/utils.js#L180
    },
    /**
     * Initialize prerequisite info
     * @param {*} param0
     */
    async INIT_PREQ_INFO({ dispatch, state, rootState }) {
      if (!get(rootState, 'account.wwid')) {
        await dispatch('account/FETCH_ACCOUNT', {}, { root: true })
      }
      if (isEmpty(get(rootState, 'relation.relation'))) {
        await dispatch('relation/FETCH_RELATION', {}, { root: true })
      }
      if (!get(rootState, 'phone-attach.fetchedPhoneAttachInfo')) {
        await dispatch('phone-attach/FETCH_PHONE_ATTACH', {}, { root: true })
      }
      if (!get(rootState, 'vip.fetchedVipInfo')) {
        await dispatch('vip/FETCH_VIP_INFO', {}, { root: true })
      }
    }
  }
}
