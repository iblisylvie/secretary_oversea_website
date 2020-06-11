import { get, isObject } from 'lodash-es'

import { ERROR_CODE_MAP_MSG } from './error-code-map-msg'
import { MessageProgrammatic as Message } from '~/components/utils/message'

export default function useFeedStoreAfterRequest(instances) {
  if (!Array.isArray(instances)) {
    instances = [instances]
  }
  instances.forEach((ins) => {
    ins.interceptors.response.use(
      (response) => {
        const data = get(response, 'data')
        const { err_code: errCode, err_msg: errMsg } = data || {}
        if (isObject(data) && errCode && errCode !== 0) {
          const msg = ERROR_CODE_MAP_MSG[String(errCode)] || errMsg
          if (msg) {
            if (process.client) {
              Message.open({
                message: msg,
                type: 'is-warning'
              })
            }
          } else {
            // eslint-disable-next-line
            console.log(`
No error msg matched with ${get(response, 'request.path')}`)
          }
        }
        return response.data
      },
      (err) => {
        return Promise.reject(get(err, 'response'))
      }
    )
  })
}
