<template>
  <div class="avatar-wrap">
    <img
      v-if="!loadFailed"
      :src="src"
      alt="avatar"
      @error="loadFailed = true"
    />
    <svg-icon v-else :icon-class="avatar" class-name="default" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: 'default-avatar'
    }
  },
  data: () => ({
    loadFailed: false
  })
}
</script>

<style lang="scss" scoped>
// @import '~/assets/scss/mixins.scss';
.avatar-wrap {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  .default {
    font-size: 32px;
  }
}
</style>
