<template>
  <section class="feedback">
    <nav class="nav">
      <ul class="primary">
        <!-- <li @click="$router.back()">
          <svg-icon icon-class="go-back"></svg-icon>
        </li> -->
        <li>Got Any Feedback?</li>
      </ul>
    </nav>
    <main class="panel">
      <p class="explain">
        Got any comments and feedback for us? Tell us what you think and we
        promise to act upon your suggestions to make your HeyTico assistant even
        more awesome. :D
      </p>
      <div class="content">
        <b-input
          v-model="feedbackModel"
          class="editor"
          type="textarea"
          placeholder="write your feedback here"
        ></b-input>
        <t-button class="send" @click="sendFeedback">
          Send
        </t-button>
      </div>
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Feedback',
  layout: 'dashboard',
  data: () => ({
    feedbackModel: ''
  }),
  computed: {
    ...mapState({
      ...mapState('auth', ['nickname', 'email'])
    })
  },
  methods: {
    async sendFeedback() {
      await this.$axios({
        method: 'POST',
        url: '/overseas/feedback',
        data: {
          name: this.nickname,
          email: this.email,
          content: `source: feedback form dashboard
===========================================
${this.feedbackModel}`
        }
      })
      this.feedbackModel = ''
      this.$message.open({
        message: 'Thanks, we will contact you shortly.',
        type: 'is-success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.feedback {
  padding: 56px 48px;
  // @TODO nav component
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
    .explain {
      @include primary-text($font-size: 18px, $font-weight: normal);
    }
    .content {
      margin-top: 32px;
      display: flex;
      flex-flow: column;
      padding: 48px;
      background: #fff;
      border-radius: 16px;
      /deep/ .editor {
        @include reset-buefy-input($background: #f3f6f8);
      }
      .send {
        margin-top: 32px;
        align-self: flex-end;
      }
    }
  }
}
@include mobile {
  .feedback {
    padding: 0 16px;
    .panel {
      .content {
        padding: 16px;
      }
    }
  }
}
</style>
