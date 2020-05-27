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
[request error]: ${error}`)
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    (response) => {
      const { data } = response
      return data
    },
    (error) => {
      // Handle error over here.

      // @TODO using message or other under client side
      // eslint-disable-next-line
      console.log(`
[request url]: ${get(error, 'response.request.path')}
[response error]: ${error}`)
      const status = get(error, 'response.status')
      // Logout under `401`
      if (status === 401) {
        store.dispatch('auth/LOGOUT')
      }
    }
  )

  // Create a custom axios instance
  const accountAxios = $axios.create({
    withCredentials: true,
    timeout: 6000,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })

  // Change URL only for server
  if (process.server) {
    axios.setBaseURL('http://106.75.81.82:8434')
    accountAxios.setBaseURL('http://106.75.81.82:8891')
  }

  // Inject to context as $api
  inject('axios', axios)
  inject('accountAxios', accountAxios)
}
