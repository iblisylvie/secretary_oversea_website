import { isObject } from 'lodash-es'

export default {
  state: () => ({
    // Domain where app deployed.
    domain: ''
  }),
  getters: {},
  mutations: {
    POST_APP_INFO: (state, appInfo) => {
      if (!isObject(appInfo)) return
      for (const [prop, value] of Object.entries(appInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    }
  },
  actions: {}
}
