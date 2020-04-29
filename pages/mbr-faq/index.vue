<template>
  <div v-if="issues" class="faqs">
    <Faq v-for="issue in issues" :key="issue.question" :issue="issue" />
  </div>
</template>

<script>
import issues from '~/static/specific-faq.json'
import Faq from '~/components/app/Faq.vue'
export default {
  name: 'Account',
  layout: 'dashboard',
  components: { Faq },
  asyncData({ params }) {
    return { issues }
  }
}
</script>

<style lang="scss" scoped>
.faqs {
  padding: 4rem 3rem 0 3rem;
  overflow: scroll;
  height: calc(100vh - 3rem);
}
</style>
