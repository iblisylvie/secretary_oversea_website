<template>
  <div class="wrap">
    <img
      v-if="!loadFailed"
      :src="src"
      alt="avatar"
      @error="loadFailed = true"
    />
    <svg-icon v-else icon-class="default-avatar" class-name="default" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loadFailed: false
  })
}
</script>

<style lang="scss" scoped>
// @import '~/assets/scss/mixins.scss';
.wrap {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  .default {
    font-size: 32px;
  }
}
</style>
