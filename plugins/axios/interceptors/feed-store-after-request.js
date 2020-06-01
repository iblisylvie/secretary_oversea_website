import { get } from 'lodash-es'

const feedStoreMap = {
  '/v2/login POST': {
    feedWay($store, { data }) {
      if (!data) return
      $store.commit('auth/PUT_USER_INFO', {
        ...get(data, 'base_info', {}),
        token: get(data, 'token')
      })
    }
  }
}

export default function useFeedStoreAfterRequest(instances, store) {
  if (!Array.isArray(instances)) {
    instances = [instances]
  }
  instances.forEach((ins) => {
    ins.interceptors.response.use((response) => {
      const config = get(response, 'config')
      if (!config) {
        return response
      }
      const key = `${config.url} ${config.method.toUpperCase()}`
      const feedWay = get(feedStoreMap, key)
      feedWay && feedWay(store, response)
      return response
    }, null)
  })
}
