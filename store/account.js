import { isObject, get } from 'lodash-es'

export default {
  state: () => ({
    birthday: '',
    create_time: '',
    sex: 0,
    agree: false,
    wwid: '',
    home: '',
    accountId: 0,
    pii: false,
    update_time: '',
    account_id: 0,
    head_image_url: '',
    true_name: '',
    referral_code: '',
    nickname: '',
    company: '',
    email: ''
  }),
  getters: {},
  mutations: {
    PUT_ACCOUNT_INFO: (state, accountInfo) => {
      if (!isObject(accountInfo)) return
      for (const [prop, value] of Object.entries(accountInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    }
  },
  actions: {
    async FETCH_ACCOUNT({ commit, rootState }) {
      const res = await this.$accountAxios({
        method: 'GET',
        url: `/account/info/token`,
        params: {
          origin: process.env.APP_KEY,
          token: get(rootState, 'auth.token')
        }
      })
      commit('PUT_ACCOUNT_INFO', {
        ...get(res, 'base_info', {})
      })
    }
  }
}
