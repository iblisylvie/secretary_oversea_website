<template>
  <!-- <section class="custom">
    <h3 class="primary-heading">Choose your voice</h3>
    <div v-for="typeVoice of voicesForOverseas" :key="typeVoice.type">
      <div class="sub-heading">{{ typeVoice.newTag }}</div>
      <div class="voice-wrap">
        <div
          v-for="voice of typeVoice.data"
          :key="voice.speaker_no"
          :class="['voice-box', { active: voice.checked }]"
          @click="onChooseVoice(voice)"
        >
          <span>{{ voice.speaker_name }}</span>
          <div class="voice" @click="onClickVoice(voice.voice_url)">
            <svg-icon icon-class="speak-grey"></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <hr class="seprate" />
    <h3 class="primary-heading">Set you opening remark</h3>
    <div class="sub-heading">
      Opening for Friends
      <nuxt-link to="/customization/friend-list" class="link"
        >Update Friend List</nuxt-link
      >
    </div>
    <div class="voice-wrap opt">
      <div class="voice-box">
        <span
          >Hi, this is {{ openingForFriendsUserNick
          }}<b-input
            v-show="editingOpeningForFriends"
            v-model="openingForFriendsUserNick"
          />’s AI
          {{ openingForFriendsAiNick }}
          <b-input
            v-show="editingOpeningForFriends"
            v-model="openingForFriendsAiNick"
          />, what can I help you?</span
        >

        <div class="voice">
          <svg-icon icon-class="speak-grey"></svg-icon>
        </div>
      </div>
      <div class="group">
        <button class="primary-opt" @click="onTriggerEditingOpeningForFriends">
          {{ editingOpeningForFriends ? 'Save' : 'Edit' }}
        </button>
        <button
          v-show="editingOpeningForFriends"
          class="secondary-opt"
          @click="
            () => {
              openingForFriendsUserNick = ''
              openingForFriendsAiNick = ''
              editingOpeningForFriends = false
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="sub-heading">
      Opening for Strangers
    </div>
    <div class="voice-wrap opt">
      <div class="voice-box">
        <span
          >Hi, this is {{ openingForStrangersUserNick
          }}<b-input
            v-show="editingOpeningForStrangers"
            v-model="openingForStrangersUserNick"
          />’s AI
          {{ openingForStrangersAiNick }}
          <b-input
            v-show="editingOpeningForStrangers"
            v-model="openingForStrangersAiNick"
          />, what can I help you?</span
        >
        <div class="voice">
          <svg-icon icon-class="speak-grey"></svg-icon>
        </div>
      </div>
      <div class="group">
        <button
          class="primary-opt"
          @click="onTriggerEditingOpeningForStrangers"
        >
          {{ editingOpeningForStrangers ? 'Save' : 'Edit' }}
        </button>
        <button
          v-show="editingOpeningForStrangers"
          class="secondary-opt"
          @click="
            () => {
              openingForStrangersUserNick = ''
              openingForStrangersAiNick = ''
              editingOpeningForStrangers = false
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>

    <hr class="seprate" />
    <h3 class="primary-heading">Set your replies</h3>
    <div class="sub-heading">TakeOut</div>
    <div class="voice-wrap opt">
      <div class="voice-box">
        <span
          >{{ takeOutReplyModel
          }}<b-input v-show="editingTakeOut" v-model="takeOutReplyModel"
        /></span>
        <div class="voice">
          <svg-icon icon-class="speak-grey"></svg-icon>
        </div>
      </div>
      <div class="group">
        <button class="primary-opt" @click="onTriggerEditingTakeOut">
          {{ editingTakeOut ? 'Save' : 'Edit' }}
        </button>
        <button
          v-show="editingTakeOut"
          class="secondary-opt"
          @click="
            () => {
              takeOutReplyModel = ''
              editingTakeOut = false
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="sub-heading">Delivery</div>
    <div class="voice-wrap opt">
      <div class="voice-box">
        <span
          >{{ deliveryRepleyModel
          }}<b-input v-show="editingDelivery" v-model="deliveryRepleyModel"
        /></span>
        <div class="voice">
          <svg-icon icon-class="speak-grey"></svg-icon>
        </div>
      </div>
      <div class="group">
        <button class="primary-opt" @click="onTriggerEditingDelivery">
          {{ editingDelivery ? 'Save' : 'Edit' }}
        </button>
        <button
          v-show="editingDelivery"
          class="secondary-opt"
          @click="
            () => {
              deliveryRepleyModel = ''
              editingDelivery = false
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>
    <hr class="seprate" />
    <h3 class="primary-heading">
      Set your refusal replies
      <span class="link"
        >Refuse All
        <b-switch v-model="refuseAllModel" class="b-switch" type="is-info"
      /></span>
    </h3>
    <div class="refusal-wrap">
      <div
        v-for="(refusalReply, index) of refusalReplies"
        :key="index"
        class="refusal-box"
      >
        <div class="desc">
          {{ refusalReply.name }}
        </div>
        <b-switch
          v-model="refusalReply.checked"
          type="is-info"
          @input="onRefuseOneReply(refusalReply.intent)"
        />
      </div>
    </div>
  </section> -->
  <div
    style="    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;"
  >
    Comming soon
  </div>
</template>

<script>
import { get, pick } from 'lodash-es'
export default {
  name: 'Customization',
  layout: 'dashboard',
  middleware: ['bind-number-checker'],
  data() {
    return {
      voices: [],
      replies: [],
      refusalReplies: [],

      openingForFriendsUserNick: '',
      openingForFriendsAiNick: '',
      openingForStrangersUserNick: '',
      openingForStrangersAiNick: '',

      editingOpeningForFriends: false,
      editingOpeningForStrangers: false,
      editingTakeOut: false,
      editingDelivery: false,

      takeOutReplyModel: '',
      deliveryRepleyModel: '',

      ttsSpeaker: 'en-US-ZiraRUS',
      // ttsText transform under basic voice
      ttsText: 'Nice to meet you.'
    }
  },
  computed: {
    voicesForOverseas() {
      const pairs = {
        DEFAULT: 'Basic Voices',
        PREMIUM: 'Premium Voices'
      }
      return this.voices.filter((voiceType) => {
        if (pairs[voiceType.type]) {
          voiceType.newTag = pairs[voiceType.type]
          return true
        }
      })
    },
    repliesForOverseas() {
      const pairs = {
        'secretary.take_out#take': 'takeOutReplyModel',
        'secretary.express#arrived': 'deliveryRepleyModel'
      }
      return this.replies.map((reply) => {
        if (pairs[reply.domain]) {
          const tts = get(reply, 'tts_item', []).find(
            (tts) => tts.item_no === 0
          )
          this[pairs[reply.domain]] = get(tts, 'content', '')
        }
      })
    },
    refuseAllModel: {
      get() {
        return get(this, 'refusalReplies', []).every(
          (refusalReply) => refusalReply.checked
        )
      },
      set(val) {
        if (val) {
          this.onRefuseAll()
        }
      }
    }
  },
  created() {
    this.fetchVoices()
    this.fetchReplies()
    this.fetchRefusalReplies()
    // this.fetchOpeningRemark()
  },

  methods: {
    onClickVoice(audioUrl) {
      // console.log(audioUrl)
    },
    textToSpeech({ speaker = 'en-US-ZiraRUS', text = 'Nice to meet you.' }) {
      return `http://106.75.64.52:8868?${encodeURIComponent(
        speaker
      )}&${encodeURIComponent(text)}`
    },
    async onChooseVoice(voice) {
      await this.putCustomSettings({
        speaker_data: {
          ...pick(voice, ['type', 'speaker']),
          speed: get(voice, 'speaker_speed')
        }
      })
      await this.fetchVoices()
    },
    async onTriggerEditingOpeningForFriends() {
      if (!this.editingOpeningForFriends) {
        this.editingOpeningForFriends = true
        return
      }
      await this.putCustomSettings({
        nicknames: {
          unick_for_contact: this.openingForFriendsUserNick,
          wnick_for_contact: this.openingForFriendsAiNick
        }
      })
    },
    async onTriggerEditingOpeningForStrangers() {
      if (!this.editingOpeningForStrangers) {
        this.editingOpeningForStrangers = true
        return
      }
      await this.putCustomSettings({
        nicknames: {
          unick_default: this.openingForStrangersUserNick,
          wnick_default: this.openingForStrangersAiNick
        }
      })
    },
    async onTriggerEditingTakeOut() {
      if (!this.editingTakeOut) {
        this.editingTakeOut = true
        return
      }
      await this.putCustomSettings({
        user_defined_ts: {
          domain: 'secretary.take_out#take',
          tts: this.takeOutReplyModel
        }
      })
    },
    async onTriggerEditingDelivery() {
      if (!this.editingDelivery) {
        this.editingDelivery = true
        return
      }
      await this.putCustomSettings({
        user_defined_ts: {
          domain: 'secretary.express#arrived',
          tts: this.deliveryRepleyModel
        }
      })
    },
    async onRefuseAll() {
      await this.putCustomSettings({
        reject_scene: get(this, 'refusalReplies', []).map(
          (refusalReply) => refusalReply.intent
        )
      })
      await this.fetchRefusalReplies()
    },
    async onRefuseOneReply(intent) {
      await this.putCustomSettings({
        reject_scene: [intent]
      })
    },
    async fetchVoices() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/speaker/group/menu'
      })
      this.voices = get(result, 'speaker_group', [])
    },
    async fetchReplies() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/tts/menu'
      })
      this.replies = get(result, 'reply_tts', [])
    },
    async fetchRefusalReplies() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/reject-scene/menu'
      })
      this.refusalReplies = get(result, 'reject_item', [])
    },
    async putCustomSettings(payload) {
      await this.$axios({
        method: 'PUT',
        url: '/overseas/tts/settings',
        data: payload
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.custom {
  padding: 56px;
  .primary-heading {
    margin-bottom: 32px;
    @include primary-text;
  }
  .sub-heading {
    margin-bottom: 24px;
    @include secondary-text;
  }
  .voice-wrap {
    margin-bottom: 32px;
    display: flex;
    &.opt {
      flex-flow: column;
    }
    .voice-box {
      margin-right: 16px;
      padding: 5px 5px 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 8px;
      background: #fff;
      cursor: pointer;
      @include primary-text($font-size: 18px);
      &.active {
        @include gradient-border;
        span {
          @include gradient-text;
        }
      }
      & :last-child {
        margin-right: 0px;
      }
      span {
        display: flex;
        align-items: center;
      }
      .voice {
        margin-left: 50px;
        display: flex;
        padding: 14px;
        background: #ecf1f4;
        border-radius: 6px;
        font-size: 14px;
      }
    }
  }

  .seprate {
    margin: 32px 0;
    border: 1px solid #141b24;
    opacity: 0.2;
  }
  .link {
    margin-left: 16px;
    color: #02aefc;
    font-size: 14px;
    font-weight: bold;
    .b-switch {
      margin-right: 16px;
    }
  }
  .group {
    .primary-opt {
      margin-top: 8px;
      @include text-button;
      @include primary-text($font-size: 14px);
    }
    .secondary-opt {
      margin-left: 8px;
      @include text-button;
      @include secondary-text($font-size: 14px);
    }
  }
  .refusal-wrap {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    .refusal-box {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 26%;
      padding: 24px;
      border-radius: 6px;
      background: #fff;
      .desc {
        padding: 4px 16px;
        border-radius: 20px;
        color: #ff9a1e;
        background: rgba(255, 154, 30, 0.1);
      }
    }
  }
}
</style>
