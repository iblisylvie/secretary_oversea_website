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
        <div class="call-record-row-card-fields">
          <span
            class="call-record-row-card-field"
            :style="{ width: THEAD_COLUMNS[0].flexGrow }"
            >{{ detail.phone }}</span
          >
          <span
            class="call-record-row-card-field"
            :style="{ width: THEAD_COLUMNS[1].flexGrow }"
            >{{ detail.tags.toString() }}</span
          >
          <span
            class="call-record-row-card-field"
            :style="{ width: THEAD_COLUMNS[2].flexGrow }"
            >{{ detail.called_no }}</span
          >
          <span
            class="call-record-row-card-field"
            :style="{ width: THEAD_COLUMNS[3].flexGrow }"
            >{{ detail.timestamp | parseToDate }}</span
          >
          <span
            class="call-record-row-card-field"
            :style="{ width: THEAD_COLUMNS[4].flexGrow }"
            >{{ detail.timestamp | parseToTime }}</span
          >
        </div>
        <audio
          ref="fullVoiceAudio"
          :src="detail.full_voice_url"
          style="display: none"
        ></audio>
        <b-progress type="is-info" :value="80"></b-progress>
      </div>
      <div class="call-record-history">
        <div>
          <div
            v-for="(msg, index) in detail.call_detail"
            :key="index"
            class="call-record-history-bubble caller"
          >
            <svg-icon icon-class="speak" class-name="" />
            <audio :src="msg.user_voice_url" style="display:none"></audio>
            {{ msg.user_query }}
          </div>
          <div class="call-record-history-bubble callee">
            {{ msg.dm_resp }}
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
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
  async asyncData({ $axios, params }) {
    const detail = await $axios({
      method: 'GET',
      url: '/overseas/call-detail',
      params: {
        id: params.id
      }
    })
    return detail
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
      fullVoiceProgressModel: 0
    }
  },
  created() {
    this.calcFullVoiceProgress()
  },
  methods: {
    onControlFullVoice() {
      this.playFullVoice
        ? this.$refs.fullVoiceAudio.pause()
        : this.$refs.fullVoiceAudio.play()
    },
    calcFullVoiceProgress() {
      const audio = this.$refs.fullVoiceAudio
      // let timer = null
      audio.addEventListener('progress ', () => {
        // const timer = setInterval(() => {
        const currentTime = audio.currentTime || 0
        const duration = audio.duration
        this.fullVoiceProgressModel = (currentTime / duration) * 100
        // }, 1000)
      })

      audio.addEventListener('ended', () => {})
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
    display: flex;
    align-items: center;
    margin-top: 16px;
    position: relative;
    flex: 1;
    display: flex;
    padding: 52px 0 52px 48px;
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
      &-shape {
        font-size: 24px;
      }
      &.play {
        background: #02aefc;
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
    display: flex;
    flex-flow: column;
    margin-top: 24px;
    padding: 40px 32px;
    background: #fff;
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
