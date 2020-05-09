<template>
  <div v-if="issues" class="faqs">
    <Faq v-for="issue in issues" :key="issue.question" :issue="issue" />
  </div>
</template>

<script>
import issues from '~/static/specific-faq.json'
import Faq from '~/components/app/Faq.vue'
export default {
  name: 'Support',
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
  width: 80%;
  margin: 0 auto;
  max-height: 95vh;
  overflow: scroll;
}
</style>
