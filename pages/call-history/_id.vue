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
        <div class="privacy">
          <svg-icon icon-class="protect" class-name="shape" />
          Your privacy is protected.
        </div>
        <button
          class="call-record-card-ctrl-btn play hidde-in-mobile"
          :disabled="!fullVoiceAvailable"
          @click="onCtrlFullViocePlay"
        >
          <svg-icon
            :icon-class="computedPlaySvgIconClass"
            class-name="call-record-card-ctrl-btn-shape play"
          />
        </button>

        <!-- mobile -->
        <div class="call-card-cell">
          <div style="display: flex; align-items: center;">
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
            <span
              :style="{ width: THEAD_COLUMNS[1].flexGrow, marginLeft: '6px' }"
            >
              <div
                v-for="tag of detail.user_defined_tags"
                :key="tag"
                :style="{
                  color: tagsColorPattern[tag] && tagsColorPattern[tag].color,
                  backgroundColor:
                    tagsColorPattern[tag] && tagsColorPattern[tag].bgColor
                }"
                class="tag"
              >
                {{ tag }}
              </div>
            </span>
          </div>
          <a style="font-size:27px" :href="`tel:${detail.call_phone}`">
            <svg-icon icon-class="call-back" class-name="" />
          </a>
        </div>

        <div class="call-record-card-fields">
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[0].flexGrow }"
            >{{
              `${
                detail.call_phone === '+1'
                  ? 'Unavailable '
                  : detail.call_phone || ''
              }
              ${detail.location || ''}`
            }}</span
          >
          <span
            class="call-record-card-field"
            :style="{ width: THEAD_COLUMNS[1].flexGrow }"
          >
            <div
              v-for="tag of detail.user_defined_tags"
              :key="tag"
              :style="{
                color: tagsColorPattern[tag] && tagsColorPattern[tag].color,
                backgroundColor:
                  tagsColorPattern[tag] && tagsColorPattern[tag].bgColor
              }"
              class="tag"
            >
              {{ tag }}
            </div>
          </span>
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

        <!-- mobile files  -->
        <div style="display: flex; justify-content: space-between">
          <span class="call-record-card-field">{{
            `${
              detail.call_phone === '+1'
                ? 'Unavailable '
                : detail.call_phone || ''
            }
              ${detail.location || ''}`
          }}</span>
          <div>
            <span class="call-record-card-field">{{
              detail.timestamp | parseToDate
            }}</span>
            <span class="call-record-card-field">{{
              detail.timestamp | parseToTime
            }}</span>
          </div>
        </div>
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

import tagsColorPattern from './utils/tags-color-pattern'

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
      playFullVoice: false, // Audio play state
      fullVoiceProgressRate: 0,
      fullVoiceAvailable: false,

      // Detail from Server
      detail: {},

      tagsColorPattern
    }
  },
  computed: {
    ...mapState({
      userAvatar: (state) => get(state, 'account.head_image_url')
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
  beforeDestroy() {
    this.fullVoiceHowler.unload()
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
        html5: true, // Cause using webaudio will happen CORS error
        onload: () => {
          this.fullVoiceAvailable = true
        },
        onplay: () => {
          this.playFullVoice = true
          const duration = sound.duration()
          timer && clearInterval(timer)
          timer = setInterval(() => {
            const currentTime = sound.seek() || 0
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
.call-card-cell {
  display: none;
}
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
    padding: 16px 32px 52px 48px;
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
      align-items: center;
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

.tag {
  margin-left: 6px;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: bold;
}

.privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  @include secondary-text($font-size: 14px, $font-weight: normal);
  .shape {
    margin-right: 10px;
  }
}

@include mobile {
  .hidde-in-mobile {
    display: none;
  }
  .call-card-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .call-record {
    padding: 0 16px;
  }
  .call-record-thead-cells {
    display: none;
  }
  .call-record-card {
    padding: 16px;
  }
  .call-record-card-ctrl-btn {
    position: relative;
    border: none;
    width: 30px;
    height: 30px;
    transform: none;
  }
  .call-record-card-ctrl-btn-shape {
    font-size: 10px;
  }
  .call-record-card-fields {
    display: none;
  }
  .call-record-history {
    padding: 12px 6px;
  }
}
</style>
