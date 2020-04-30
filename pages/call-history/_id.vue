<template>
  <section class="call-record">
    <header class="call-record-thead">
      <svg-icon icon-class="go-back" class-name="call-record-thead-go-back" />
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
          @click="onControlFullVoice"
        >
          <svg-icon
            icon-class="play"
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
        <audio
          ref="fullVoiceAudio"
          :src="detail.full_voice_url"
          style="display: none"
        ></audio>
        <b-progress type="is-info" :value="fullVoiceProgressModel"></b-progress>
      </div>
      <div class="call-record-history">
        <div
          v-for="(msg, index) in callDetail"
          :key="index"
          class="call-record-history-wrap"
        >
          <div
            v-if="msg.user_voice_url && msg.user_query"
            class="call-record-history-bubble caller"
          >
            <span @click="onSessionAudioCtrol">
              <svg-icon icon-class="speak" />
            </span>
            <audio :src="msg.user_voice_url" style="display:none"></audio>
            {{ msg.user_query }}
          </div>
          <div v-if="msg.dm_resp" class="call-record-history-bubble callee">
            {{ msg.dm_resp }}
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { get } from 'lodash-es'
import dayjs from 'dayjs'

export default {
  layout: 'dashboard',
  name: 'CallRecord',
  filters: {
    parseToDate(val) {
      return dayjs(val).format('MMM D')
    },
    parseToTime(val) {
      return dayjs(val).format('hh:mm')
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
          flexGrow: '48%',
          label: 'Type'
        },
        {
          flexGrow: '15%',
          label: 'My number'
        },
        {
          flexGrow: '9%',
          label: 'Date'
        },
        {
          flexGrow: '7%',
          label: 'Time'
        }
      ],

      playFullVoice: false,
      fullVoiceProgressModel: 0,
      fullVoiceAvailable: false,

      // Detail from Server
      detail: {}
    }
  },
  computed: {
    callDetail() {
      return get(this, 'detail.call_detail', [])
    }
  },
  async created() {
    await this.fetchCallDetail()
  },
  mounted() {
    this.calcFullVoiceProgress()
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
      this.detail = result
    },
    onControlFullVoice() {
      this.playFullVoice
        ? this.$refs.fullVoiceAudio.pause()
        : this.$refs.fullVoiceAudio.play()
      this.playFullVoice = !this.playFullVoice
    },
    onSessionAudioCtrol($event) {
      const { currentTarget } = $event
      const audio = currentTarget.nextElementSibling
      audio && audio.play()
    },
    calcFullVoiceProgress() {
      const audio = this.$refs.fullVoiceAudio
      // let timer = null
      audio.addEventListener('timeupdate ', () => {
        // timer = setInterval(() => {
        const currentTime = audio.currentTime || 0
        const duration = audio.duration
        this.fullVoiceProgressModel = (currentTime / duration) * 100
        // }, 1000)
      })
      audio.addEventListener('canplay ', () => {
        this.fullVoiceAvailable = true
      })

      // audio.addEventListener('ended', () => {
      //   timer && clearInterval(timer)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
$table-sticky-header-height: 700px;
.call-record {
  padding: 40px 32px 84px 48px;
  height: 100%;
  &-thead {
    display: flex;
    padding-right: 32px;
    width: 100%;
    color: #484848;
    &-go-back {
      font-size: 16px;
      margin-right: 32px;
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
      width: 64px;
      height: 64px;
      border: none;
      border-radius: 100%;
      font-size: 64px;
      cursor: pointer;
      outline: none;
      background: #02aefc;
      &[disabled] {
        background: gray;
        cursor: not-allowed;
      }
      &-shape {
        font-size: 24px;
      }
      &.play {
        // background: #02aefc;
      }
      &.pause {
        background: #edf9ff;
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
    &-bubble {
      flex-flow: column;
      margin-bottom: 12px;
      padding: 16px;
      border-radius: 25px;
      font-size: 14px;
      &.caller {
        align-self: flex-start;
        border-top-left-radius: 0;
        background: #eff5fc;
        color: #141b24;
      }
      &.callee {
        align-self: flex-end;
        border-top-right-radius: 0;
        background: #02aefc;
        color: #f3f6f8;
      }
    }
  }
}
</style>
