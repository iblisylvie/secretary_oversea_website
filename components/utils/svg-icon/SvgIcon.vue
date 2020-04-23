<template>
  <i :class="svgClass">
    <svg aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return `svg-icon svg-icon-${this.iconClass} ${this.className || ''}`
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  > * {
    line-height: 1;
  }

  > svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
