/**
 * Available in dashboard routes.
 */

export default async function({ store, redirect }) {
  const skipGetStarted = store.getters['relation/skipGetStarted']
  if (!skipGetStarted) {
    await new Promise((resolve) => {
      resolve(redirect('/get-started'))
    })
  }
}
