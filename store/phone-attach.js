import { isObject, get } from 'lodash-es'

// Map fields to /overseas/relation/*
// See https://docs.google.com/document/d/1S4NV68f6OPPHw320t3_o9tz74s3UPr6gQO9yXW0BPIY/edit#
export default {
  state: () => ({
    phones: [],
    fetchedPhoneAttachInfo: false
  }),
  mutations: {
    PUT_PHONE_ATTACH_INFO: (state, phoneAttachInfo) => {
      if (!isObject(phoneAttachInfo)) return
      for (const [prop, value] of Object.entries(phoneAttachInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    },
    PUT_FETCHED_PHONE_ATTACH_INFO: (state, fetched) => {
      state.fetchedPhoneAttachInfo = Boolean(fetched)
    }
  },
  actions: {
    async FETCH_PHONE_ATTACH({ commit, state }, { reFetch }) {
      if (!reFetch && state.fetchedPhoneAttachInfo) {
        return
      }
      const phoneAttachInfo = await this.$axios({
        url: '/overseas/relation/phone/attach',
        method: 'GET'
      })
      if (phoneAttachInfo) {
        commit('PUT_PHONE_ATTACH_INFO', phoneAttachInfo)
        commit('PUT_FETCHED_PHONE_ATTACH_INFO', true)
      }
    },
    async DELETE_PHONE_ATTACH({ state, commit }, { phone }) {
      const phones = get(state, 'phones', [])
      await this.$axios({
        url: '/overseas/relation/phone/attach',
        method: 'DELETE',
        params: {
          phone
        }
      })
      commit('PUT_PHONE_ATTACH_INFO', {
        phones: phones.filter((factor) => factor !== phone)
      })
    }
  }
}
