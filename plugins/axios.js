import { get, set } from 'lodash-es'

const codeMessage = {
  401: '您的登录信息已过期(401)，请重新登录',
  403: '抱歉，您的访问权限不足(403)，请联系管理员',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '抱歉，服务出错了(500)，请稍后重试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

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
      // console.log(config)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    (response) => {
      const { data } = response
      return data
    },
    (error) => {
      const status = get(error, 'response.status')
      if (codeMessage[status]) {
        // Message
        // console.log(context)
      }
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
