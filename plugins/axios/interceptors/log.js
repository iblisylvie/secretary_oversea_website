import { get } from 'lodash-es'

export default function useFeedStoreAfterRequest(instances) {
  if (!Array.isArray(instances)) {
    instances = [instances]
  }
  instances.forEach((ins) => {
    ins.interceptors.request.use(null, (error) => {
      // eslint-disable-next-line
      console.log(`
[request error]: ${error}`)
      return error
    })
    ins.interceptors.response.use(null, (error) => {
      // Handle error over here.

      // @TODO using message or other under client side
      // eslint-disable-next-line
      console.log(`
[request url]: ${get(error, 'response.request.path')}
[response error]: ${error}`)
      return error
    })
  })
}
