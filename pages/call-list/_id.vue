<template>
  <section class="call-record">
    <header class="call-record-thead">
      <svg-icon icon-class="go-back" class-name="call-record-thead-go-back" />
      <div class="call-record-thead-cells">
        <span
          v-for="column in THEAD_COLUMNS"
          :key="column.label"
          :style="{ flex: column.flexGrow }"
          >{{ column.label }}</span
        >
      </div>
    </header>
    <section>
      <div class="call-record-card">
        <button class="call-record-card-ctrl-btn play">
          <svg-icon
            icon-class="play"
            class-name="call-record-card-ctrl-btn-shape play"
          />
        </button>
        <span
          v-for="column in THEAD_COLUMNS"
          :key="column.label"
          :style="{ flex: column.flexGrow }"
          >{{ column.label }}</span
        >
      </div>
      <div class="call-record-history">
        <div class="call-record-history-bubble caller">
          <svg-icon icon-class="speak" class-name="" />
          Loren ipsum
        </div>
        <div class="call-record-history-bubble callee">
          Loren ipsum
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'dashboard',
  name: 'CallRecord',
  data() {
    return {
      THEAD_COLUMNS: [
        {
          flexGrow: 13,
          label: 'Caller'
        },
        {
          flexGrow: 48,
          label: 'Type'
        },
        {
          flexGrow: 15,
          label: 'My number'
        },
        {
          flexGrow: 9,
          label: 'Date'
        },
        {
          flexGrow: 7,
          label: 'Time'
        }
      ]
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
