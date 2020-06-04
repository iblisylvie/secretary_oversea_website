<template>
  <section class="unbind-number">
    <div class="header-wrap">
      <nav class="nav">
        <ul class="primary">
          <li @click="$router.back()">
            <svg-icon icon-class="go-back"></svg-icon>
          </li>
          <li>Account Setting</li>
        </ul>
      </nav>
      <Steps class="steps-wrap" :active="activeStep" :steps="steps"></Steps>
    </div>

    <main class="card">
      <svg-icon icon-class="active-phone" class-name="shape" />
      <!-- Confirm  -->
      <template v-if="activeStep === 0">
        <p class="title">
          {{ `Do you confirm to unbind ${phone}?` }}
        </p>
        <p class="tip">
          Once you unbind this number, it will no longer forward unanswered
          calls to HeyTico AI-assistant. Your previous call histroy will still
          be avaible to check in your account. Feel free to bind another number
          or bind again in the future.
        </p>
      </template>
      <!-- Cancel Services  -->
      <template v-if="activeStep === 1">
        <p class="ISPS">
          <button
            v-for="(ISP, index) in ISPs"
            :key="index"
            class="btn"
            :class="{ active: activeISP === ISP }"
            @click="activeISP = ISP"
          >
            {{ ISP }}
            <div class="underline"></div>
          </button>
        </p>

        <div class="desc">
          <!-- Verizon  -->
          <template v-if="activeISP === 'Verizon'">
            <p class="title">
              From Your Mobile Device
            </p>
            <ul class="content">
              <li>Enter *73.</li>
              <li>
                Tap the Call button and wait for confirmation. You should hear a
                confirmation tone or message.
              </li>
              <li>End your call.</li>
            </ul>
            <p class="title">
              From Your Computer
            </p>
            <ul class="content">
              <li>
                In My Business Account, click the number for which you wish to
                turn off or modify call forwarding. This brings you to the
                Wireless Number Center page.
              </li>
              <li>
                In the User Information section, click Manage Call Forwarding
                next to the wireless number.
              </li>
              <li>
                Select your desired option for modifying or cancelling call
                forwarding:
              </li>
              <li>Click Cancel Call Forwarding</li>
              <li>Enter the new number you’d like your calls forwarded to.</li>
              <li>Change when you want your calls forwarded.</li>
              <li>Click Submit.</li>
            </ul>
          </template>

          <!-- AT&T  -->
          <template v-if="activeISP === 'AT&T'">
            <ul class="content">
              <li>Enter *63 Disable call forwarding for busy situation</li>
              <li>Enter *93 Disable call forwarding for no answer situation</li>
              <li>
                Enter *95 Disable call forwarding for not reachable situation
              </li>
            </ul>
          </template>

          <!-- Sprint  -->
          <template v-if="activeISP === 'Sprint'">
            <ul class="content">
              <li>
                Enter *38. Disable call forwarding for busy situation and no
                Answer situation
              </li>
            </ul>
          </template>

          <!-- T-Mobile  -->
          <template v-if="activeISP === 'T-Mobile'">
            <ul class="content">
              <li>Enter ##67# for busy situation</li>
              <li>
                Enter ##61# Disable call forwarding for no answer situation
              </li>
              <li>
                Enter ##62# Disable call forwarding for not reachable situation
              </li>
            </ul>
          </template>
        </div>
      </template>
      <div class="groups">
        <t-button @click="onClickNext">
          {{ nextBtnText }}
        </t-button>
      </div>
    </main>
  </section>
</template>

<script>
import { get } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'UnbindNumber',
  layout: 'dashboard',
  data: () => ({
    steps: [{ title: 'Confirm' }, { title: 'Cancel Services' }],
    activeStep: 0,
    ISPs: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'],
    activeISP: 'Verizon'
  }),
  computed: {
    ...mapState({
      ...mapState('auth', ['nickname', 'email'])
    }),
    nextBtnText() {
      return this.activeStep === 0 ? 'Continue' : 'Done'
    },
    phone() {
      return get(this, '$route.params.phone', '')
    },
    isPrimaryPhone() {
      return get(this, '$route.params.isPrimaryPhone', false)
    }
  },
  methods: {
    async onClickNext() {
      if (this.activeStep === 0) {
        if (this.isPrimaryPhone) {
          await this.$store.dispatch('relation/DELETE_RELATION')
          await this.$store.dispatch('relation/FETCH_RELATION')
        } else {
          await this.$store.dispatch('phone-attach/DELETE_PHONE_ATTACH', {
            phone: this.phone
          })
          await this.$store.dispatch('phone-attach/FETCH_PHONE_ATTACH', {
            reFetch: true
          })
        }
        this.activeStep++
        return
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.unbind-number {
  padding: 48px;
  .header-wrap {
    display: flex;
    align-items: center;
    .nav {
      display: flex;
      justify-content: space-between;
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
      width: 30%;
      margin-right: 34%;
    }
  }

  .card {
    margin: 48px auto 0;
    width: 60%;
    display: flex;
    flex-flow: column;
    border-radius: 16px;
    background: #fff;
    padding: 48px 72px;
    text-align: center;

    .shape {
      font-size: 48px;
    }
    .title {
      margin-top: 24px;
      @include primary-text($font-size: 18px);
    }
    .tip {
      text-align: left;
      @include primary-text($font-size: 16px, $font-weight: normal);
    }

    // Cancel Services
    .ISPS {
      margin: 32px auto 0;
      width: 80%;
      display: flex;
      justify-content: space-between;
      .btn {
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
    .desc {
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
      .title {
        margin-top: 24px;
        @include primary-text($font-size: 18px);
      }
      .content {
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
      .note {
        margin-top: 24px;
        @include secondary-text($font-size: 14px, $font-weight: normal);
      }
    }
    .groups {
      margin-top: 58px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
