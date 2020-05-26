import { isObject, get } from 'lodash-es'

// Map fields to /overseas/relation/*
// See https://docs.google.com/document/d/1S4NV68f6OPPHw320t3_o9tz74s3UPr6gQO9yXW0BPIY/edit#
export default {
  state: () => ({
    relation: {}
  }),
  getters: {
    skipGetStarted: (state) => {
      return Boolean(get(state, 'relation.phone', false))
    }
  },
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

      if (get(relationInfo, 'relation')) {
        commit('PUT_RELATION_INFO', relationInfo)
      } else {
        commit('PUT_RELATION_INFO', { relation: {} })
      }
    },
    async DELETE_RELATION({ dispatch }) {
      await this.$axios({
        url: '/overseas/relation',
        method: 'DELETE'
      })
      await dispatch('FETCH_RELATION')
    }
  }
}
