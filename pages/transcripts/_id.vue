<template>
  <section class="container">
    <h3>Transcripts</h3>
    <h4>ID: {{ item.id }}</h4>
    <h4>Caller: {{ item.caller }}</h4>
    <h4>Length: {{ item.length }}</h4>
    <h4>Date: {{ item.date }}</h4>
    <h4>Category: {{ item.category }}</h4>
  </section>
</template>

<script>
export default {
  layout: 'authed',
  name: 'Transcript',
  data() {
    return {
      postId: this.$route.params.id,
      items: [
        {
          id: '1',
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: '2',
          caller: 'Ann Lee',
          length: '2:12',
          date: '2019-02-12',
          category: 'unwanted'
        },
        {
          id: '3',
          caller: 'Chou',
          length: '2:12',
          date: '2019-02-12',
          category: 'sales'
        },
        {
          id: '4',
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: '5',
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        },
        {
          id: '6',
          caller: 'Smith',
          length: '2:12',
          date: '2019-02-12',
          category: 'fraud'
        }
      ]
    }
  },
  computed: {
    item() {
      return this.items.find((item) => item.id === this.postId)
    }
  }
}
</script>
