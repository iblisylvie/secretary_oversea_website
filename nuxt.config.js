import path from 'path'
require('dotenv').config()

const DEFAULT_APP_KEY = 'secretary-oversea'
const DEFAULT_APP_SECRET = 'SYw6prGbytiVaIwzyZUvUddQNjb91YZg'
const DEFAULT_APP_API_BASE_URL = 'http://106.75.81.82:8434/'
const DEFAULT_APP_ACCOUNT_API_BASE_URL = 'http://106.75.81.82:8891/'
const DEFAULT_APP_ACTIVATE_VERIFY_API_BASE_URL = 'http://106.75.64.52:8720/'

const proxyConfig = () => {
  const config = []
  const appApiBaseUrl = process.env.APP_API_BASE_URL || DEFAULT_APP_API_BASE_URL
  const appAccountApiBaseUrl =
    process.env.APP_ACCOUNT_API_BASE_URL || DEFAULT_APP_ACCOUNT_API_BASE_URL
  const appActivateVerifyApiBaseUrl =
    process.env.APP_ACTIVATE_VERIFY_API_BASE_URL ||
    DEFAULT_APP_ACTIVATE_VERIFY_API_BASE_URL
  config.push(
    `${appApiBaseUrl}overseas`,
    `${appAccountApiBaseUrl}v2`,
    `${appAccountApiBaseUrl}account/info`,
    `${appAccountApiBaseUrl}api/captcha`,
    `${appAccountApiBaseUrl}logout`,
    `${appActivateVerifyApiBaseUrl}api/v1/verify`
  )
  return config
}

export default {
  mode: 'universal',
  /**
   * Environment Variable
   */
  env: {
    APP_KEY: process.env.APP_KEY || DEFAULT_APP_KEY,
    APP_SECRET: process.env.APP_SECRET || DEFAULT_APP_SECRET,
    APP_API_BASE_URL: process.env.APP_API_BASE_URL || DEFAULT_APP_API_BASE_URL,
    APP_ACCOUNT_API_BASE_URL:
      process.env.APP_ACCOUNT_API_BASE_URL || DEFAULT_APP_ACCOUNT_API_BASE_URL,
    APP_ACTIVATE_VERIFY_API_BASE_URL:
      process.env.APP_ACTIVATE_VERIFY_API_BASE_URL ||
      DEFAULT_APP_ACTIVATE_VERIFY_API_BASE_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'HeyTico',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    // __dangerouslyDisableSanitizersByTagID: {
    //   GA_ID: ['innerHTML']
    // },
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-170485226-1',
        async: true,
        defer: true
      },
      {
        vmid: 'GA_ID',
        innerHTML: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-170485226-1');`,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/scss/global.scss', 'video.js/dist/video-js.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/nuxt-video-player-plugin', ssr: false },
    { src: '~/plugins/register-components' },
    { src: '~/plugins/axios/index.js' },
    { src: '~/plugins/vue-touch', ssr: false },
    { src: '~/plugins/directives.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js middleware
   */
  // router: {
  //   middleware: ['auth']
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: '/'
  },
  proxy: proxyConfig(),
  /*
   ** style-resources-module
   */
  styleResources: {
    scss: ['~assets/scss/variables.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    // Transpile using babel
    transpile: ['lodash-es'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // set svg-sprite-loader
      const SVG_DIR_FOR_SPRITE_LOADER = path.join(__dirname, 'assets/icons/svg')
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [SVG_DIR_FOR_SPRITE_LOADER]
      config.module.rules.push({
        test: /\.svg$/,
        include: [SVG_DIR_FOR_SPRITE_LOADER],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    }
  }
}
