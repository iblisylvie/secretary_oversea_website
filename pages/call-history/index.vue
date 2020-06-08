<template>
  <section :class="['call-history', { empty: !callHistory.length }]">
    <template v-if="callHistory.length">
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
                ><div
                  v-for="tag of row.tags"
                  :key="tag"
                  :style="{
                    color: tagsColorPattern[tag] && tagsColorPattern[tag].color,
                    backgroundColor:
                      tagsColorPattern[tag] && tagsColorPattern[tag].bgColor
                  }"
                  class="tag"
                >
                  {{ tag }}
                </div></span
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
              <div class="cell">
                <span class="caller">{{ row.phone }}</span>
                <span class="callee">{{ `My number${row.called_no}` }}</span>
              </div>
              <div class="cell">
                <span>{{ row.tags.toString() }}</span>
                <div class="time">
                  <span>{{ row.timestamp | parseToDate }}</span>
                  <span>{{ row.timestamp | parseToTime }}</span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <!-- mobile select item  -->
        <div class="call-history-row mobile"></div>
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
    </template>

    <!-- Delete tool tip -->
    <div v-show="editing" class="call-history-tool-tip">
      <div class="call-history-tool-tip-state">
        <svg-icon
          icon-class="phone-white"
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

    <!-- place holder  -->
    <div v-if="!activated && !showTestServices" class="placeholder">
      <p class="title">You haven’t called your HeyTico assistant.</p>
      <p class="sub-title">
        Please call your own mobile number to speak to and <br />
        <span>
          activate your HeyTico assistant.
        </span>
      </p>
      <div class="group">
        <t-button @click="showTestServices = true"
          >Binding Instructions</t-button
        >
        <t-button @click="$router.push({ path: '/support' })">Support</t-button>
      </div>
    </div>

    <test-services v-if="showTestServices" />
  </section>
</template>

<script>
import { get } from 'lodash-es'
import { mapState } from 'vuex'
import * as dayjs from 'dayjs'

import TestServices from './components/TestServices'
import tagsColorPattern from './utils/tags-color-pattern'

export default {
  name: 'CallHistory',
  layout: 'dashboard',
  middleware: ['bind-number-checker'],
  components: {
    TestServices
  },
  filters: {
    parseToDate(val) {
      return dayjs(Number(val)).format('YYYY MMM DD')
    },
    parseToTime(val) {
      return dayjs(Number(val)).format('HH:mm')
    }
  },
  asyncData() {
    return {}
  },
  data() {
    return {
      editing: false,
      showTestServices: false,
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

      // Pagination
      perPage: 20,
      current: 1,
      total: 0,
      callHistoryFetched: false,

      // Call history from server
      callHistory: [],

      // Edit
      // selectAllModel: false
      tagsColorPattern
    }
  },
  computed: {
    ...mapState({
      activated: (state) => get(state, 'relation.relation.activated')
    }),
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
    selectAllModel: {
      get() {
        return Boolean(
          this.callSelection.length === this.callHistoryTableData.length
        )
      },
      set(val) {
        this.callHistoryTableData.forEach(
          (record) => (record.selectedModel = val)
        )
      }
    },
    selectAllIndeterminate() {
      return Boolean(
        this.callSelection.length &&
          this.callSelection.length !== this.callHistoryTableData.length
      )
    }
  },
  created() {
    this.activated && this.fetchCallHistory()
  },
  methods: {
    fetchCallHistory() {
      // @workaround
      // current.sync prop not working in b-pagination
      this.$nextTick(async () => {
        this.callHistoryFetched = false
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
        this.callHistoryFetched = true
      })
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
@import '~/assets/scss/mixins.scss';
// $table-sticky-header-height: 700px;
.call-history {
  padding: 40px 32px 84px 48px;
  height: 100%;
  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
        align-items: center;
      }
      .cell {
        display: none;
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
    background: #02aefc;
    &-state {
      display: flex;
      align-items: center;
      &-icon {
        margin-right: 18px;
        font-size: 16px;
      }
      &-desc {
        margin-right: 86px;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
    }
    &-btn {
      background: #fff;
      font-size: 14px;
      font-weight: bold;
      /deep/ & span {
        @include gradient-text;
      }
    }
    &-delete {
      color: #fff;
      background: inherit;
      border: none;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}

.placeholder {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .title {
    margin-bottom: 0;
    @include primary-text;
  }
  .sub-title {
    margin-top: 36px;
    text-align: center;
    @include secondary-text;
  }
  .group {
    margin-top: 36px;
    & > * {
      margin: 0 14px;
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

@include mobile {
  .call-history {
    padding: 28px 14px;
    .call-history-thead-cells {
      display: none;
    }
    .call-history-row-card {
      margin-left: 0;
      padding: 14px;
    }
    .call-history-row-card-fields {
      flex-flow: column;
    }
    .call-history-row-card-field {
      display: none;
    }
    .cell {
      display: flex;
      justify-content: space-between;
      .caller {
        @include primary-text($font-size: 14px);
      }
      .callee {
        @include secondary-text($font-size: 12px);
      }
      .time {
        @include secondary-text($font-size: 12px);
      }
    }
    .call-history-tool-tip {
      bottom: 16px;
      right: 14px;
      left: 14px;
      padding: 20px;
    }
    .call-history-tool-tip-state-icon {
      margin-right: 12px;
    }
    .call-history-tool-tip-state-desc {
      margin-right: 28px;
      font-size: 12px;
    }
    .call-history-tool-tip-delete {
      font-size: 12px;
    }
  }
}
</style>
