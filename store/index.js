import { get } from 'lodash-es'

export default {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    nuxtServerInit({ commit, state }, { app }) {
      const loginCert =
        get(state, 'auth.loginCert', '') || app.$cookies.get('ww_token')
      loginCert && commit('auth/POST_LOGIN_CERT', { loginCert })
    }
  }
}
