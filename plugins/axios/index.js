import { get, set } from 'lodash-es'

import useFeedStoreAfterRequest from './interceptors/feed-store-after-request'

export default function({ $axios, store }, inject) {
  const timeout = 6000
  // Create a custom axios instance
  const axios = $axios.create({
    withCredentials: true,
    timeout,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })
  // Create a custom axios instance
  const accountAxios = $axios.create({
    withCredentials: true,
    timeout,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })

  axios.interceptors.request.use(
    (config) => {
      const token = get(store, 'state.auth.token', '')
      if (token) {
        set(config, 'headers.common.ww_token', token)
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
  const useResInterceptorsAxiosIns = [axios, accountAxios]
  useResInterceptorsAxiosIns.forEach((axiosIns) => {
    axiosIns.interceptors.response.use(
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
  })

  // Change URL only for server
  if (process.server) {
    axios.setBaseURL('http://106.75.81.82:8434')
    accountAxios.setBaseURL('http://106.75.81.82:8891')
  }

  //   Use interceptors
  useFeedStoreAfterRequest([axios, accountAxios], store)

  // Inject to context as $api
  inject('axios', axios)
  inject('accountAxios', accountAxios)
}
