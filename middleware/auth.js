export default async function({ store }) {
  const loggedIn = store.getters['auth/loggedIn']
  if (!loggedIn) {
    await store.dispatch('auth/LOGIN')
    return
  }
  await store.dispatch('auth/INIT_PREQ_INFO')
}
