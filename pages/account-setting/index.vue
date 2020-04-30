<template>
  <section class="acc-settings">
    <header class="acc-settings-navs">
      <nav
        v-for="(nav, index) of navs"
        :key="index"
        class="acc-settings-nav"
        :class="{ active: index === activeNav }"
        @click="activeNav = index"
      >
        {{ nav }}
      </nav>
      <nuxt-link to="/" class="acc-settings-nav">Support </nuxt-link>
    </header>
    <section class="acc-settings-card">
      <!-- Profile  -->
      <template v-if="activeNav === 0">
        <div class="acc-settings-row">
          <img src="" class="acc-settings-row-avatar" alt="avatar" />
          <button class="acc-settings-btn">Upload</button>
          <input type="file" style="display: none;" />
        </div>
        <div class="acc-settings-row">
          <div class="acc-settings-row-prop">
            <span class="acc-settings-row-label">
              Name
            </span>
            <span v-show="!editingName" class="acc-settings-row-value">
              Regina Jones
            </span>
            <b-input
              v-show="editingName"
              :value="nameModel"
              class="acc-settings-row-edit"
            ></b-input>
          </div>
          <button class="acc-settings-btn" @click="editingName = !editingName">
            {{ editingName ? 'Done' : 'Edit' }}
          </button>
        </div>
        <div class="acc-settings-row">
          <div class="acc-settings-row-prop">
            <span class="acc-settings-row-label">
              Email
            </span>
            <span v-show="!editingEmail" class="acc-settings-row-value">
              elijah.grant@example.com
            </span>
            <b-input
              v-show="editingEmail"
              :value="emailModel"
              class="acc-settings-row-edit"
            ></b-input>
          </div>
          <button
            class="acc-settings-btn"
            @click="editingEmail = !editingEmail"
          >
            {{ editingEmail ? 'Done' : 'Change' }}
          </button>
        </div>
        <div class="acc-settings-row">
          <div class="acc-settings-row-prop">
            <span class="acc-settings-row-label">
              Email Preference
            </span>
          </div>
        </div>
        <div class="acc-settings-row">
          <div class="acc-settings-row-prop">
            <b-checkbox
              :value="emailPreferenceModel"
              type="is-info"
              class="acc-settings-row-checkbox"
            >
              Receive an email of call summary after each call
            </b-checkbox>
          </div>
        </div>
        <div class="acc-settings-row">
          <div class="acc-settings-row-prop">
            <button class="acc-settings-btn">DELETE ACCOUNT</button>
          </div>
          <b-button class="acc-settings-update" rounded>Update</b-button>
        </div>
      </template>
      <!-- Subscription  -->
      <template v-if="activeNav === 1">
        <p class="acc-settings-subs-row plan">Free Plan</p>
        <div class="acc-settings-subs-row">
          <button class="acc-settings-btn">Downgrade</button>
        </div>
        <p class="acc-settings-subs-row period">2019/12 - 2020/12</p>
        <p class="acc-settings-subs-row desc">
          Quis nisl libero orci massa egestas in. Feugiat nibh varius nisl,
          blandit sit nec pretium, aliquam. Donec in dui lectus nibh enim
          pretium, volutpat at. Tristique vel, nam massa, habitant. Erat nulla
          vel rhoncus rhoncus dui risus sollicitudin cursus volutpat. Felis
          mattis fermentum sit morbi sit hendrerit fringilla viverra. Pretium
          egestas amet nulla lobortis eget vitae lorem. Sollicitudin placerat
          odio urna ipsum ipsum maecenas. Dolor ligula consectetur consequat
          quis etiam.
        </p>
      </template>
      <!-- Servicing Number  -->
      <template v-if="activeNav === 2">
        <p class="acc-settings-svc-num">
          (907) 555-0101
        </p>
        <p class="acc-settings-svc-num">
          (907) 555-0101
        </p>
      </template>
      <!-- Got any feedback ? -->
      <template v-if="activeNav === 3">
        <b-input
          :value="emailModel"
          class="acc-settings-got-feedback"
          type="textarea"
          placeholder="write your feedback here"
        ></b-input>
        <b-button class="acc-settings-update" rounded @click="sendFeedback"
          >Send</b-button
        >
      </template>
      <!-- Support  -->
      <!-- <template> </template> -->
    </section>
  </section>
</template>

<script>
export default {
  name: 'AccountSettings',
  layout: 'dashboard',
  data: () => ({
    navs: ['Profile', 'Subscription', 'Servicing Number', 'Got Any Feedback?'],
    activeNav: 0,

    emailPreferenceModel: true,
    editingName: false,
    editingEmail: false,
    feedbackModel: '',
    nameModel: '',
    emailModel: ''
  }),
  methods: {
    async sendFeedback() {
      await this.$axios({
        method: 'POST',
        url: '/overseas/feedback',
        data: {
          id: `source: feedback form
${this.feedbackModel}`
        }
      })
      this.feedbackModel = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.acc-settings {
  padding: 60px 48px 0;
  &-navs {
    display: flex;
    justify-content: flex-start;
  }
  &-nav {
    margin-right: 48px;
    color: #59687a;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 8px;
    cursor: pointer;
    &.active {
      border-bottom: 4px solid #141b24;
      color: #141b24;
      font-weight: bold;
    }
  }
  &-card {
    margin-top: 32px;
    padding: 48px;
    border-radius: 16px;
    background: #fff;
  }
  &-row {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    &-avatar {
      width: 64px;
      height: 64px;
      border-radius: 100%;
    }
    &-prop {
      display: flex;
    }
    &-label {
      margin-right: 40px;
      color: #59687a;
      font-size: 18px;
      font-weight: 600;
    }
    &-value {
      color: #141b24;
      font-size: 18px;
      font-weight: bold;
    }
    &-checkbox {
      color: #141b24;
      font-size: 18px;
      font-weight: bold;
    }
    &-edit {
      height: 27px;
    }
  }
  &-btn {
    padding: 0;
    margin: 0;
    border: none;
    background: inherit;
    color: #59687a;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    &.secondary {
      font-size: 14px;
    }
  }
  &-update {
    background: #02aefc;
    color: #fff;
  }
  &-subs {
    &-row {
      margin-bottom: 16px;
      &.plan {
        color: #141b24;
        font-size: 24px;
        font-weight: bold;
      }
      &.period {
        color: #141b24;
        font-size: 18px;
        font-weight: bold;
      }
      &.desc {
        color: #59687a;
        font-size: 18px;
      }
    }
  }
  &-svc-num {
    margin-bottom: 32px;
    color: #141b24;
    font-size: 18px;
    font-weight: bold;
  }
  &-got-feedback {
    margin-bottom: 24px;
    background: #f3f6f8;
  }
}
</style>
