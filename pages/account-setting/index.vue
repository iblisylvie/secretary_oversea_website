<template>
  <section class="acc-settings">
    <nav class="nav">
      <ul class="primary">
        <li @click="$router.back()">
          <svg-icon icon-class="go-back"></svg-icon>
        </li>
        <li>Account</li>
      </ul>
      <!-- <ul class="secondary">
        <li @click="$router.push({ path: '/feedback' })">Got Any Feedback?</li>
      </ul>-->
    </nav>
    <main class="panel">
      <!-- Account Settings  -->
      <section class="block">
        <h3 class="title">Account Settings</h3>
        <div class="label">Name</div>
        <div class="form">
          <p v-show="!editingName">{{ nickname }}</p>
          <b-input
            v-show="editingName"
            v-model="nameModel"
            class="input-field"
          />
          <div>
            <button class="primary-opt" @click="onTriggerEditingName">
              {{ editingName ? 'Save' : 'Edit' }}
            </button>
            <button
              v-show="editingName"
              class="secondary-opt"
              @click="editingName = false"
            >
              cancel
            </button>
          </div>
        </div>
        <div class="label">Gender</div>
        <div class="form">
          <p v-show="!editingGender">{{ gender ? 'Male' : 'Female' }}</p>
          <div v-show="editingGender">
            <b-radio
              v-model="genderModel"
              size="is-small"
              name="name"
              native-value="1"
              >Male</b-radio
            >
            <b-radio
              v-model="genderModel"
              size="is-small"
              name="name"
              native-value="0"
              >Female</b-radio
            >
          </div>
          <div>
            <button class="primary-opt" @click="onTriggerEditingGender">
              {{ editingGender ? 'Save' : 'Edit' }}
            </button>
            <button
              v-show="editingGender"
              class="secondary-opt"
              @click="editingGender = false"
            >
              cancel
            </button>
          </div>
        </div>
        <div class="label">Email</div>
        <div class="form">
          <p>{{ email || 'None' }}</p>
          <!-- <button class="opt">
            Edit
          </button>-->
        </div>
        <div class="label">Email Preference</div>
        <div class="form">
          <b-checkbox
            v-model="emailPreferenceModel"
            :disabled="true"
            type="is-info"
            >Receive an email of call summary after each call</b-checkbox
          >
        </div>
        <div
          class="label"
          style="font-size: 14px; margin-top: 16px; font-weight: normal"
        >
          More email preferences coming soon.
        </div>
        <!-- <div class="form">
          <b-checkbox :value="emailPreferenceModel" type="is-info">
            Receive weekly call summary
          </b-checkbox>
        </div>
        <div class="form">
          <b-checkbox :value="emailPreferenceModel" type="is-info">
            Receive cool updates and discount information from HeyTico
          </b-checkbox>
        </div>-->
        <!-- <a
          href="https://passport.mobvoi.com/pages/user-edit?lang=en-us"
          target="_blank"
        >
          <t-button class="submit">Edit</t-button>
        </a>-->
        <!-- <t-button disabled class="submit">Edit</t-button> -->
      </section>
      <hr class="seprate" />
      <!-- Subscription  -->
      <section class="block">
        <h3 class="title">Subscription</h3>
        <div class="label">Current Plan</div>
        <template v-if="!isVip">
          <div class="form">
            <p>FREE</p>
          </div>
          <div class="form" style="margin-top: 12px; font-weight: normal">
            When you go premium, you will be able to:
          </div>
          <ul>
            <li>
              Customize your responses
              <br />
              <p class="note">
                &nbsp;Setup your personal opening remark, refusal message, and
                special replies
              </p>
            </li>
            <li>
              Customize your names
              <br />
              <p class="note">
                &nbsp;Have a more personal name for yourself and your virtual
                assistant
              </p>
            </li>
            <li>
              Bind more numbers
              <br />
              <p class="note">
                &nbsp;Have more than one number? Add it on to your account, so
                you get an assistant for each number
              </p>
            </li>
          </ul>
          <t-button class="submit" @click="$message.open('Feature coming soon')"
            >Upgrade</t-button
          >
        </template>
        <template v-if="isVip">
          <div class="form">
            <p>PREMIUM</p>
          </div>
          <div class="form">
            <p>End at: {{ vipEndAt }}</p>
          </div>
        </template>
      </section>
      <hr class="seprate" />
      <!-- Servicing Number  -->
      <section class="block">
        <h3 class="title">Servicing Number</h3>
        <div class="form">
          <p v-for="(number, index) in phones" :key="index" class="row">
            <svg-icon icon-class="phone" class-name="shape"></svg-icon>
            <span>{{ number }}</span>
            <t-button
              type="text"
              class="unbind"
              :disabled="Boolean(number === phone && attachPhones.length)"
              @click="onUnbindPhone(number)"
              >Unbind</t-button
            >
          </p>
        </div>
        <!-- <div class="form" style="margin-top: 16px">
          <p>(907) 555-0101</p>
        </div>-->
        <t-button
          class="submit"
          style="padding:6px 8px;"
          @click="leadToBindNumber"
        >
          <svg-icon icon-class="add"></svg-icon>
        </t-button>
      </section>
      <hr class="seprate" />
      <section class="block">
        <p class="note">
          This account will no longer be available, and all its data will be
          deleted
        </p>
        <t-button type="text" @click="leadToDeleteAccount"
          >DELETE ACCOUNT</t-button
        >
        <!-- <button class="danger" @click="leadToDeleteAccount">
          DELETE ACCOUNT
        </button>-->
      </section>
    </main>
  </section>
