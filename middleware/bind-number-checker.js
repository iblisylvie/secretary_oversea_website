/**
 * Available in dashboard routes.
 */

export default function({ store, redirect }) {
  const skipGetStarted = store.getters['relation/skipGetStarted']
  if (!skipGetStarted) {
    redirect(301, '/get-started')
  }
}
