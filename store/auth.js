import { isObject, get, isEmpty } from 'lodash-es'
export default {
  state: () => ({
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
