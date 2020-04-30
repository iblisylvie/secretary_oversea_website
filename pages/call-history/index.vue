<template>
  <section class="call-history">
    <header class="call-history-thead">
      <b-checkbox
        v-show="editing"
        v-model="selectAllModel"
        class="call-history-thead-select-all"
        :indeterminate="selectAllIndeterminate"
        @input="onSelectAll"
      ></b-checkbox>
      <div @click="editing = true">
        <svg-icon
          v-show="!editing"
          icon-class="edit"
          class-name="call-history-thead-edit"
        ></svg-icon>
      </div>

      <div class="call-history-thead-cells">
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
      <div
        v-for="row in callHistoryTableData"
        :key="row.id"
        class="call-history-row"
      >
        <b-checkbox
          v-show="editing"
          v-model="row.selectedModel"
          class="call-history-row-select"
        ></b-checkbox>
        <nuxt-link
          :to="`/call-history/${row.id}`"
          class="call-history-row-card"
          :class="{ editing: editing }"
        >
          <div class="call-history-row-card-fields">
            <span
              class="call-history-row-card-field"
              :style="{ width: row.flexGrowRates[0] }"
              >{{ row.phone }}</span
            >
            <span
              class="call-history-row-card-field"
              :style="{ width: row.flexGrowRates[1] }"
              >{{ row.tags.toString() }}</span
            >
            <span
              class="call-history-row-card-field"
              :style="{ width: row.flexGrowRates[2] }"
              >{{ row.called_no }}</span
            >
            <span
              class="call-history-row-card-field"
              :style="{ width: row.flexGrowRates[3] }"
              >{{ row.timestamp | parseToDate }}</span
            >
            <span
              class="call-history-row-card-field"
              :style="{ width: row.flexGrowRates[4] }"
              >{{ row.timestamp | parseToTime }}</span
            >
          </div>
        </nuxt-link>
      </div>
    </section>
    <footer class="call-history-footer">
      <b-pagination
        range-before="3"
        range-after="1"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :total="total"
        :current.sync="current"
        :simple="false"
        :rounded="false"
        :per-page="perPage"
        @change="fetchCallHistory"
      ></b-pagination>
    </footer>

    <!-- Delete tool tip -->
    <div v-show="editing" class="call-history-tool-tip">
      <div class="call-history-tool-tip-state">
        <svg-icon
          icon-class="phone"
          class-name="call-history-tool-tip-state-icon"
        ></svg-icon>
        <span class="call-history-tool-tip-state-desc">
          {{ `${callSelection.length} Call Selected` }}
        </span>
        <button
          v-show="callSelection.length"
          class="call-history-tool-tip-delete"
          @click="deleteCallHistory"
        >
          Delete
        </button>
      </div>
      <b-button
        rounded
        class="call-history-tool-tip-btn"
        @click="editing = false"
        >Exit</b-button
      >
    </div>
  </section>
</template>

<script>
import { get } from 'lodash-es'
import dayjs from 'dayjs'

export default {
  name: 'CallHistory',
  layout: 'dashboard',
  filters: {
    parseToDate(val) {
      return dayjs(val).format('MMM D')
    },
    parseToTime(val) {
      return dayjs(val).format('hh:mm')
    }
  },
  asyncData() {
    return {}
  },
  data() {
    return {
      editing: false,
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

      // Pagination
      perPage: 20,
      current: 1,
      total: 0,

      // Call history from server
      callHistory: []

      // Edit
      // selectAllModel: false
    }
  },
  computed: {
    callHistoryTableData() {
      return get(this, 'callHistory', []).map((record) => {
        record.flexGrowRates = this.THEAD_COLUMNS.map(
          (column) => column.flexGrow
        )
        this.$set(record, 'selectedModel', false)
        return record
      })
    },
    callSelection() {
      return this.callHistoryTableData.filter((record) => record.selectedModel)
    },
    selectAllModel() {
      return Boolean(
        this.callSelection.length === this.callHistoryTableData.length
      )
    },
    selectAllIndeterminate() {
      return Boolean(
        this.callSelection.length &&
          this.callSelection.length !== this.callHistoryTableData.length
      )
    }
  },
  created() {
    this.fetchCallHistory()
  },
  methods: {
    async fetchCallHistory() {
      const result = await this.$axios({
        method: 'get',
        url: '/overseas/call-history',
        params: {
          page: this.current - 1, // Page number start with 0
          size: this.perPage
        }
      })
      this.callHistory = get(result, 'call_history', [])
      this.total = get(result, 'sum', 0)
    },
    onSelectAll(value) {
      this.callHistoryTableData.forEach(
        (record) => (record.selectedModel = value)
      )
    },
    async deleteCallHistory() {
      await this.$axios({
        method: 'DELETE',
        url: '/overseas/call-history',
        params: {
          id: this.callSelection.map((record) => record.id).join(',')
        }
      })
      this.$buefy.toast.open({
        message: `${this.callSelection.length} calls deleted.`,
        type: 'is-success'
      })
      this.fetchCallHistory()
    }
  }
}
</script>

<style lang="scss" scoped>
$table-sticky-header-height: 700px;
.call-history {
  padding: 40px 32px 84px 48px;
  height: 100%;
  &-thead {
    display: flex;
    width: 100%;
    color: #484848;
    &-select-all {
      margin-right: 32px;
      font-size: 16px;
      height: 28px;
    }
    &-edit {
      margin-right: 32px;
      font-size: 28px;
      cursor: pointer;
    }
    &-cells {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    &-cell {
    }
  }
  &-row {
    display: flex;
    align-items: center;

    margin-top: 16px;
    &-select {
      font-size: 16px;
    }
    &-card {
      margin-left: 28px;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      padding: 52px 0 52px 32px;
      background: #fff;
      border-radius: 8px;
      cursor: pointer;
      &.editing {
        margin-left: 0;
      }
      &-fields {
        display: flex;
        flex: 1;
      }
      &-field {
        color: #141b24;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  &-footer {
    margin-top: 32px;
  }
  &-tool-tip {
    position: fixed;
    bottom: 20px;
    right: 32px;
    left: 32px;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    padding: 20px 32px;
    border-radius: 8px;
    background: #fff;
    &-state {
      display: flex;
      align-items: center;
      &-icon {
        margin-right: 18px;
        font-size: 16px;
      }
      &-desc {
        margin-right: 86px;
        color: #717d8b;
        font-size: 14px;
        font-weight: bold;
      }
    }
    &-btn {
      background: #02aefc;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
    &-delete {
      color: #f55757;
      background: inherit;
      border: none;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
