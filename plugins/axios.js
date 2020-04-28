import { get } from 'lodash-es'
import { BASE_URL } from '~/constants/services'

const codeMessage = {
  401: '您的登录信息已过期(401)，请重新登录',
  403: '抱歉，您的访问权限不足(403)，请联系管理员',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '抱歉，服务出错了(500)，请稍后重试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

export default function({ $axios, store, redirect }, inject) {
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
  //   axios.onRequest((config) => {
  //     console.log(config.url)
  //   })
  axios.interceptors.response.use(
    (response) => {
      const { data } = response
      return data
    },
    (err) => {
      const status = get(err, 'response.status')
      //   console.log(`err:${status}`)
      if (codeMessage[status]) {
        // Message
      }
      // Logout under `401`
      if (status === 401) {
        store.dispatch('auth/LOGOUT')
      }
      return Promise.reject(get(err, 'response'))
    }
  )

  axios.setBaseURL(BASE_URL)

  // Set baseURL to something different
  //   axios.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('axios', axios)
}
