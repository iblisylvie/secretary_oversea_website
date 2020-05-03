<template>
  <div class="steps">
    <div
      v-for="(step, index) of steps"
      :key="index"
      class="step"
      :class="[active === index ? 'is-process' : '']"
    >
      <div class="step-head">
        <div class="step-line"></div>
        <div class="step-text">
          <div class="step-text-inner">{{ index + 1 }}</div>
        </div>
      </div>
      <div class="step-main">
        <div class="step-title">{{ step.title }}</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    active: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default: () => [] // {title}
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.steps {
  display: flex;
  margin: 0 auto;
  white-space: nowrap;
}
.step {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  flex-shrink: 1;
  flex-basis: 50%;
  margin-right: 0px;
  &.is-process {
    & .step-text {
      @include gradient-background;
    }
    & .step-title {
      @include gradient-text;
    }
  }
  &-head {
    position: relative;
    width: 100%;
    text-align: center;
    color: #fff;
  }
  &-line {
    margin: 0 30px;
    position: absolute;
    border-color: #d7dfe8;
    height: 2px;
    top: 11px;
    left: 50%;
    right: -50%;
    white-space: nowrap;
    border-top-style: dotted;
  }
  &:last-of-type &-line {
    display: none;
  }
  &-text {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    box-sizing: border-box;
    background: #59687a;
    transition: 0.15s ease-out;
    border-radius: 50%;
    border-color: inherit;
    &-inner {
      display: inline-block;
      user-select: none;
      text-align: center;
      font-weight: 700;
      line-height: 1;
      color: inherit;
    }
  }
  &-main {
    text-align: center;
    margin-top: 24px;
    font-size: 18px;
    font-weight: 600;
  }
  &-title {
    color: #59687a;
  }
}
</style>
