import { get } from 'lodash-es'

export default {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async nuxtServerInit({ dispatch, commit, state }, { app, req }) {
      const token = get(state, 'auth.token', '') || app.$cookies.get('ww_token')
      const host = req.headers.host
      if (host) {
        const domain =
          host === 'test.mobvoi.com' || host === 'localhost'
            ? 'http://test.mobvoi.com'
            : `https://${host}`
        commit('app/POST_APP_INFO', { domain })
      }
      if (token) {
        commit('auth/PUT_AUTH_INFO', { token })
        await dispatch('auth/INIT_PREQ_INFO')
      }
    }
  }
}
