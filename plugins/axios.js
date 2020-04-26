export default function({ $axios, store }, inject) {
  // Create a custom axios instance
  const axios = $axios.create({
    // headers: {
    //   common: {
    //     Accept: 'text/plain, */*'
    //   }
    // }
  })

  // Set baseURL to something different
  //   axios.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('axios', axios)
}
