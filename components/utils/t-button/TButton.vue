<template>
  <button :disabled="disabled" :class="['wrap', type]" v-on="$listeners">
    <span v-if="!loading" class="content"><slot></slot></span>
    <div v-else class="dot"></div>
  </button>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.wrap {
  &:focus {
    outline: none;
  }
  &.primary {
    @include primary-button;
    &[disabled] {
      cursor: not-allowed;
      &:hover {
        background: $primary-button-background;
      }
      & .content {
        opacity: 0.5;
      }
    }
  }
  &.secondary {
    @include secondary-button;
    &[disabled] {
      cursor: not-allowed;
      &:hover {
        background: $secondary-button-background;
      }
      & .content {
        color: #79d5ff;
      }
    }
  }
  &.loading {
    pointer-events: none;
  }
  .dot {
    margin: 0 10px;
    position: relative;
    width: 4px;
    height: 4px;
    border-radius: 5px;
    background-color: #edf9ff;
    color: #edf9ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;

    &:before,
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      width: 4px;
      height: 4px;
      border-radius: 5px;
      background-color: #edf9ff;
      color: #edf9ff;
    }
    &:before {
      left: -8px;
      animation: dotFlashing 1s infinite alternate;
      animation-delay: 0s;
    }
    &:after {
      left: 8px;
      animation: dotFlashing 1s infinite alternate;
      animation-delay: 1s;
    }

    @keyframes dotFlashing {
      0% {
        background-color: #edf9ff;
      }

      100% {
        background-color: #ebe6ff;
      }
    }
  }
}
</style>
