<template>
  <section class="container">
    <h3>Transcripts</h3>
    <b-table :data="data" :columns="columns" hoverable></b-table>
    <div class="content">
      <b-button tag="router-link" to="/plans">Upgrade</b-button>
      <b-button tag="router-link" to="/faq">FAQ</b-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'authed',
  name: 'Transcripts',
  data() {
    return {
      data: [
        {
          id: 1,
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: 2,
          caller: 'Ann Lee',
          length: '2:12',
          date: '2019-02-12',
          category: 'unwanted'
        },
        {
          id: 3,
          caller: 'Chou',
          length: '2:12',
          date: '2019-02-12',
          category: 'sales'
        },
        {
          id: 4,
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: 5,
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: 6,
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'caller',
          label: 'Caller'
        },
        {
          field: 'length',
          label: 'Length'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'category',
          label: 'Category'
        }
      ]
    }
  }
}
</script>
