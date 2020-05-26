<template>
  <section class="get-start">
    <b-steps v-model="activeStep" size="is-small" :has-navigation="false">
      <!-- <b-step-item
        :clickable="false"
        label="Account Setup"
        step="1"
      ></b-step-item> -->
      <b-step-item
        :clickable="false"
        label="Bind Number"
        step="1"
      ></b-step-item>
      <b-step-item
        :clickable="false"
        label="Test Services"
        step="2"
      ></b-step-item>
      <b-step-item :clickable="false" label="All Set!" step="3"></b-step-item>
    </b-steps>

    <main class="get-start-main">
      <!-- Account Setup  -->
      <!-- Bind Number  -->
      <template v-if="activeStep === 0">
        <svg-icon icon-class="active-phone" class-name="bind-number-icon" />
        <p class="bind-number-ISPS">
          <button
            v-for="(ISP, index) in ISPs"
            :key="index"
            class="bind-number-ISPS-btn"
            :class="{ active: activeISP === ISP }"
            @click="activeISP = ISP"
          >
            {{ ISP }}
            <div class="underline"></div>
          </button>
        </p>

        <div class="bind-number-ISP-desc">
          <p
            v-show="activeISP === 'Verizion'"
            class="bind-number-ISP-desc-title"
          >
            From Your Mobile Device
          </p>
          <ul
            v-show="activeISP === 'Verizion'"
            class="bind-number-ISP-desc-content"
          >
            <li>&nbsp;Enter *72.</li>
            <li>
              Enter +1(938) 253-2388 Tap the Call button and wait for
              confirmation.
            </li>
            <li>&nbsp;You should hear a confirmation tone or message.</li>
            <li>&nbsp;End your call.</li>
          </ul>
          <ul
            v-show="activeISP !== 'Verizion'"
            class="bind-number-ISP-desc-content"
          >
            <li>Enter *72.</li>
            <li>Enter +1(938) 253-2388</li>
          </ul>
          <p
            v-show="activeISP === 'Verizion'"
            class="bind-number-ISP-desc-title"
          >
            From Your Computer
          </p>
          <ul
            v-show="activeISP === 'Verizion'"
            class="bind-number-ISP-desc-content"
          >
            <li>
              In My Business Account, click the number for which you wish to
              activate call forwarding. This brings you to the Wireless Number
              Center page.
            </li>
            <li>
              In the User Information section, click Manage Call Forwarding next
              to the mobile number.
            </li>
            <li>
              Enter +1(938) 253-2388 in the Forward Mobile Number To field.
            </li>
            <li>
              Select your preferred option in the Options section:
              <ul>
                <li>Forward all calls</li>
                <li>
                  {{
                    'Forward calls when my line is busy or there is no answer'
                  }}
                </li>
              </ul>
            </li>
            <li>Click Submit.</li>
          </ul>
          <p class="bind-number-ISP-desc-note">
            *Please note that airtime charges may apply to all forwarded calls
            according to your current calling plan from your service provider
          </p>
        </div>
      </template>

      <!-- Test Services  -->
      <template v-if="activeStep === 1">
        <svg-icon icon-class="active-all-set" class-name="all-set-icon" />
        <p class="all-set-title">
          Test Services
        </p>
        <p class="all-set-sub-title">
          You Are Ready to Go!
        </p>
        <p class="all-set-tip">
          To ensure that you have successfully setup your HeyTico assistant,
          please call your phone number to test out your assistant. This will
          take about 1min.
        </p>
      </template>
      <!-- All Set! -->
      <template v-if="activeStep === 2">
        <svg-icon icon-class="active-all-set" class-name="all-set-icon" />
        <p class="all-set-title">
          All Set!
        </p>
        <p class="all-set-sub-title">
          Once you have called… You Are Ready to Go!
        </p>
        <p class="all-set-tip">
          You have successfully set up your number and it is now equipped with
          your personal AI-assistant, HeyTico.
          <br />
          Go ahead and explore its awesome features, if you have any questions
          please refer to FAQ or contact us.
        </p>
      </template>

      <!-- button groups  -->
      <div class="groups">
        <t-button
          v-if="activeStep === 2"
          class="acc-setup-back-btn"
          type="secondary"
          @click="activeStep = 1"
        >
          Back
        </t-button>
        <t-button class="acc-setup-nav-btn" @click="onContinue">
          {{ activeStep === 3 ? 'Done' : 'Continue' }}
        </t-button>
      </div>
    </main>
  </section>
</template>

<script>
// import { get } from 'lodash-es'
// import { mapGetters } from 'vuex'

