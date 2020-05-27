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
          If you unbind this number, all the ipsum dolor sit amet, consectetur
          adipiscing elit. Malesuada neque, in vestibulum ultrices felis. Velit,
          sit nascetur vulputate lobortis tempus, elit. Tempor scelerisque et
          turpis vehicula. Eget sed gravida et odio ultrices a risus.
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
          <p v-show="activeISP === 'Verizion'" class="title">
            From Your Mobile Device
          </p>
          <ul v-show="activeISP === 'Verizion'" class="content">
            <li>&nbsp;Enter *72.</li>
            <li>
              Enter +1(938) 253-2388 Tap the Call button and wait for
              confirmation.
            </li>
            <li>&nbsp;You should hear a confirmation tone or message.</li>
            <li>&nbsp;End your call.</li>
          </ul>
          <ul v-show="activeISP !== 'Verizion'" class="content">
            <li>Enter *72.</li>
            <li>Enter +1(938) 253-2388</li>
          </ul>
          <p v-show="activeISP === 'Verizion'" class="title">
            From Your Computer
          </p>
          <ul v-show="activeISP === 'Verizion'" class="content">
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
          <p class="note">
            *Please note that airtime charges may apply to all forwarded calls
            according to your current calling plan from your service provider
          </p>
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
    ISPs: ['Verizion', 'AT&T', 'T-Mobile', 'Sprint'],
    activeISP: 'Verizion'
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
