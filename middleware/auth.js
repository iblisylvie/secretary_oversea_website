export default async function({ store }) {
  const loggedIn = store.getters['auth/loggedIn']
  if (!loggedIn) {
    await store.dispatch('auth/LOGIN')
  }
}
