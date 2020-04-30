<template>
  <p :class="{ premium }">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: 'pleacholder'
    },
    premium: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  position: relative;
  color: $dark;
  margin-bottom: 0.5rem !important;
  text-align: left;

  @include mobile {
    font-size: 14px;
    line-height: 20px;
  }

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: $primary;
    position: absolute;
    top: 8px;
    left: -18px;

    @include mobile {
      top: 5px;
    }
  }

  &.premium {
    &:before {
      background: $secondary;
    }
  }
}
</style>
