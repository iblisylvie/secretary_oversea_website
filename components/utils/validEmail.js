const validEmail = (email) => {
  const reg = /^([0-9a-zA-Z.-]{3,})+@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(email)
}

export default validEmail
