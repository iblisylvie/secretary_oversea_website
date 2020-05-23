<template>
  <section class="call-record">
    <header class="call-record-thead">
      <div @click="$router.back()">
        <svg-icon icon-class="go-back" class-name="call-record-thead-go-back" />
      </div>
      <div class="call-record-thead-cells">
        <span
          v-for="column in THEAD_COLUMNS"
          :key="column.label"
          :style="{ width: column.flexGrow }"
          class="call-history-thead-cell"
          >{{ column.label }}</span
        >
      </div>
    </header>
    <section>
      <div class="call-record-card">
        <button
          class="call-record-card-ctrl-btn play"
          :disabled="!fullVoiceAvailable"
          @click="onCtrlFullViocePlay"
        >
          <svg-icon
            :icon-class="computedPlaySvgIconClass"
            class-name="call-record-card-ctrl-btn-shape play"
          />
        </button>
        <div class="call-record-card-fields">
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[0].flexGrow }"
            >{{ detail.call_phone }}</span
          >
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[1].flexGrow }"
            >{{ detail.tags && detail.tags.toString() }}</span
          >
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[2].flexGrow }"
            >{{ detail.called_no }}</span
          >
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[3].flexGrow }"
            >{{ detail.timestamp | parseToDate }}</span
          >
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[4].flexGrow }"
            >{{ detail.timestamp | parseToTime }}</span
          >
        </div>
        <b-progress type="is-info" :value="fullVoiceProgressRate"></b-progress>
      </div>
      <div class="call-record-history">
        <div
          v-for="(msg, index) in bubbleSession"
          :key="index"
          class="call-record-history-wrap"
        >
          <div v-if="msg.user_query" class="call-record-history-session caller">
            <avatar
              class="call-record-history-avatar caller"
              avatar="caller"
              :src="userAvatar"
            />
            <!-- <img
              class="call-record-history-avatar caller"
              :src="userAvatar"
              alt="avatar"
            /> -->
            <div class="call-record-history-bubble caller">
              <!-- <span
                class="call-record-history-bubble-speak"
                @click="onSessionAudioCtrol"
              >
                <svg-icon icon-class="speak" />
              </span>
              <audio :src="msg.user_voice_url" style="display:none"></audio> -->
              {{ msg.user_query }}
            </div>
          </div>
          <div v-if="msg.dm_resp" class="call-record-history-session callee">
            <div class="call-record-history-bubble callee">
              {{ msg.dm_resp }}
            </div>
            <div class="call-record-history-avatar callee">
              <svg-icon icon-class="logo" class-name="shape"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash-es'
import { Howl } from 'howler'
import dayjs from 'dayjs'

