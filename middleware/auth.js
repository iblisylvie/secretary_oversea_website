export default async function(context) {
  const { store } = context
  const loggedIn = store.getters['auth/loggedIn']
  if (!loggedIn) {
    await store.dispatch('auth/LOGIN', context)
  }
}
