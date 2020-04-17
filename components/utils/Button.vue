<template>
  <b-button v-bind="$attrs">
    {{ text }}
    <small v-if="subText">
      {{ subText }}
    </small>
  </b-button>
</template>

<style lang="scss" scoped>
a {
  background-color: $primary;
  color: $white;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 3.7rem;
  padding: 0.5rem 2.5rem;
  border-radius: 2.2rem;

  small {
    font-size: 1.12rem;
    color: #dcf0f9;
    margin-left: 0.5rem;
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