export default {
  layout: 'dashboard',
  name: 'CallRecord',
  middleware: ['bind-number-checker'],
  filters: {
    parseToDate(val) {
      return val ? dayjs(Number(val)).format('YYYY MMM DD') : ''
    },
    parseToTime(val) {
      return val ? dayjs(Number(val)).format('HH:mm') : ''
    }
  },
  data() {
    return {
      THEAD_COLUMNS: [
        {
          flexGrow: '13%',
          label: 'Caller'
        },
        {
          flexGrow: '40%',
          label: 'Type'
        },
        {
          flexGrow: '15%',
          label: 'My number'
        },
        {
          flexGrow: '13%',
          label: 'Date'
        },
        {
          flexGrow: '11%',
          label: 'Time'
        }
      ],

      /**
       * See https://github.com/goldfire/howler.j
       */
      fullVoiceHowler: null, // Howler instance
      fullVoiceHowlerId: null, // sound Id return by play()
      playFullVoice: false, // Audio play state
      fullVoiceProgressRate: 0,
      fullVoiceAvailable: false,

      // Detail from Server
      detail: {}
    }
  },
  computed: {
    ...mapState({
      userAvatar: (state) => get(state, 'auth.head_image_url')
    }),
    bubbleSession() {
      return get(this, 'detail.call_detail', [])
    },
    computedPlaySvgIconClass() {
      if (!this.fullVoiceAvailable) {
        return 'play-disabled'
      }
      if (this.playFullVoice) {
        return 'pause'
      } else {
        return 'play'
      }
    },
    callDetail() {
      return get(this, 'detail', {})
    }
  },
  async created() {
    await this.fetchCallDetail()
    this.intializeFullVoiceAudio()
  },
  methods: {
    async fetchCallDetail() {
      const result = await this.$axios({
        method: 'GET',
        url: '/overseas/call-detail',
        params: {
          id: get(this, '$route.params.id')
        }
      })
      this.detail = result || {}
    },
    intializeFullVoiceAudio() {
      const url = this.callDetail.full_voice_url
      let timer = null
      if (!url) {
        return
      }
      const sound = (this.fullVoiceHowler = new Howl({
        src: [url],
        onload: () => {
          this.fullVoiceAvailable = true
        },
        onplay: () => {
          this.playFullVoice = true
          const duration = sound.duration(this.fullVoiceHowlerId)
          timer && clearInterval(timer)
          timer = setInterval(() => {
            const currentTime = sound.seek(this.fullVoiceHowlerId) || 0
            this.fullVoiceProgressRate = parseInt(
              (currentTime / duration) * 100
            )
          }, 1000)
        },
        onpause: () => {
          this.playFullVoice = false
          timer && clearInterval(timer)
        },
        onloaderror: (_, error) => {
          // eslint-disable-next-line
          console.log(error)
        },
        onplayerror: (_, error) => {
          this.$buefy.toast.open({
            message: `Audio play Failed. ${error}`,
            type: 'is-warning'
          })
        },
        onend: () => {
          this.fullVoiceProgressRate = 100
          setTimeout(() => {
            this.fullVoiceProgressRate = 0
            this.playFullVoice = false
          }, 1000)
          timer && clearInterval(timer)
        }
      }))
    },
    onCtrlFullViocePlay() {
      if (this.playFullVoice) {
        this.fullVoiceHowler.pause()
      } else if (this.fullVoiceHowlerId) {
        this.fullVoiceHowler.play(this.fullVoiceHowlerId)
      } else {
        // First play audio no sound Id exist
        this.fullVoiceHowler.play()
      }
    },
    onSessionAudioCtrol($event) {
      const { currentTarget } = $event
      const audio = currentTarget.nextElementSibling
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.call-record {
  padding: 40px 32px 84px 48px;
  height: auto;
  background: $main-panel-background;
  &-thead {
    display: flex;
    align-items: center;
    padding-right: 32px;
    width: 100%;
    color: #484848;
    &-go-back {
      margin-right: 32px;
      font-size: 16px;
      cursor: pointer;
    }
    &-cells {
      flex: 1;
      display: flex;
      font-size: 14px;
      font-weight: bold;
    }
  }
  &-card {
    margin-top: 16px;
    position: relative;
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 52px 32px 52px 48px;
    background: #fff;
    border-radius: 8px;
    &-ctrl-btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border: 9px solid $main-panel-background;
      border-radius: 100%;
      font-size: 64px;
      cursor: pointer;
      outline: none;
      padding: 0;
      @include gradient-background;
      &[disabled] {
        // background: gray;
        cursor: not-allowed;
      }
      &-shape {
        font-size: 18px;
      }
    }
    &-fields {
      margin-bottom: 24px;
      display: flex;
      flex: 1;
    }
    &-field {
      color: #141b24;
      font-size: 14px;
      font-weight: bold;
    }
  }
  &-history {
    margin-top: 24px;
    padding: 40px 32px;
    background: #fff;
    &-wrap {
      display: flex;
      flex-flow: column;
    }
    &-session {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      &.caller {
        align-self: flex-start;
      }
      &.callee {
        align-self: flex-end;
      }
    }
    &-avatar {
      border-radius: 100%;
      &.caller {
        margin-right: 10px;
      }
      &.callee {
        margin-left: 10px;
        display: flex;
        padding: 12px;
        background: #eff5fc;
        & .shape {
          font-size: 24px;
        }
      }
    }
    &.caller &-avatar {
      margin-right: 10px;
    }
    &.callee &-avatar {
      margin-left: 10px;
    }
    &-bubble {
      flex-flow: column;
      padding: 16px;
      border-radius: 25px;
      &-speak {
        margin-right: 10px;
      }
      &.caller {
        border-top-left-radius: 0;
        @include gradient-background;
        @include primary-text(
          $color: #fff,
          $font-size: 14px,
          $font-weight: normal
        );
      }
      &.callee {
        border-top-right-radius: 0;
        background: #eff5fc;
        color: #f3f6f8;
        @include primary-text($font-size: 14px, $font-weight: normal);
      }
    }
  }
}
</style>
