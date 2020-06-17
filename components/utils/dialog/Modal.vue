<template>
  <transition
    :name="animation"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div
      v-if="!destroyed"
      v-show="isActive"
      v-trap-focus="trapFocus"
      class="modal is-active"
      :class="[{ 'is-full-screen': fullScreen }, customClass]"
      tabindex="-1"
      :role="ariaRole"
      :aria-modal="ariaModal"
    >
      <div class="modal-background" @click="cancel('outside')" />
      <div
        class="animation-content"
        :class="{ 'modal-content': !hasModalCard }"
        :style="customStyle"
      >
        <component
          :is="component"
          v-if="component"
          v-bind="props"
          v-on="events"
          @close="close"
        />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-else-if="content" v-html="content" />
        <slot v-else />
        <button
          v-if="showX"
          v-show="!animating"
          type="button"
          class="modal-close is-large"
          @click="cancel('x')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import trapFocus from './trapFocus'
// import { removeElement } from './utils/helpers'
// import config from '../../utils/config'
function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
    el.parentNode.removeChild(el)
  }
}

export default {
  name: 'BModal',
  directives: {
    trapFocus
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    component: {
      type: [Object, Function],
      default: () => ({})
    },
    content: {
      type: String,
      default: ''
    },
    programmatic: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: [String, Number],
      default: 960
    },
    hasModalCard: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: 'zoom-out'
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => {
        return ['escape', 'x', 'outside', 'button']
      }
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    scroll: {
      type: String,
      default: () => {
        return 'clip'
      },
      validator: (value) => {
        return ['clip', 'keep'].includes(value)
      }
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    trapFocus: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    ariaRole: {
      type: String,
      default: '',
      validator: (value) => {
        return ['dialog', 'alertdialog'].includes(value)
      }
    },
    ariaModal: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    destroyOnHide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
      animating: true,
      destroyed: !this.active
    }
  },
  computed: {
    cancelOptions() {
      return typeof this.canCancel === 'boolean'
        ? this.canCancel
          ? ['escape', 'x', 'outside', 'button']
          : []
        : this.canCancel
    },
    showX() {
      return this.cancelOptions.includes('x')
    },
    customStyle() {
      if (!this.fullScreen) {
        return { maxWidth: this.newWidth }
      }
      return null
    }
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive(value) {
      if (value) this.destroyed = false
      this.handleScroll()
      this.$nextTick(() => {
        if (value && this.$el && this.$el.focus) {
          this.$el.focus()
        }
      })
    }
  },
  beforeMount() {
    // Insert the Modal component in body tag
    // only if it's programmatic
    this.programmatic && document.body.appendChild(this.$el)
  },
  mounted() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress)
    }
    if (this.programmatic) this.isActive = true
    else if (this.isActive) this.handleScroll()
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress)
      // reset scroll
      document.documentElement.classList.remove('is-clipped')
      const savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop
      document.body.classList.remove('is-noscroll')
      document.documentElement.scrollTop = savedScrollTop
      document.body.style.top = null
    }
  },
  methods: {
    handleScroll() {
      if (typeof window === 'undefined') return

      if (this.scroll === 'clip') {
        if (this.isActive) {
          document.documentElement.classList.add('is-clipped')
        } else {
          document.documentElement.classList.remove('is-clipped')
        }
        return
      }

      this.savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop

      if (this.isActive) {
        document.body.classList.add('is-noscroll')
      } else {
        document.body.classList.remove('is-noscroll')
      }

      if (this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`
        return
      }

      document.documentElement.scrollTop = this.savedScrollTop
      document.body.style.top = null
      this.savedScrollTop = null
    },

    /**
     * Close the Modal if canCancel and call the onCancel prop (function).
     */
    cancel(method) {
      if (!this.cancelOptions.includes(method)) return

      this.onCancel.apply(null, arguments)
      this.close()
    },

    /**
     * Call the onCancel prop (function).
     * Emit events, and destroy modal if it's programmatic.
     */
    close() {
      this.$emit('close')
      this.$emit('update:active', false)

      // Timeout for the animation complete before destroying
      if (this.programmatic) {
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 150)
      }
    },

    /**
     * Keypress event that is bound to the document.
     */
    keyPress(event) {
      // Esc key
      if (this.isActive && event.keyCode === 27) this.cancel('escape')
    },

    /**
     * Transition after-enter hook
     */
    afterEnter() {
      this.animating = false
    },

    /**
     * Transition before-leave hook
     */
    beforeLeave() {
      this.animating = true
    },

    /**
     * Transition after-leave hook
     */
    afterLeave() {
      if (this.destroyOnHide) {
        this.destroyed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &.is-full-screen {
    > .animation-content,
    > .animation-content > .modal-card {
      width: 100%;
      height: 100%;
      max-height: 100vh;
      margin: 0;
      background-color: $background;
    }
  }
  .animation-content {
    margin: 0 20px;
    .modal-card {
      margin: 0;
    }
    @include mobile {
      width: 100%;
    }
  }
  .modal-content {
    width: 100%;
  }
}
</style>
