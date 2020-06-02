<template>
  <section class="section">
    <h2>账号相关</h2>
    <article>
      <h3>1. 测试验证码</h3>
      <span>Phone Number</span>
      <input v-model="number" type="text" />
      <button @click="getVerifyCode">Get Code</button>
    </article>
    <h2>注册相关</h2>
    <article>
      <h3>1. 注册账号</h3>
      <span></span>
      <!-- <input v-model="number" type="text" /> -->
      <button @click="registerAccount">Get Code</button>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Test',
  layout: 'dashboard',
  data() {
    return {
      cert: this.$store.state.auth.token,
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
    },
    registerAccount() {
      this.$accountAxios({
        method: 'post',
        url: '/v2/register',
        data: {
          agree: false,
          birthday: '2000-01-01',
          career: 'career',
          create_time: '2000-01-01 11:11:11',
          gender: '1',
          height: 178,
          home_address: 'home',
          img_url_high: 'imgUrlHigh',
          img_url_low: 'imgUrlLow',
          img_url_middle: 'imgUrlMiddle',
          email: 'email',
          origin: 'test',
          source: 'test',
          password: 'password',
          phone: '12332112321',
          user_name: 'username',
          nick_name: '',
          true_name: 'truename',
          weight: 60,
          work_address: 'work',
          type: 'sms',
          captcha_value: '1234',
          usage: 'register',
          uid: 'uid',
          thirdparty_type: 'thirdparty_type'
        }
      })
    }
  }
}
</script>
