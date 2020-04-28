<template>
  <section class="section">
    <h2>账号相关</h2>
    <article>
      <h3>1. 测试验证码</h3>
      <span>Phone Number</span>
      <input v-model="number" type="text" />
      <button @click="getVerifyCode">Get Code</button>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Test',
  layout: 'dashboard',
  data() {
    return {
      cert: this.$store.state.auth.loginCert,
      number: ''
    }
  },
  methods: {
    getVerifyCode() {
      this.$axios({
        method: 'get',
        url: `overseas/captcha?phone=${this.number}`,
        headers: { ww_token: this.cert }
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  }
}
</script>
