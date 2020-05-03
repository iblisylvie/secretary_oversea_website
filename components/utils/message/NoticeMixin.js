export default {
  props: {
    type: {
      type: String,
      default: 'is-info'
    },
    message: String,
    duration: Number,
    queue: {
      type: Boolean,
      default: undefined
    },
    position: {
      type: String,
      default: 'is-bottom-right',
      validator(value) {
        return [
          'is-top-right',
          'is-top',
          'is-top-left',
          'is-bottom-right',
          'is-bottom',
          'is-bottom-left'
        ].includes(value)
      }
    },
    container: String
  },
  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || null
    }
  },
  computed: {
    correctParent() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return this.parentTop

        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return this.parentBottom
      }
    },
    transition() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut'
          }
        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return {
            enter: 'fadeInUp',
            leave: 'fadeOut'
          }
      }
    }
  },
  methods: {
    shouldQueue() {
      const queue = this.queue !== undefined ? this.queue : true

      if (!queue) return false

      return (
        this.parentTop.childElementCount > 0 ||
        this.parentBottom.childElementCount > 0
      )
    },

    close() {
      clearTimeout(this.timer)
      this.isActive = false
      this.$emit('close')

      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.$destroy()
        if (typeof this.$el.remove !== 'undefined') {
          this.$el.remove()
        } else if (
          typeof this.$el.parentNode !== 'undefined' &&
          this.$el.parentNode !== null
        ) {
          this.$el.parentNode.removeChild(this.$el)
        }
      }, 150)
    },

    showNotice() {
      if (this.shouldQueue()) {
        // Call recursively if should queue
        setTimeout(() => this.showNotice(), 250)
        return
      }
      this.correctParent.insertAdjacentElement('afterbegin', this.$el)
      this.isActive = true

      //   if (!this.indefinite) {
      //     this.timer = setTimeout(() => this.close(), this.newDuration)
      //   }
    },

    setupContainer() {
      this.parentTop = document.querySelector(
        (this.newContainer ? this.newContainer : 'body') +
          '>.message-container.is-top'
      )
      this.parentBottom = document.querySelector(
        (this.newContainer ? this.newContainer : 'body') +
          '>.message-container.is-bottom'
      )

      if (this.parentTop && this.parentBottom) return

      // @workaround
      // scoped scss style can't take effect to the dynamic html node
      const cssText =
        'position: fixed;  display: flex;  top: 0;  bottom: 0;  left: 0;  right: 0;  padding: 2em;  overflow: hidden;  z-index: 1000;  pointer-events: none;'
      if (!this.parentTop) {
        this.parentTop = document.createElement('div')
        this.parentTop.className = 'message-container is-top'
        this.parentTop.style.cssText = `${cssText} flex-direction: column;`
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div')
        this.parentBottom.className = 'message-container is-bottom'
        this.parentBottom.style.cssText = `${cssText} flex-direction: column-reverse;`
      }

      const container =
        document.querySelector(this.newContainer) || document.body

      container.appendChild(this.parentTop)
      container.appendChild(this.parentBottom)

      if (this.newContainer) {
        this.parentTop.classList.add('has-custom-container')
        this.parentBottom.classList.add('has-custom-container')
      }
    }
  },
  beforeMount() {
    this.setupContainer()
  },
  mounted() {
    this.showNotice()
  }
}
