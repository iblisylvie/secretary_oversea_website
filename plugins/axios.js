import { get, set } from 'lodash-es'

export default function({ $axios, store }, inject) {
  // Create a custom axios instance
  const axios = $axios.create({
    withCredentials: true,
    timeout: 6000,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })
  axios.interceptors.request.use(
    (config) => {
      const loginCert = get(store, 'state.auth.loginCert', '')
      if (loginCert) {
        set(config, 'headers.common.ww_token', loginCert)
      }
      return config
    },
    (error) => {
      // eslint-disable-next-line
      console.log(`
[request error]:
${error}`)
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    (response) => {
      const { data } = response
      return data
    },
    (error) => {
      // eslint-disable-next-line
      console.log(`
[response error]:
${error}`)
      const status = get(error, 'response.status')
      // Logout under `401`
      if (status === 401) {
        store.dispatch('auth/LOGOUT')
      }
      return Promise.reject(get(error, 'response'))
    }
  )

  // Inject to context as $api
  inject('axios', axios)
}
