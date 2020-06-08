import useLog from './interceptors/log'
import useAuthChecker from './interceptors/use-auth-checker'
import useResponseErrorFallback from './interceptors/response-error-fallback'

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

  const activateVerifyAxios = $axios.create({
    withCredentials: true,
    timeout,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })

  // Change URL only for server
  if (process.server) {
    axios.setBaseURL(process.env.APP_API_BASE_URL)
    accountAxios.setBaseURL(process.env.APP_ACCOUNT_API_BASE_URL)
    activateVerifyAxios.setBaseURL(process.env.APP_ACTIVATE_VERIFY_API_BASE_URL)
  }

  //   Use interceptors
  useAuthChecker([axios], store)
  useLog([axios, accountAxios, activateVerifyAxios])
  useResponseErrorFallback([axios, accountAxios])

  // Inject to context as $api
  inject('axios', axios)
  inject('accountAxios', accountAxios)
  inject('activateVerifyAxios', activateVerifyAxios)
}
