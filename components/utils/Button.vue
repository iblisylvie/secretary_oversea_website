<template>
  <b-button v-bind="$attrs">
    {{ text }}
    <small v-if="subText">
      {{ subText }}
    </small>
  </b-button>
</template>

<style lang="scss" scoped>
a,
button {
  background-color: $secondary;
  color: $white;
  min-height: 4.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 2.5rem;
  border-radius: 2.2rem;
  border-color: transparent;

  @include mobile {
    min-height: 4rem;
  }

  small {
    font-size: 1.12rem;
    margin-left: 0.5rem;
  }

  &:hover {
    color: $white;
    border-color: transparent;
  }
}
</style>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    subText: {
      type: String,
      default: ''
    }
  }
}
</script>
