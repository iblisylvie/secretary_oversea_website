import { isObject } from 'lodash-es'

// Map fields to /overseas/relation/*
// See https://docs.google.com/document/d/1S4NV68f6OPPHw320t3_o9tz74s3UPr6gQO9yXW0BPIY/edit#
export default {
  state: () => ({
    activated: false,
    relation: {}
  }),
  getters: {},
  mutations: {
    PUT_RELATION_INFO: (state, relationInfo) => {
      if (!isObject(relationInfo)) return
      for (const [prop, value] of Object.entries(relationInfo)) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          state[prop] = value
        }
      }
    }
  },
  actions: {
    async FETCH_RELATION({ commit }) {
      const relationInfo = await this.$axios({
        url: '/overseas/relation',
        method: 'GET'
      })

      if (relationInfo) {
        commit('PUT_RELATION_INFO', relationInfo)
      }
    }
  }
}
