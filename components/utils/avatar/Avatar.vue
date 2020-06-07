<template>
  <div class="avatar-wrap">
    <img
      v-if="!loadFailed"
      :src="src"
      alt="avatar"
      @error="loadFailed = true"
    />
    <svg-icon v-else :icon-class="actualAvatar" class-name="default" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash-es'

export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    loadFailed: false
  }),
  computed: {
    ...mapState({
      sex: (state) => get(state, 'account.sex')
    }),
    actualAvatar() {
      return this.avatar || this.sex === 1 ? 'male' : 'female'
    }
  }
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