</template>

<script>
import { get } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'AccountSettings',
  layout: 'dashboard',
  // middleware: ['bind-number-checker'],
  data() {
    return {
      emailPreferenceModel: true,

      nameModel: '',
      editingName: false,

      genderModel: this.sex,
      editingGender: false
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => get(state, 'account.nickname'),
      email: (state) => get(state, 'account.email'),
      gender: (state) => get(state, 'account.sex'),
      phone: (state) => get(state, 'relation.relation.phone'),
      token: (state) => get(state, 'auth.token'),
      redirectDomain: (state) => get(state, 'app.domain'),
      attachPhones: (state) => get(state, 'phone-attach.phones', []),
      vipEndAt: (state) => {
        return dayjs(get(state, 'vip.end_at', '')).format('YYYY MMM D')
      }
    }),
    ...mapGetters('vip', ['isVip']),
    phones() {
      return this.phone ? [this.phone].concat(this.attachPhones) : []
    }
  },
  methods: {
    leadToDeleteAccount() {
      this.$buefy.dialog.confirm({
        message:
          'By clicking confirm, both your HeyTico account and Mobvoi account will be deleted.',
        onConfirm: () => {
          const params = new URLSearchParams({
            email: this.email,
            token: this.token,
            redirect: `${this.redirectDomain}/`
          })
          window.location = `https://passport.mobvoi.com/pages/secretary-oversea/close-account?${params.toString()}`
        }
      })
    },
    leadToBindNumber() {
      let route = '/account-setting/servicing-number'
      if (!this.phone) {
        route = '/get-started'
      }
      this.$router.push({
        path: route
      })
    },
    onUnbindPhone(phone) {
      this.$router.push({
        name: 'unbind-phone',
        params: {
          phone,
          isPrimaryPhone: phone === this.phone
        }
      })
    },
    async onTriggerEditingName() {
      if (!this.editingName) {
        this.nameModel = this.nickname
        this.editingName = true
        return
      }
      await this.postProfile({
        nickname: this.nameModel
      })
      this.editingName = false
    },
    async onTriggerEditingGender() {
      if (!this.editingGender) {
        this.genderModel = this.gender
        this.editingGender = true
        return
      }
      await this.postProfile({
        gender: Number(this.genderModel)
      })
      this.editingGender = false
    },
    async postProfile(payload) {
      const res = await this.$accountAxios({
        method: 'POST',
        url: `/account/info/token`,
        params: {
          origin: process.env.APP_KEY,
          token: this.token
        },
        data: {
          ...get(this, `$store.state.account`),
          ...payload
        }
      })
      if (get(res, 'err_code') === 0) {
        await this.$store.dispatch('account/FETCH_ACCOUNT')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.acc-settings {
  max-height: 100vh;
  overflow: auto;
  padding: 56px 48px;
  .nav {
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      align-items: center;
      li {
        margin-right: 24px;
        // @TODO hover
        cursor: pointer;
      }
      & :last-child {
        margin-right: 0;
      }
    }
    .primary {
      @include primary-text($font-size: 18px);
    }
    .secondary {
      @include secondary-text($font-size: 18px);
    }
  }
  .panel {
    margin-top: 24px;
    padding: 64px 48px;
    border-radius: 8px;
    background: #fff;
    .seprate {
      margin: 72px 0;
    }
    .block {
      .title {
        @include primary-text;
      }
      .label {
        margin-top: 24px;
        @include secondary-text($font-weight: normal);
      }
      .form {
        margin-top: 16px;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        @include primary-text($font-size: 18px);
        .row {
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          @include primary-text($font-size: 14px);
          .shape {
            font-size: 18px;
          }
          span {
            margin-left: 8px;
          }
        }
        .unbind {
          margin-left: 8px;
        }
      }
      .primary-opt {
        @include text-button;
        @include primary-text($font-size: 14px);
      }
      .secondary-opt {
        margin-left: 8px;
        @include text-button;
        @include secondary-text($font-size: 14px);
      }
      .input-field {
      }
      .submit {
        margin-top: 16px;
      }
      ul {
        list-style: none;
        .note {
          margin-left: 1em;
          @include secondary-text($font-size: 14px, $font-weight: normal);
        }
        li {
          margin-top: 16px;
          @include primary-text($font-size: 14px, $font-weight: normal);
        }
        li:before {
          content: '\2022'; /* Add content: \2022 is the CSS Code/unicode for a bullet */
          color: #02aefc; /* Change the color */
          font-weight: bold; /* If you want it to be bold */
          display: inline-block; /* Needed to add space between the bullet and the text */
          width: 1em; /* Also needed for space (tweak if needed) */
        }
      }
      .note {
        @include secondary-text($font-size: 14px, $font-weight: normal);
      }
      .danger {
        margin-top: 8px;
        // @include primary-text($font-size: 14px);
        // @include text-button;
      }
    }
  }
}

@include mobile {
  .acc-settings {
    padding: 0 16px;
    .nav {
      display: none;
    }
    .panel {
      margin-top: 0;
      padding: 32px 16px;
    }
  }
}
</style>
