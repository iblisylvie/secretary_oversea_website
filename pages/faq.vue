<template>
  <div v-if="issues" class="faqs">
    <Faq v-for="issue in issues" :key="issue.question" :issue="issue" />
    <div class="content">
      <h5>
        Can’t find your answer?
        <nuxt-link :to="{ path: '/contact' }"> Contact Us</nuxt-link>
      </h5>
    </div>
  </div>
</template>

<script>
import issues from '~/static/landing-page-faq.json'
import Faq from '~/components/app/Faq.vue'
export default {
  layoutVariant: true,
  components: { Faq },
  asyncData({ params }) {
    return { issues }
  }
}
</script>

<style lang="scss" scoped>
.faqs {
  padding: 8rem 3rem 4rem;
  width: 80%;
  margin: 0 auto;

  @include mobile {
    width: 100%;
    padding: 8rem 1rem 0;
  }

  .content {
    margin-top: 3rem;
  }
}
</style>
