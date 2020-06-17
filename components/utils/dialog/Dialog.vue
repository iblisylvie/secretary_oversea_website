<template>
  <transition :name="animation">
    <div
      v-if="isActive"
      v-trap-focus="trapFocus"
      class="dialog modal is-active"
      :class="dialogClass"
      :role="ariaRole"
      :aria-modal="ariaModal"
    >
      <div class="modal-background" @click="cancel('outside')" />
      <div class="modal-card animation-content">
        <header v-if="title" class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
        </header>

        <section
          class="modal-card-body"
          :class="{ 'is-titleless': !title, 'is-flex': hasIcon }"
        >
          <div class="media">
            <!-- <div class="media-left" v-if="hasIcon && (icon || iconByType)">
              <b-icon
                :icon="icon ? icon : iconByType"
                :pack="iconPack"
                :type="type"
                :both="!icon"
                size="is-large"
              />
            </div> -->
            <div class="media-content">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="message" />

              <div v-if="hasInput" class="field">
                <div class="control">
                  <input
                    ref="input"
                    v-model="prompt"
                    class="input"
                    :class="{ 'is-danger': validationMessage }"
                    v-bind="inputAttrs"
                    @keyup.enter="confirm"
                  />
                </div>
                <p class="help is-danger">{{ validationMessage }}</p>
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button
            v-if="showCancel"
            ref="cancelButton"
            class="button"
            @click="cancel('button')"
          >
            {{ cancelText }}
          </button>
          <button
            ref="confirmButton"
            class="button"
            :class="type"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import trapFocus from './trapFocus'
// import Icon from '../icon/Icon'
import Modal from './Modal'
// import { removeElement } from '../../utils/helpers'
function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
    el.parentNode.removeChild(el)
  }
}
export default {
  name: 'Dialog',
  // components: {
  //     [Icon.name]: Icon
  // },
  directives: {
    trapFocus
  },
  extends: Modal,
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    // icon: String,
    // iconPack: String,
    // hasIcon: Boolean,
    type: {
      type: String,
      default: 'is-primary'
    },
    size: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: () => {
        return 'OK'
      }
    },
    cancelText: {
      type: String,
      default: () => {
        return 'Cancel'
      }
    },
    hasInput: Boolean, // Used internally to know if it's prompt
    inputAttrs: {
      type: Object,
      default: () => ({})
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    container: {
      type: String,
      default: () => {
        return null
      }
    },
    focusOn: {
      type: String,
      default: 'confirm'
    },
    trapFocus: {
      type: Boolean,
      default: () => {
        return false
      }
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
      default: false
    }
  },
  data() {
    const prompt = this.hasInput ? this.inputAttrs.value || '' : ''

    return {
      prompt,
      isActive: false,
      validationMessage: ''
    }
  },
  computed: {
    dialogClass() {
      return [
        this.size,
        {
          'has-custom-container': this.container !== null
        }
      ]
    },
    /**
     * Icon name (MDI) based on the type.
     */
    iconByType() {
      switch (this.type) {
        case 'is-info':
          return 'information'
        case 'is-success':
          return 'check-circle'
        case 'is-warning':
          return 'alert'
        case 'is-danger':
          return 'alert-circle'
        default:
          return null
      }
    },
    showCancel() {
      return this.cancelOptions.includes('button')
    }
  },
  beforeMount() {
    // Insert the Dialog component in the element container
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        const container =
          document.querySelector(this.container) || document.body
        container.appendChild(this.$el)
      })
    }
  },
  mounted() {
    this.isActive = true

    if (typeof this.inputAttrs.required === 'undefined') {
      this.$set(this.inputAttrs, 'required', true)
    }

    this.$nextTick(() => {
      // Handle which element receives focus
      if (this.hasInput) {
        this.$refs.input.focus()
      } else if (this.focusOn === 'cancel' && this.showCancel) {
        this.$refs.cancelButton.focus()
      } else {
        this.$refs.confirmButton.focus()
      }
    })
  },
  methods: {
    /**
     * If it's a prompt Dialog, validate the input.
     * Call the onConfirm prop (function) and close the Dialog.
     */
    confirm() {
      if (this.$refs.input !== undefined) {
        if (!this.$refs.input.checkValidity()) {
          this.validationMessage = this.$refs.input.validationMessage
          this.$nextTick(() => this.$refs.input.select())
          return
        }
      }

      this.onConfirm(this.prompt)
      this.close()
    },

    /**
     * Close the Dialog.
     */
    close() {
      this.isActive = false
      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.$destroy()
        removeElement(this.$el)
      }, 150)
    }
  }
}
</script>

<style lang="scss">
.dialog {
  .modal-card {
    max-width: 460px;
    width: auto;
    .modal-card-head {
      font-size: $size-5;
      font-weight: $weight-semibold;
    }
    .modal-card-body {
      .field {
        margin-top: 16px;
      }
      &.is-titleless {
        border-top-left-radius: $radius-large;
        border-top-right-radius: $radius-large;
      }
    }
    .modal-card-foot {
      justify-content: flex-end;
      .button {
        display: inline; // Fix Safari centering
        min-width: 5em;
        font-weight: $weight-semibold;
      }
    }
    // @include tablet {
    //   min-width: 320px;
    // }
  }
  &.is-small {
    .modal-card,
    .input,
    .button {
      //   @include control-small;
    }
  }
  &.is-medium {
    .modal-card,
    .input,
    .button {
      //   @include control-medium;
    }
  }
  &.is-large {
    .modal-card,
    .input,
    .button {
      //   @include control-large;
    }
  }
  &.has-custom-container {
    position: absolute;
  }
}
</style>
