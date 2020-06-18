<template>
  <section class="friend-list">
    <nav class="nav">
      <ul class="primary">
        <li @click="$router.back()">
          <svg-icon icon-class="go-back"></svg-icon>
        </li>
        <li>Friends</li>
        <li>
          <t-button
            style="padding:6px 8px; font-size: 14px;"
            @click="isComponentModalActive = true"
          >
            <svg-icon icon-class="add"></svg-icon>
          </t-button>
        </li>
      </ul>
    </nav>
    <div class="contact-wrap">
      <div v-for="(contact, index) of friends" :key="index" class="contact-box">
        <div class="contact">
          <div class="left">
            <svg-icon icon-class="contact-avatar" class-name="avatar" />
            <span>{{ contact.name }}</span>
          </div>
          <b-collapse
            :open.sync="contact.collapse || false"
            aria-id="contactMenu"
            style="position: relative"
          >
            <div slot="trigger" class="right">
              <svg-icon icon-class="dot-more" />
            </div>
            <ul
              style="position: absolute; right: 0; background: #ECF1F4; border-radius: 8px; color: #222; padding: 16px;"
            >
              <li>
                <t-button
                  type="text"
                  @click="
                    () => {
                      contact.collapse = false
                      isComponentModalActive = true
                      id = contact.id
                      name = contact.name
                      number1 = formatPhone(contact.phone1.slice(1))
                      number2 = formatPhone(contact.phone2.slice(1))
                    }
                  "
                  >Edit</t-button
                >
              </li>
              <li>
                <t-button type="text" @click="() => onDeleteContact(contact.id)"
                  >Delete</t-button
                >
              </li>
            </ul>
          </b-collapse>
        </div>
        <div class="recent-call">{{ `Recent Call: ${recent_call || ''}` }}</div>
      </div>
    </div>

    <!-- modal  -->
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
      @close="resetModal"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Friend</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Name">
            <b-input v-model="name" type="text" placeholder="Name" required>
            </b-input>
          </b-field>

          <b-field label="Number1">
            <b-input
              v-model="number1"
              placeholder="Number 1"
              required
              @input="(value) => onPhoneInput(value, 'number1')"
            >
            </b-input>
          </b-field>
          <b-field label="Number2">
            <b-input
              v-model="number2"
              placeholder="Number 2 (optional)"
              @input="(value) => onPhoneInput(value, 'number2')"
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="resetModal">
            Cancel
          </button>
          <button class="button is-primary" @click="onSaveContact">Save</button>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { get } from 'lodash-es'

export default {
  name: 'FriendList',
  layout: 'dashboard',
  middleware: ['bind-number-checker'],
  data() {
    return {
      friends: [],

      isComponentModalActive: false,
      name: '',
      number1: '',
      number2: '',
      id: null
    }
  },
  created() {
    this.fetchFriends()
    // this.fetchOpeningRemark()
  },
  methods: {
    async fetchFriends() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/contact'
      })
      this.friends = get(result, 'contact_infos', [])
    },
    onPhoneInput(phone, dataAttr) {
      phone = phone || ''
      this.$nextTick(() => {
        this.$set(this, dataAttr, this.formatPhone(phone))
      })
    },
    async onSaveContact() {
      const contact = {
        name: this.name,
        phone1: `+1${this.number1.replace(/\D/g, '')}`,
        phone2: `+1${this.number2.replace(/\D/g, '')}`
      }
      if (this.id) {
        contact.id = this.id
      }
      const result = await this.$axios({
        method: 'POST',
        url: '/overseas/contact',
        data: {
          contact_info: contact
        }
      })
      if (result.err_code === 0) {
        this.resetModal()
        this.fetchFriends()
      }
    },
    async onDeleteContact(id) {
      if (!id) {
        return
      }
      const result = await this.$axios({
        method: 'DELETE',
        url: '/overseas/contact',
        params: {
          id
        }
      })
      if (result.err_code === 0) {
        this.$message.open({
          message: 'Delete contact success',
          type: 'is-success'
        })
        this.fetchFriends()
      }
    },
    resetModal() {
      this.isComponentModalActive = false
      this.name = ''
      this.number1 = ''
      this.number2 = ''
      this.id = null
    },
    formatPhone(phone) {
      return phone
        .substring(0, 12)
        .replace(/\D/g, '')
        .replace(/(\d)(?=((?:\d{4})|(?:\d{7}))$)/g, '$1-')
    }
    // async fetchReplies() {
    //   const result = await this.$axios({
    //     method: 'GET',
    //     url: '/overseas/tts/menu'
    //   })
    //   this.replies = get(result, 'reply_tts', [])
    // },
    // async fetchRefusalReplies() {
    //   const result = await this.$axios({
    //     method: 'GET',
    //     url: '/overseas/reject-scene/menu'
    //   })
    //   this.refusalReplies = get(result, 'reject_item', [])
    // },
    // async putCustomSettings(payload) {
    //   await this.$axios({
    //     method: 'PUT',
    //     url: '/overseas/tts/settings',
    //     data: payload
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.friend-list {
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
  .contact-wrap {
    margin-top: 24px;
    display: flex;
    flex-flow: wrap;
    // justify-content: space-between;
    .contact-box {
      margin: 0 16px 16px 0;
      width: 22%;
      padding: 16px 24px;
      background: #fff;
      border-radius: 8px;
    }
    .contact {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          font-size: 24px;
        }
        span {
          margin-left: 18px;
          @include primary-text($font-size: 18px);
        }
      }
      .right {
        display: flex;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .recent-call {
      margin-top: 8px;
      @include secondary-text($font-size: 12px);
    }
  }
}
</style>
