<template>
  <section class="custom">
    <h3 class="primary-heading">Choose your voice</h3>
    <template v-if="firstFetchingVoices"
      ><b-skeleton width="20%" :animated="true"></b-skeleton>
      <b-skeleton width="100%" :animated="true"></b-skeleton>
      <b-skeleton width="100%" :animated="true"></b-skeleton
    ></template>

    <div v-for="typeVoice of voicesForOverseas" :key="typeVoice.type">
      <!-- <div class="sub-heading">{{ typeVoice.newTag }}</div> -->
      <div class="voice-wrap">
        <div
          v-for="voice of typeVoice.data"
          :key="voice.speaker_no"
          :class="['voice-box', { active: voice.checked }]"
          @click="onChooseVoice(voice)"
        >
          <span>{{ voice.speaker_name }}</span>
          <div class="voice" @click.stop="onClickVoice(voice.voice_url)">
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
          >Hi, you've reached
          {{ editingOpeningForFriends ? '' : openingForFriendsUserNick
          }}<b-input
            v-show="editingOpeningForFriends"
            v-model="openingForFriendsUserNick"
            class="underline-input"
          />'s
          {{ editingOpeningForFriends ? '' : openingForFriendsAiNick }}
          <b-input
            v-show="editingOpeningForFriends"
            v-model="openingForFriendsAiNick"
            class="underline-input"
          />
          This call will be recorded, please tell me the purpose of the call.
        </span>

        <div
          class="voice"
          @click="
            onClickVoice(
              textToSpeech({
                speaker: ChoosedVoiceSpeaker,
                text: `Hi, you've reached ${openingForFriendsUserNick}'s ${openingForFriendsAiNick}, This call will be recorded, please tell me the purpose of the call.`
              })
            )
          "
        >
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
              openingForFriendsUserNick = openingForFriendsUserNickPrev
              openingForFriendsAiNick = openingForFriendsAiNickPrev
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
          >Hi, you've reached
          {{ editingOpeningForStrangers ? '' : openingForStrangersUserNick
          }}<b-input
            v-show="editingOpeningForStrangers"
            v-model="openingForStrangersUserNick"
            class="underline-input"
          />'s
          {{ editingOpeningForStrangers ? '' : openingForStrangersAiNick }}
          <b-input
            v-show="editingOpeningForStrangers"
            v-model="openingForStrangersAiNick"
            class="underline-input"
          />. This call will be recorded, please tell me the purpose of the
          call.
        </span>
        <div
          class="voice"
          @click.stop="
            onClickVoice(
              textToSpeech({
                speaker: ChoosedVoiceSpeaker,
                text: `Hi, you've reached ${openingForStrangersUserNick}'s ${openingForStrangersAiNick}, This call will be recorded, please tell me the purpose of the call.`
              })
            )
          "
        >
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
              openingForStrangersUserNick = openingForStrangersUserNickPrev
              openingForStrangersAiNick = openingForStrangersAiNickPrev
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
        <span :style="{ width: '100%' }"
          >{{ editingTakeOut ? '' : takeOutReplyModel
          }}<b-input
            v-show="editingTakeOut"
            v-model="takeOutReplyModel"
            class="underline-input"
            :style="{ width: '100%' }"
        /></span>
        <div
          class="voice"
          @click="
            onClickVoice(
              textToSpeech({
                speaker: ChoosedVoiceSpeaker,
                text: takeOutReplyModel
              })
            )
          "
        >
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
              takeOutReplyModel = takeOutReplyModelPrev
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
        <span :style="{ width: '100%' }"
          >{{ editingDelivery ? '' : deliveryRepleyModel
          }}<b-input
            v-show="editingDelivery"
            v-model="deliveryRepleyModel"
            class="underline-input"
            :style="{ width: '100%' }"
        /></span>
        <div
          class="voice"
          @click="
            onClickVoice(
              textToSpeech({
                speaker: ChoosedVoiceSpeaker,
                text: deliveryRepleyModel
              })
            )
          "
        >
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
              deliveryRepleyModel = deliveryRepleyModelPrev
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
          @input="onRefuseOneReply(refusalReply)"
        />
      </div>
    </div>
  </section>
  <!-- <div
    style="    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;"
  >
    Comming soon
  </div> -->