export default {
  name: 'GetStart',
  layout: 'dashboard',
  // asyncData({ redirect, store, params }) {
  // @workaround add servicing number
  // const { refer } = params
  // if (refer) {
  //   return { refer }
  // }
  // await store.dispatch('relation/FETCH_RELATION')
  // const skipGetStarted = store.getters['relation/skipGetStarted']
  // if (!skipGetStarted) {
  //   return { refer: '' }
  // }
  // redirect(301, '/call-history')
  // },
  data: () => ({
    steps: [
      { title: 'Account Setup' },
      { title: 'Bind Number' },
      { title: 'Test Services' },
      { title: 'All Set!' }
    ],
    ISPs: ['Verizion', 'AT&T', 'T-Mobile', 'Sprint'],
    activeStep: 0,
    activeISP: 'Verizion',
    phoneModel: '',
    captchaModel: '',
    // activatePolling: false

    sendCodePending: false,
    sendCodeCountdown: 60,
    sendCodeText: 'Send Code'
  }),
  computed: {
    // ...mapGetters('relation', ['skipGetStarted']),
    // continueDisabled() {
    //   if (this.activeStep === 0) {
    //     return !this.phoneModel || !this.captchaModel
    //   }
    //   return false
    // },
    // sendCodeAvaliable() {
    //   return (
    //     get(this, 'phoneModel.length') === 12 && this.sendCodeCountdown === 60
    //   )
    // }
    // sendCodeText() {
    //   if (this.sendCodePending) {
    //     return `sent ${}`
    //   } else {
    //     return 'Send Code'
    //   }
    // }
  },
  watch: {
    sendCodePending(newVal) {
      if (newVal) {
        const timer = setInterval(() => {
          if (this.sendCodeCountdown === 0) {
            timer && clearInterval(timer)
            this.sendCodeText = 'Send Code'
            this.sendCodeCountdown = 60
            return
          }
          this.sendCodeText = `Sent ${this.sendCodeCountdown--}s`
        }, 1000)
      }
    }
  },
  methods: {
    onPhoneInput(phone) {
      phone = phone || ''
      this.$nextTick(() => {
        this.phoneModel = phone
          .substring(0, 12)
          .replace(/\D/g, '')
          .replace(/(\d)(?=((?:\d{4})|(?:\d{7}))$)/g, '$1-')
      })
    },
    // async sendCode() {
    //   if (this.sendCodePending) {
    //     return
    //   }
    //   this.sendCodePending = true
    //   await this.$axios({
    //     url: '/overseas/captcha',
    //     method: 'GET',
    //     params: {
    //       phone: `+1${this.phoneModel.replace(/\D/g, '')}`
    //     }
    //   })
    //   this.sendCodePending = false
    // },
    onContinue() {
      if (this.activeStep === 2) {
        window.location.reload()
        return
      }
      //   if (this.activeStep === 0) {
      //     const result = await this.$axios({
      //       method: 'POST',
      //       url: '/overseas/relation/phone',
      //       params: {
      //         phone: `+1${this.phoneModel.replace(/\D/g, '')}`,
      //         captcha: this.captchaModel
      //       }
      //     })
      //     this.$store.dispatch('relation/FETCH_RELATION')
      //     if (get(result, 'err_code') && get(result, 'err_msg')) {
      //       this.$message.open(get(result, 'err_msg'))
      //       return
      //     }
      //   }
      //   const activated = get(result, 'activated', '')
      //   if (activated) {
      //     this.activatePolling = false
      //   } else {
      //     this.activatePolling = true
      //     let attempts = 0
      //     const timer = setInterval(async () => {
      //       if (attempts >= 3) {
      //         timer && clearInterval(timer)
      //         this.activatePolling = false
      //         this.$message.open('')
      //         return
      //       }
      //       await this.$store.dispatch('relation/FETCH_RELATION')
      //       attempts++
      //       if (this.activated) {
      //         this.activatePolling = false
      //         timer && clearInterval(timer)
      //       }
      //     }, 5000)
      //   }
      // }
      this.activeStep++
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.get-start {
  width: 100%;
  //   padding: 48px;
  //   background: $main-panel-background;
  .header-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav {
      display: flex;
      justify-content: space-between;
      align-self: baseline;
      ul {
        display: flex;
        align-items: center;
        li {
          margin-right: 24px;
          cursor: pointer;
        }
        & :last-child {
          margin-right: 0;
        }
      }
      .primary {
        @include primary-text($font-size: 18px);
      }
    }
    .steps-wrap {
      // width: 30%;
      margin-right: 34%;
    }
  }
  &-main {
    margin: 0 auto;
    width: 60%;
    display: flex;
    flex-flow: column;
    border-radius: 16px;
    background: #fff;
    padding: 48px 72px;
    text-align: center;

    & .acc-setup-tip {
      font-size: 14px;
      font-weight: normal;
    }
  }
}
.acc-setup {
  &-icon {
    font-size: 48px;
  }
  &-title {
    margin-top: 16px;
    @include primary-text;
  }
  &-tip {
    @include secondary-text;
  }
  &-form {
    &-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 32px;
    }
    &-label {
      margin-right: 8px;
      flex-basis: 26%;
      color: #141b24;
      text-align: left;
      font-size: 14px;
      font-weight: normal;
    }
    &-group {
      display: flex;
      flex-grow: 7;
      justify-content: space-between;
      align-items: center;
    }
    &-input {
      flex: 1;
      @include reset-buefy-input;

      /deep/ &.phone input {
        padding-left: 50px;
      }
    }
    &-phone-wrap {
      flex: 1;
      position: relative;
      &:before {
        content: '+1';
        position: absolute;
        top: 5px;
        left: 16px;
        z-index: 1;
        @include primary-text($font-size: 18px);
      }
    }
    // &-btn {
    //   background: rgba(2, 174, 252, 0.1);
    //   color: #02aefc;
    //   border: none;
    //   font-weight: bold;
    //   &.send-code {
    //     margin-left: 32px;
    //   }
    //   &:hover {
    //     background: #02aefc2b;
    //   }
    // }
  }

  &-back-btn {
    float: left;
  }
  &-nav-btn {
    float: right;
  }
}
.groups {
  margin-top: 30px;
  overflow: hidden;
}
.send-code {
  margin-left: 16px;
}
.bind-number {
  &-icon {
    font-size: 48px;
  }
  &-ISPS {
    margin: 32px auto 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    &-btn {
      display: flex;
      flex-flow: column;
      align-items: center;
      background: inherit;
      border: none;
      cursor: pointer;
      @include secondary-text;
      @include text-button;
      &:hover {
        & .underline {
          display: flex;
          background: $secondary-text-color;
        }
      }
      & .underline {
        display: none;
        margin-top: 4px;
        width: 32px;
        height: 4px;
        background: #02aefc;
      }
      &.active {
        color: #02aefc;
        & .underline {
          display: flex;
          background: #02aefc;
        }
      }
    }
  }
  &-ISP-desc {
    margin-top: 32px;
    height: 300px;
    overflow-y: auto;
    color: #141b24;
    font-size: 18px;
    font-weight: bold;
    text-align: left;

    &:first-child {
      margin-top: 0;
    }
    &-title {
      margin-top: 24px;
      @include primary-text($font-size: 18px);
    }
    &-content {
      margin-top: 24px;
      list-style: none;
      & li {
        margin-bottom: 10px;

        & ul {
          margin: 10px 0 0 17px;
        }
      }
      & :last-child {
        margin-bottom: 0;
      }
      & li:before {
        content: '\2022'; /* Add content: \2022 is the CSS Code/unicode for a bullet */
        color: #101213; /* Change the color */
        font-weight: bold; /* If you want it to be bold */
        display: inline-block; /* Needed to add space between the bullet and the text */
        width: 1em; /* Also needed for space (tweak if needed) */
      }
      @include primary-text($font-size: 14px, $font-weight: normal);
    }
    &-note {
      margin-top: 24px;
      @include secondary-text($font-size: 14px, $font-weight: normal);
    }
  }
}
.all-set {
  &-icon {
    font-size: 48px;
  }
  &-title {
    margin-top: 16px;
    text-align: center;
    @include primary-text;
  }
  &-sub-title {
    margin-top: 24px;
    text-align: left;
    @include primary-text($font-size: 18px);
  }
  &-tip {
    margin-top: 24px;
    text-align: left;
    @include primary-text($font-size: 16px, $font-weight: normal);
  }
}

@include mobile {
  .get-start {
    padding-top: 28px;
  }
  .get-start-steps {
    width: auto;
    /deep/ .step-title {
      font-size: 12px;
    }
  }

  .get-start-main {
    margin: 24px 14px;
    width: auto;
    padding: 24px;
    .acc-setup-title {
      font-size: 18px;
    }
    .acc-setup-tip {
      margin-top: 10px;
      font-size: 12px;
    }
    .acc-setup-form-row {
      margin-top: 10px;
      flex-flow: column;
    }
    .acc-setup-form-group {
      width: 100%;
    }
    .acc-setup-form-label {
      align-self: flex-start;
      margin-bottom: 6px;
    }
    .acc-setup-nav-btn {
      margin-top: 16px;
    }

    // bind number
    .bind-number-ISP-desc {
      height: auto;
      overflow: auto;
      margin-top: 12px;
    }
    .bind-number-ISP-desc-title {
      text-align: center;
    }
  }
}

/* Override Buefy Step Styles */
/deep/ .b-steps {
  max-width: 600px;
  margin: 3rem auto 1rem;
}

/deep/ .step-details {
  background: transparent !important;
}

/deep/ .step-marker {
  border: none !important;
}

/deep/ .b-steps .steps .step-items .step-item .step-link {
  color: $secondary-text-color;
}

/deep/ .b-steps .steps .step-items .step-item .step-marker {
  background: $secondary-text-color;
}

/deep/ .b-steps .steps .step-items .step-item.is-previous .step-marker,
/deep/ .b-steps .steps .step-items .step-item.is-active .step-marker {
  background: $linear-gradient;
}

/deep/ .b-steps .steps .step-items .step-item.is-active .step-marker {
  color: $white;
  background: $linear-gradient;
}

/deep/ .b-steps .steps .step-items .step-item .step-details .step-title {
  font-weight: normal;
}

/deep/ .b-steps .steps .step-items .step-item.is-previous .step-title,
/deep/ .b-steps .steps .step-items .step-item.is-active .step-title {
  @include gradient-text;
}
</style>
