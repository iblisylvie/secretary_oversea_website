<template>
  <transition :name="animation">
    <article v-show="isActive" class="message" :class="[type, position]">
      <div class="media">
        <div class="media-content">
          <p v-if="message" class="text">
            {{ message }}
          </p>
          <slot v-if="!message" />
        </div>
      </div>
      <button v-if="closable" class="opt" @click="close">
        <div class="close"></div>
      </button>
    </article>
  </transition>
</template>

<script>
import MessageMixin from './MessageMixin'
export default {
  name: 'Message',
  mixins: [MessageMixin],
  props: {
    position: {
      type: String,
      default: 'is-bottom-right'
    },
    animation: {
      type: String,
      default: 'fade'
    },
    active: {
      type: Boolean,
      default: true
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActive: this.active
    }
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive(value) {
      if (value) {
        this.setAutoClose()
      } else if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  mounted() {
    this.setAutoClose()
  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close() {
      this.isActive = false
      this.$emit('close')
      this.$emit('update:active', false)
    },
    /**
     * Set timer to auto close message
     */
    setAutoClose() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          if (this.isActive) {
            this.close()
          }
        }, this.duration)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$message-is-warning-background: #ffecec;
$message-is-success-background: #dff2fb;
$message-is-info-background: #fff1e0;
$message-is-warning-color: #c53f3f;
$message-is-success-color: #02aefc;
$message-is-info-color: #9f6e34;
$message-is-warning-opt: rgba(197, 63, 63, 0.2);
$message-is-success-opt: #cbebfa;
$message-is-info-opt: #ecd7be;
.message {
  display: flex;
  justify-content: space-between;
  padding: 20px 18px;
  min-width: 226px;
  &.is-warning {
    background: $message-is-warning-background;
    color: $message-is-warning-color;
  }
  &.is-info {
    background: $message-is-info-background;
    color: $message-is-info-color;
  }
  &.is-success {
    background: $message-is-success-background;
    color: $message-is-success-color;
  }
  // Modifiers
  &.is-top,
  &.is-bottom {
    align-self: center;
  }
  &.is-top-right,
  &.is-bottom-right {
    align-self: flex-end;
  }
  &.is-top-left,
  &.is-bottom-left {
    align-self: flex-start;
  }
  .opt {
    padding: 8px;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    pointer-events: all;
  }
  &.is-info .opt {
    background: $message-is-info-opt;
    color: $message-is-info-background;
  }
  &.is-warning .opt {
    background: $message-is-warning-opt;
    color: $message-is-warning-background;
  }
  &.is-success .opt {
    background: $message-is-success-opt;
    color: $message-is-success-background;
  }
  .close {
    line-height: 8px;
    text-align: center;
    height: 8px;
    width: 8px;
    font-size: 8px;
    &:before {
      content: '\2716';
      font-size: 10px;
      font-weight: 700;
    }
  }
  &.is-success .close {
    &:before {
      color: $message-is-success-color;
    }
  }
  &.is-warning .close {
    &:before {
      color: $message-is-warning-color;
    }
  }
  &.is-info .close {
    &:before {
      color: $message-is-info-color;
    }
  }

  .media-content {
    font-size: 14px;
    font-weight: bold;
  }
}
// // Modifiers
// &.is-top {
//   flex-direction: column;
// }
// &.is-bottom {
//   flex-direction: column-reverse;

//   // Since the columns are reversed, we need to reverse the margin logic from
//   // :not(:last-child) to :not(:first-child)
//   .message {
//     margin-bottom: 0;

//     &:not(:first-child) {
//       margin-bottom: 1.5rem;
//     }
//   }
// }
</style>
