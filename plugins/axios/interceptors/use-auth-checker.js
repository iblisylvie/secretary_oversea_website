import { get, set } from 'lodash-es'

export default function useAuthChecker(instances, store) {
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

    ins.interceptors.response.use(
      (response) => {
        const data = get(response, 'data')
        const { err_code: errCode } = data || {}
        if ([1012].includes(errCode)) {
          store.dispatch('auth/LOGOUT')
        }
        return response
      },
      (err) => {
        const status = get(err, 'response.status')
        if (status === 401) {
          store.dispatch('auth/LOGOUT')
        }
        return err
      }
    )
  })
}
