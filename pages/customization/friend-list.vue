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
            @click="
              $router.push({
                name: 'get-started',
                params: { refer: 'Account-setting' }
              })
            "
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
          <div class="right">
            <svg-icon icon-class="dot-more" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from 'lodash-es'

export default {
  name: 'FriendList',
  layout: 'dashboard',
  data() {
    return {
      friends: []
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
    justify-content: space-between;
    .contact-box {
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
  }
}
</style>
