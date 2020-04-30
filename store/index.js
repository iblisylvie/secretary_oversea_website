import { get } from 'lodash-es'

export default {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async nuxtServerInit({ dispatch, commit, state }, { app }) {
      const loginCert =
        get(state, 'auth.loginCert', '') || app.$cookies.get('ww_token')
      if (loginCert) {
        commit('auth/POST_LOGIN_CERT', { loginCert })
        await dispatch('auth/INIT_PREQ_INFO')
      }
    }
  }
}
