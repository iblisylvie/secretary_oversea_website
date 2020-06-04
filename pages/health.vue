<template>
  <div>200 success</div>
</template>

<script>
export default {
  name: 'Health',
  mounted() {
    // eslint-disable-next-line no-console
    console.log('BASE URL: ', process.env.APP_API_BASE_URL)
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100vh;
}
</style>
