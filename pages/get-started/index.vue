<template>
  <section class="get-start">
    <div class="steps">
      <div
        v-for="(step, index) of steps"
        :key="index"
        class="step"
        :class="[activeStep === index ? 'is-process' : '']"
      >
        <div class="step-head">
          <div class="step-line"></div>
          <div class="step-text">
            <div class="step-text-inner">{{ index + 1 }}</div>
          </div>
        </div>
        <div class="step-main">
          <div class="step-title">{{ step }}</div>
        </div>
      </div>
    </div>

    <main class="get-start-main">
      <!-- Account Setup  -->
      <template v-if="activeStep === 0">
        <svg-icon icon-class="acc-setup" class-name="acc-setup-icon" />
        <p class="acc-setup-tip">No Registed Phone</p>
        <div class="acc-setup-form-row">
          <span class="acc-setup-form-label">Phone Number</span>
          <div class="acc-setup-form-group">
            <b-input
              v-model="phoneModel"
              rounded
              class="acc-setup-form-input"
            ></b-input>
            <b-button
              rounded
              class="acc-setup-form-btn send-code"
              @click="sendCode"
              >Send Code</b-button
            >
          </div>
        </div>
        <div class="acc-setup-form-row">
          <span class="acc-setup-form-label">Verification Code</span>
          <div class="acc-setup-form-group">
            <b-input
              v-model="captchaModel"
              rounded
              class="acc-setup-form-input"
            ></b-input>
          </div>
        </div>
      </template>
      <!-- Bind Number  -->
      <template v-if="activeStep === 1">
        <svg-icon icon-class="phone" class-name="bind-number-icon" />
        <p class="bind-number-ISPS">
          <button class="bind-number-ISPS-btn">
            Verizion
          </button>
          <button class="bind-number-ISPS-btn">
            AT&T
          </button>
          <button class="bind-number-ISPS-btn">
            T-Mobile
          </button>
          <button class="bind-number-ISPS-btn">
            Sprint
          </button>
        </p>
        <p class="bind-number-ISP-desc">
          Lacus, et malesuada enim amet, amet. Mi hac suspendisse erat mauris
          mattis urna, ac. Mauris luctus felis, egestas pellentesque diam semper
          duis tellus. Cursus diam sit senectus sit vitae tincidunt mi. Lacus,
          et malesuada enim amet, amet. Mi hac suspendisse erat mauris mattis
          urna, ac. Mauris luctus felis, egestas pellentesque diam semper duis
          tellus. Cursus diam sit senectus sit vitae tincidunt mi.Lacus, et
          malesuada enim amet, amet. Mi hac suspendisse erat mauris mattis urna,
          ac. Mauris luctus felis, egestas pellentesque diam semper duis tellus.
          Cursus diam sit senectus sit vitae tincidunt mi.
        </p>
      </template>
      <!-- All Set! -->
      <template v-if="activeStep === 2">
        <svg-icon icon-class="all-set" class-name="all-set-icon" />
        <p class="all-set-congrats">
          You Are Ready to Go!
        </p>
        <p class="all-set-tip">
          You have successfully set up your number and it is now equipped with
          your personal virtual assistant, DoubleMe.
          <br />
          <br />
          Go ahead and try out its awesome features, if you have any questions
          please refer to FAQ or contact us.
        </p>
      </template>
      <b-button
        rounded
        class="acc-setup-nav-btn"
        :loading="activatePolling"
        @click="onContinue"
        >Continue</b-button
      >
    </main>
  </section>
</template>

<script>
import { get } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'GetStart',
  layout: 'dashboard',
  async asyncData({ redirect, store }) {
    await store.dispatch('relation/FETCH_RELATION')
    const activated = get(store, 'state.relation.activated')
    if (!activated) {
      return {}
    }
    redirect(301, '/call-history')
  },
  data: () => ({
    steps: ['Account Setup', 'Bind Number', 'All Set!'],
    activeStep: 0,
    phoneModel: '',
    captchaModel: '',
    activatePolling: true
  }),
  computed: {
    ...mapState({
      activated: (state) => get(state, 'relation.activated', false)
    })
  },
  methods: {
    sendCode() {
      this.$axios({
        url: '/overseas/captcha',
        method: 'GET',
        params: {
          phone: '18070260521'
        }
      })
    },
    async onContinue() {
      if (this.activeStep === 2) {
        this.$router.redirect(301, '/call-history')
        return
      }
      if (this.activeStep === 0) {
        const { activated } = await this.$axios({
          method: 'POST',
          url: '/overseas/relation/phone',
          data: {
            phone: this.phoneModel,
            captcha: this.captchaModel
          }
        })
        if (activated) {
          this.activatePolling = false
        } else {
          const timer = setInterval(async () => {
            await this.$store.dispatch('relation/FETCH_RELATION')
            if (this.activated) {
              this.activatePolling = false
              timer && clearInterval(timer)
            }
          }, 5000)
        }
      }
      this.activeStep++
    }
  }
}
</script>

<style lang="scss" scoped>
.get-start {
  padding-top: 84px;
  &-main {
    margin: 48px auto 0;
    width: 60%;
    display: flex;
    flex-flow: column;
    border-radius: 16px;
    background: #fff;
    padding: 48px 72px;
    text-align: center;
  }
}
.acc-setup {
  &-icon {
    font-size: 48px;
  }
  &-tip {
    margin-top: 16px;
    font-size: 24px;
    font-weight: bold;
    color: #141b24;
  }
  &-form {
    &-row {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
    }
    &-label {
      flex-basis: 26%;
      color: #141b24;
      text-align: left;
      font-size: 18px;
      font-weight: 600;
    }
    &-group {
      display: flex;
      flex-grow: 7;
      justify-content: space-between;
    }
    &-input {
      flex: 1;
    }
    /deep/ &-input input {
      background: #eff5fc;
      border: none;
    }
    &-btn {
      background: rgba(2, 174, 252, 0.1);
      color: #02aefc;
      border: none;
      font-weight: bold;
      &.send-code {
        margin-left: 32px;
      }
    }
  }
  &-nav-btn {
    margin-top: 100px;
    background: #02aefc;
    align-self: flex-end;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
}
.bind-number {
  &-icon {
    font-size: 32px;
  }
  &-ISPS {
    margin: 32px auto 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    &-btn {
      background: inherit;
      border: none;
      color: #59687a;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      &.active {
        color: #02aefc;
      }
    }
  }
  &-ISP-desc {
    margin-top: 32px;
    color: #141b24;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
}
.all-set {
  &-icon {
    font-size: 48px;
  }
  &-congrats {
    margin: 32px auto 0;
    color: #141b24;
    font-size: 24px;
    font-weight: bold;
  }
  &-tip {
    margin-top: 24px;
    text-align: left;
    color: #141b24;
    font-size: 18px;
    font-weight: bold;
  }
}
.steps {
  display: flex;
  margin: 0 auto;
  width: 50%;
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
      background: linear-gradient(90deg, #00a3ff 3.65%, #335ffe 85.2%);
    }
    & .step-title {
      background-image: linear-gradient(90deg, #00a3ff 3.65%, #335ffe 85.2%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
