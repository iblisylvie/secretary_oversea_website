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
        label="Activate Me"
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
          <!-- For iOS users  -->
          <template v-if="activeISP === 'For iOS users'">
            <ul class="bind-number-ISP-desc-content">
              <li>
                Go to Settings ⇒ Phone ⇒ Call Forwarding ⇒ Put in this number:
                <strong>(938) 253-2388</strong> and wait for a while to save.
              </li>
              <li>
                Make sure you choose conditional call forwarding for “busy”,
                “unanswered” and “non-reachable” situations.
              </li>
              <li>
                Call your own phone number to see if call forwarding has
                succeeded.
              </li>
              <li>
                If this goes to voicemail, you will need to disable it to
                activate HeyTico AI-Assistant.
              </li>
            </ul>
          </template>

          <!-- For Android users  -->
          <template v-if="activeISP === 'For Android users'">
            <ul class="bind-number-ISP-desc-content">
              <li>
                Got to Phone ⇒ Call Forwarding ⇒ Put in this number:
                <strong>(938) 253-2388</strong> and save changes
              </li>
              <li>
                Make sure you choose conditional call forwarding for “busy”,
                “unanswered” and “non-reachable” situations.
              </li>
              <li>
                Call your own phone number to see if call forwarding has
                succeeded.
              </li>
              <li>
                If this goes to voicemail, you will need to disable it to
                activate HeyTico AI-Assistant.
              </li>
            </ul>
          </template>

          <!-- Verizon  -->
          <!-- <template v-if="activeISP === 'Verizon'">
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for busy, no answer and not reachable
              situation
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>*71-938-253-2388</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message.
              </li>
              <li>&nbsp;End your call.</li>
            </ul>
            </ul> 
            <p class="bind-number-ISP-desc-note">
              Please note that airtime charges may apply to all forwarded calls
              according to your current calling plan from your service provider.
              If you have trouble binding, please go to
              <t-button
                type="text"
                @click="
                  $router.push({
                    path: '/support'
                  })
                "
              >
                Support
              </t-button>
              for more information.
            </p>
          </template> -->

          <!-- AT&T  -->
          <!-- <template v-if="activeISP === 'AT&T'">
            <p class="bind-number-ISP-desc-title">
              You will need to call all of the following numbers to setup.
            </p>
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for busy situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>*62-938-253-2388</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for no answer situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>*92-938-253-2388</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for non-reachable situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>*94-938-253-2388</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-note">
              Please note that airtime charges may apply to all forwarded calls
              according to your current calling plan from your service provider.
              If you have trouble binding, please go to
              <t-button
                type="text"
                @click="
                  $router.push({
                    path: '/support'
                  })
                "
              >
                Support
              </t-button>
              for more information.
            </p>
          </template> -->

          <!-- Sprint  -->
          <!-- <template v-if="activeISP === 'Sprint'">
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for busy, no answer situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>*28-938-253-2388</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-note">
              Please note that airtime charges may apply to all forwarded calls
              according to your current calling plan from your service provider.
              If you have trouble binding, please go to
              <t-button
                type="text"
                @click="
                  $router.push({
                    path: '/support'
                  })
                "
              >
                Support
              </t-button>
              for more information.
            </p>
          </template> -->

          <!-- T-Mobile  -->
          <!-- <template v-if="activeISP === 'T-Mobile'">
            <p class="bind-number-ISP-desc-title">
              You will need to call all of the following numbers to setup.
            </p>

            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for busy situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>**67*1-938-253-2388#</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for non-reachable situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>**62*1-938-253-2388#</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-title">
              Enable call forwarding for no answer situations
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Enter <strong>**61*1-938-253-2388#</strong> (Don't forget the
                asterisk)
              </li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message
              </li>
            </ul>
            <p class="bind-number-ISP-desc-note">
              Please note that airtime charges may apply to all forwarded calls
              according to your current calling plan from your service provider.
              If you have trouble binding, please go to
              <t-button
                type="text"
                @click="
                  $router.push({
                    path: '/support'
                  })
                "
              >
                Support
              </t-button>
              for more information.
            </p>
          </template> -->

          <!-- Others  -->
          <!-- <template v-if="activeISP === 'Others'">
            <p class="bind-number-ISP-desc-title">
              Unfortunately Google Fi is not yet supported. We will work as hard
              as we can to support this carrier.
            </p>

            <p class="bind-number-ISP-desc-title">
              iOS
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Go to Settings ⇒ Phone ⇒ Call Forwarding ⇒ Put in this number:
                <strong>(938) 253-2388</strong> and wait for a while to save.
              </li>
              <li>
                Make sure you choose conditional call forwarding for “busy”,
                “unanswered” and “non-reachable” situations.
              </li>
              <li>
                Call your own phone number to see if call forwarding has
                succeeded.
              </li>
              <li>
                If this goes to voicemail, you will need to disable it to
                activate HeyTico AI-Assistant.
              </li>
            </ul>
            <p class="bind-number-ISP-desc-title">
              Android
            </p>
            <ul class="bind-number-ISP-desc-content">
              <li>
                Got to Phone ⇒ Call Forwarding ⇒ Put in this number:
                <strong>(938) 253-2388</strong> and save changes
              </li>
              <li>
                Make sure you choose conditional call forwarding for “busy”,
                “unanswered” and “non-reachable” situations.
              </li>
              <li>
                Call your own phone number to see if call forwarding has
                succeeded.
              </li>
              <li>
                If this goes to voicemail, you will need to disable it to
                activate HeyTico AI-Assistant.
              </li>
            </ul>
            <p class="bind-number-ISP-desc-note">
              Please note that airtime charges may apply to all forwarded calls
              according to your current calling plan from your service provider.
              If you have trouble binding, please go to
              <t-button
                type="text"
                @click="
                  $router.push({
                    path: '/support'
                  })
                "
              >
                Support
              </t-button>
              for more information.
            </p>
          </template> -->
        </div>
        <!-- button groups  -->
        <div class="groups">
          <t-button class="acc-setup-nav-btn" @click="activeStep++">
            Continue
          </t-button>
        </div>
      </template>

      <!-- Activate Me  -->
      <template v-if="activeStep === 1">
        <div style="position: relative">
          <svg-icon icon-class="active-all-set" class-name="all-set-icon" />
          <div v-if="retryActivate" style="position: absolute; top: 0; right:0">
            <t-button
              type="text"
              @click="
                $router.push({
                  path: '/support'
                })
              "
            >
              Support
            </t-button>
            <t-button
              type="text"
              style="margin-left:20px"
              @click="
                $router.push({
                  path: '/contact'
                })
              "
            >
              Contact Us
            </t-button>
          </div>
        </div>
        <p class="all-set-title">
          Activate Me
        </p>
        <p class="all-set-sub-title">
          {{
            'Please activate your HeyTico AI-assistant to start your service by clicking the button below. You will receive an automated call from us, please DO NOT pick up so that it forwards to your HeyTico AI-assistant to activate. After you hang up, please wait for the page to refresh.'
          }}
        </p>
        <!-- <p class="all-set-tip">
          To ensure that you have successfully setup your HeyTico assistant,
          please call your phone number to test out your assistant. This will
          take about 1min.
        </p> -->
        <div class="groups">
          <t-button
            class="acc-setup-back-btn"
            type="secondary"
            @click="activeStep--"
          >
            Back
          </t-button>
          <t-button
            class="acc-setup-nav-btn"
            :disabled="!activateMeAvaliable"
            @click="onActivateMe"
          >
            {{ activateMeText }}
          </t-button>
        </div>
      </template>
      <!-- All Set! -->
      <template v-if="activeStep === 2">
        <svg-icon icon-class="active-all-set" class-name="all-set-icon" />
        <p class="all-set-title">
          All Set!
        </p>
        <!-- <p class="all-set-sub-title">
          Once you have called you are ready to go.
        </p> -->
        <p class="all-set-tip">
          You have successfully set up your number and it is now equipped with a
          personal AI-assistant, HeyTico.
          <br />
          Go ahead and explore its awesome features, if you have any questions
          please refer to
          <t-button
            type="text"
            @click="
              $router.push({
                path: '/support'
              })
            "
          >
            Support
          </t-button>
          or
          <t-button
            type="text"
            @click="
              $router.push({
                path: '/contact'
              })
            "
          >
            Contact Us </t-button
          >.
        </p>
        <div class="groups">
          <t-button class="acc-setup-nav-btn" @click="reload">
            Done
          </t-button>
        </div>
      </template>
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash-es'

