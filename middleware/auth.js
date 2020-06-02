export default async function({ store, redirect, app }) {
  const loggedIn = store.getters['auth/loggedIn']
  if (!loggedIn) {
    await store.dispatch('auth/LOGIN')
    return
  }
  await store.dispatch('auth/INIT_PREQ_INFO')
}
