export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    message: String,
    type: {
      type: String,
      default: 'is-info'
    },
    size: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
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
  },
  mounted() {
    this.setAutoClose()
  }
}
