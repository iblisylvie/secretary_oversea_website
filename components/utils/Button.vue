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
  line-height: 3.7rem;
  padding: 0.5rem 2.5rem;
  border-radius: 2.2rem;

  @include mobile {
    min-height: 4rem;
  }

  small {
    font-size: 1.12rem;
    color: rgba(255, 255, 255, 0.65);
    margin-left: 0.5rem;
  }

  &:hover {
    color: $white;
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
