import { get, set, isObject } from 'lodash-es'

export default function useFeedStoreAfterRequest(instances, store) {
  if (!Array.isArray(instances)) {
    instances = [instances]
  }
  instances.forEach((ins) => {
    ins.interceptors.request.use((config) => {
      const token = get(store, 'state.auth.token', '')
      if (token) {
        set(config, 'headers.common.ww_token', token)
      }
      return config
    }, null)

    ins.interceptors.response.use((response) => {
      const data = get(response, 'data')
      const { err_code: errCode } = data || {}
      if (isObject(data) && errCode && errCode === 1012) {
        store.dispatch('auth/LOGOUT')
      }
      return response.data
    }, null)
  })
}