export default {
  name: 'TestServices',
  layout: 'dashboard',
  data: () => ({
    steps: [
      { title: 'Account Setup' },
      { title: 'Bind Number' },
      { title: 'Activate Me' },
      { title: 'All Set!' }
    ],
    ISPs: ['For iOS users', 'For Android users'],
    activeStep: 0,
    activeISP: 'For iOS users',
    phoneModel: '',
    captchaModel: '',
    // activatePolling: false

    activateMePending: false,
    activateMeCountdown: 90,
    activateMeText: 'Activate Me',
    retryActivate: false
  }),
  computed: {
    ...mapState({
      phoneNumber(state) {
        return get(state, 'relation.relation.phone')
      }
    }),
    activateMeAvaliable() {
      return this.activateMeCountdown === 90
    }
  },
  watch: {
    activateMePending(newVal) {
      if (newVal) {
        const timer = setInterval(() => {
          if (this.activateMeCountdown !== 0) {
            this.activateMeText = `Sent ${this.activateMeCountdown--}s`
            if (this.activateMeCountdown % 10 === 0) {
              this.checkActivated()
            }
            return
          }
          timer && clearInterval(timer)
          this.checkActivated()
          this.activateMeText = 'Try Again'
          this.activateMeCountdown = 90
          this.retryActivate = true
        }, 1000)
      }
    }
  },
  methods: {
    async onActivateMe() {
      if (this.activateMePending) {
        return
      }
      this.activateMePending = true
      const response = await this.$activateVerifyAxios({
        method: 'GET',
        url: `/api/v1/verify/${this.phoneNumber}`
      })
      this.activateMePending = false
      if (get(response, 'data.code') !== 200) {
        this.$message.open({
          // message: get(response, 'data.message'),
          message: 'Call Forwarding Failed',
          type: 'is-warning'
        })
      }
    },
    reload() {
      window.location.reload()
    },
    async checkActivated() {
      if (this.fetchingRelation) {
        return
      }
      this.fetchingRelation = true
      await this.$store.dispatch('relation/FETCH_RELATION')
      this.fetchingRelation = false
      if (get(this, '$store.state.relation.relation.activated')) {
        this.activeStep++
      }
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

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }

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