</template>

<script>
import { Howl } from 'howler'
import { get, pick } from 'lodash-es'

export default {
  name: 'Customization',
  layout: 'dashboard',
  middleware: ['bind-number-checker'],
  data() {
    return {
      firstFetchingVoices: true,
      voices: [],
      replies: [],
      refusalReplies: [],

      openingForFriendsUserNickPrev: '',
      openingForFriendsAiNickPrev: '',
      openingForStrangersUserNickPrev: '',
      openingForStrangersAiNickPrev: '',
      openingForFriendsUserNick: '',
      openingForFriendsAiNick: '',
      openingForStrangersUserNick: '',
      openingForStrangersAiNick: '',

      editingOpeningForFriends: false,
      editingOpeningForStrangers: false,
      editingTakeOut: false,
      editingDelivery: false,

      takeOutReplyModelPrev: '',
      deliveryRepleyModelPrev: '',
      takeOutReplyModel: '',
      deliveryRepleyModel: '',

      ChoosedVoiceSpeaker: 'en-US-ZiraRUS',
      // ttsText transform under basic voice
      // ttsText: '',

      // - voiceUrl: { howler}
      mapVoiceUrlToHowler: {}
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
    refuseAllModel: {
      get() {
        return get(this, 'refusalReplies', []).every(
          (refusalReply) => refusalReply.checked
        )
      },
      set(val) {
        this.onRefuseAll(val)
      }
    }
  },
  created() {
    ;(async () => {
      this.firstFetchingVoices = true
      await this.fetchVoices()
      this.firstFetchingVoices = false
    })()
    this.fetchReplies()
    this.fetchRefusalReplies()
    this.fetchNickNames()
    // this.fetchSecretaryNicks()
    // this.fetchOwnerNicks()
  },
  beforeDestroy() {
    Object.keys(get(this, 'mapVoiceUrlToHowler', {})).forEach((other) => {
      const howler = get(this.mapVoiceUrlToHowler, [other, 'howler'])
      howler && howler.unload()
    })
  },
  methods: {
    onClickVoice(voiceUrl) {
      let howler = get(this.mapVoiceUrlToHowler, [voiceUrl, 'howler'])
      if (!howler) {
        howler = new Howl({
          src: [voiceUrl],
          html5: true, // Cause using webaudio will happen CORS error
          format: ['mp3'],
          onloaderror(_, err) {
            // console.log(err)
          }
        })
        this.$set(this.mapVoiceUrlToHowler, voiceUrl, {
          howler
        })
      }

      // pause others
      const others = Object.keys(get(this, 'mapVoiceUrlToHowler', {})).filter(
        (key) => key !== voiceUrl
      )
      others.forEach((other) => {
        const otherHowler = get(this.mapVoiceUrlToHowler, [other, 'howler'])

        if (otherHowler && otherHowler.playing()) {
          otherHowler.stop()
        }
      })

      if (howler.playing()) {
        howler.stop()
        howler.play()
      } else {
        howler.play()
      }
    },
    textToSpeech({ speaker = 'en-US-ZiraRUS', text = 'Nice to meet you.' }) {
      return `/tts?speaker=${encodeURIComponent(
        speaker
      )}&text=${encodeURIComponent(text)}`
    },
    async onChooseVoice(voice) {
      this.onClickVoice(voice.voice_url)
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
        this.openingForFriendsUserNickPrev = this.openingForFriendsUserNick
        this.openingForFriendsAiNickPrev = this.openingForFriendsAiNick
        this.editingOpeningForFriends = true
        return
      }
      await this.putCustomSettings({
        nicknames: {
          unick_for_contact: this.openingForFriendsUserNick,
          wnick_for_contact: this.openingForFriendsAiNick,
          unick_default: this.openingForStrangersUserNick,
          wnick_default: this.openingForStrangersAiNick
        }
      })
      this.editingOpeningForFriends = false
    },
    async onTriggerEditingOpeningForStrangers() {
      if (!this.editingOpeningForStrangers) {
        this.openingForStrangersUserNickPrev = this.openingForStrangersUserNick
        this.openingForStrangersAiNickPrev = this.openingForStrangersAiNick
        this.editingOpeningForStrangers = true
        return
      }
      await this.putCustomSettings({
        nicknames: {
          unick_default: this.openingForStrangersUserNick,
          wnick_default: this.openingForStrangersAiNick,
          unick_for_contact: this.openingForFriendsUserNick,
          wnick_for_contact: this.openingForFriendsAiNick
        }
      })
      this.editingOpeningForStrangers = false
    },
    async onTriggerEditingTakeOut() {
      if (!this.editingTakeOut) {
        this.editingTakeOut = true
        this.takeOutReplyModelPrev = this.takeOutReplyModel
        return
      }
      await this.putCustomSettings({
        user_defined_ts: {
          domain: 'secretary.take_out#take',
          tts: this.takeOutReplyModel
        }
      })
      await this.putCustomSettings({
        tts_data: {
          domain: 'secretary.take_out#take',
          item_no: 0
        }
      })
      this.editingTakeOut = false
    },
    async onTriggerEditingDelivery() {
      if (!this.editingDelivery) {
        this.editingDelivery = true
        this.deliveryRepleyModelPrev = this.deliveryRepleyModel
        return
      }
      await this.putCustomSettings({
        user_defined_ts: {
          domain: 'secretary.express#arrived',
          tts: this.deliveryRepleyModel
        }
      })
      await this.putCustomSettings({
        tts_data: {
          domain: 'secretary.express#arrived',
          item_no: 0
        }
      })
      this.editingDelivery = false
    },
    async onRefuseAll(checked) {
      let refusalReplies = []
      if (checked) {
        refusalReplies = (this.refusalReplies || []).map(
          (reply) => reply.intent
        )
      }
      await this.putCustomSettings({
        reject_scene: {
          checked_scene: refusalReplies
        }
      })
      await this.fetchRefusalReplies()
    },
    async onRefuseOneReply(refusalReply) {
      let refusalReplies = (this.refusalReplies || []).map(
        (replay) => replay.intent
      )
      if (!refusalReply.checked) {
        refusalReplies = refusalReplies.filter(
          (intent) => intent !== refusalReply.intent
        )
      }
      await this.putCustomSettings({
        reject_scene: {
          checked_scene: refusalReplies
        }
      })
      await this.fetchRefusalReplies()
    },
    async fetchVoices() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/speaker/group/menu'
      })
      this.voices = get(result, 'speaker_group', [])
      this.voices.find((category) => {
        ;(category.data || []).find((voice) => {
          if (voice.checked) {
            this.ChoosedVoiceSpeaker = voice.speaker
          }
        })
      })
    },
    async fetchReplies() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/tts/menu'
      })
      this.replies = get(result, 'reply_tts', [])
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
    },
    async fetchNickNames() {
      await this.$store.dispatch('relation/FETCH_RELATION')
      const nickNames = get(
        this,
        '$store.state.relation.relation.nicknames',
        {}
      )
      this.openingForFriendsAiNick = get(nickNames, 'wnick_for_contact', '')
      this.openingForFriendsUserNick = get(nickNames, 'unick_for_contact', '')
      this.openingForStrangersUserNick = get(nickNames, 'unick_default', '')
      this.openingForStrangersAiNick = get(nickNames, 'wnick_default', '')
    }
    // async fetchSecretaryNicks() {
    //   const result = await this.$axios({
    //     method: 'GET',
    //     url: '/overseas/secretary/nick'
    //   })
    //   this.openingForFriendsAiNick = get(result, 'secretary_nicks', '')
    // },
    // async fetchOwnerNicks() {
    //   const result = await this.$axios({
    //     method: 'GET',
    //     url: '/overseas/owner/nick'
    //   })
    //   this.openingForFriendsUserNick = get(result, 'owner_nicks', '')
    // }
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
    flex-wrap: wrap;
    &.opt {
      flex-flow: column;
    }
    .voice-box {
      margin: 0 16px 16px 0;
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
      // span {
      //   display: flex;
      //   align-items: center;
      //   flex-wrap: wrap;
      // }
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
      // width: 26%;
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
  .underline-input {
    /deep/ input {
      border: none;
      outline: none;
      box-shadow: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
    }
  }
}

@include mobile {
  .custom {
    padding: 0 16px;
    .refusal-wrap {
      .refusal-box {
        width: auto;
      }
    }
  }
}
</style>
