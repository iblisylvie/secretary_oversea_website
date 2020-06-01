/**
 * Available in dashboard routes.
 */

export default function({ store, redirect }) {
  const skipGetStarted = store.getters['relation/skipGetStarted']
  if (!skipGetStarted) {
    try {
      redirect('/get-started')
    } catch (_) {} // See https://github.com/nuxt/nuxt.js/blob/f791d786e0996e4cad2b1ddbe244a747e7e700aa/packages/vue-app/template/utils.js#L180
  }
}
