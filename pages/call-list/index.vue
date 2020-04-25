<template>
  <section class="call-list">
    <!-- using buefy table way -->
    <!-- <b-table
      :data="data"
      :checked-rows.sync="checkedRows"
      :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
      :checkbox-position="checkboxPosition"
      :row-class="() => 'call-list-table-row'"
      sticky-header
      checkable
    >
      <template slot-scope="{ row }">
        <b-table-column
          v-for="column in columns"
          :key="column.field"
          :label="column.label"
          header-class="call-list-table-head-cell"
        >
          <div class="call-list-table-cell">
            {{ row.id }}
          </div>
        </b-table-column>
      </template>
    </b-table> -->

    <header class="call-list-thead">
      <b-checkbox class="call-list-thead-select-all"></b-checkbox>
      <div class="call-list-thead-cells">
        <span
          v-for="column in THEAD_COLUMNS"
          :key="column.label"
          :style="{ flex: column.flexGrow }"
          >{{ column.label }}</span
        >
      </div>
    </header>
    <section>
      <div class="call-list-row">
        <b-checkbox class="call-list-row-select"></b-checkbox>
        <div class="call-list-row-card">
          <span
            v-for="column in THEAD_COLUMNS"
            :key="column.label"
            :style="{ flex: column.flexGrow }"
            >{{ column.label }}</span
          >
        </div>
      </div>
    </section>
    <footer class="call-list-footer">
      <b-pagination
        total="200"
        current.sync="10"
        range-before="3"
        range-after="1"
        :simple="false"
        :rounded="false"
        per-page="10"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'CallList',
  layout: 'dashboard',
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
.call-list {
  padding: 40px 32px 84px 48px;
  height: 100%;
  &-thead {
    display: flex;
    width: 100%;
    color: #484848;

    &-select-all {
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
  &-row {
    display: flex;
    align-items: center;

    margin-top: 16px;
    &-select {
      font-size: 16px;
      // margin-right: 32px;
    }
    &-card {
      flex: 1;
      display: flex;
      padding: 52px 0 52px 32px;
      background: #fff;
      border-radius: 8px;
    }
  }
  &-footer {
    margin-top: 32px;
  }
  // /deep/ .b-table .table,
  // /deep/ &-table-head-cell,
  // /deep/ .b-table .table tr th,
  // & /deep/ .checkbox-cell {
  //   border: none;
  //   background: $main-panel-background;
  // }
  // /deep/ .b-table .table tr td {
  //   border: none;
  //   background: #fff;
  // }
  // /deep/ &-table-row {
  //   margin-top: 16px;
  //   padding: 52px 32px 52px 56px;
  //   background: #fff;
  //   border-radius: 8px;
  // }
}
</style>
