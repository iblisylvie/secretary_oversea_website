import { isObject } from 'lodash-es'

// Map fields to /overseas/relation/*
// See https://docs.google.com/document/d/1S4NV68f6OPPHw320t3_o9tz74s3UPr6gQO9yXW0BPIY/edit#
export default {
  state: () => ({
    vip_status: 2,
    end_at: '',
    fetchedVipInfo: false
  }),
  getters: {
    isVip: (state) => {
      return state.vip_status === 1
    }
  },
  mutations: {
    PUT_VIP_INFO: (state, vipInfo) => {
      if (!isObject(vipInfo)) return
      for (const [prop, value] of Object.entries(vipInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    },
    PUT_FETCHED_VIP_INFO: (state, fetched) => {
      state.fetchedVipInfo = Boolean(fetched)
    }
  },
  actions: {
    async FETCH_VIP_INFO({ commit, state }) {
      if (state.fetchedVipInfo) {
        return
      }
      const vipInfo = await this.$axios({
        url: '/overseas/vip/status',
        method: 'GET'
      })

      if (vipInfo) {
        commit('PUT_VIP_INFO', vipInfo)
        commit('PUT_FETCHED_VIP_INFO', true)
      }
    }
  }
}
