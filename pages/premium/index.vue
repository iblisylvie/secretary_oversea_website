<template>
  <div class="plans">
    <div class="plan content">
      <img src="~assets/images/free-plan.png" alt="Free Plan" />
      <h5>Free Plan</h5>
      <div class="content">
        <DotText text="Answer Your Calls" />
        <DotText text="Service 1 Number" />
        <DotText text="AI Voice at Your Service" />
      </div>
    </div>

    <div class="plan content">
      <img src="~assets/images/premium-plan.png" alt="Premium Plan" />
      <h5>Premium Plan</h5>
      <div class="content">
        <DotText premium text="Answer Your Calls" />
        <DotText premium text="Service Multiple Numbers" />
        <DotText premium text="Choose Your Voice - 4 voices" />
        <DotText premium text="Customize Your Name" />
        <DotText premium text="Customize Your HeyTico AI-Assistant’s Name" />
        <DotText premium text="Customize Opening Remarks" />
        <DotText premium text="Customize Your Replies For Your Contacts" />
        <DotText premium text="Customize Specific Replies" />
        <DotText premium text="Customize Your Refusal Replies" />
      </div>
      <!-- <p class="coming">Coming Soon</p> -->
    </div>
  </div>
</template>

<script>
import DotText from '~/components/app/DotText.vue'

export default {
  name: 'Premium',
  layout: 'dashboard',
  components: { DotText }
}
</script>

<style lang="scss" scoped>
.plans {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 3rem;
  padding: 0 5rem;

  @include mobile {
    flex-direction: column;
    padding: 0 1.5rem;
  }
}

.plan {
  width: 45%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: $white;
  color: $dark;
  border-radius: 1rem;

  @include mobile {
    width: 100%;
    padding: 24px 30px;
    border-radius: 1rem;
  }

  img {
    width: 10rem;
    margin-bottom: 1rem;

    @include mobile {
      width: 8rem;
    }
  }

  h5 {
    font-size: 1.5rem;
    line-height: 2;
    font-weight: bold;
    margin-bottom: 2rem;

    @include mobile {
      font-size: 2rem;
      line-height: 2.5;
    }
  }

  .content {
    width: 80%;
  }

  .coming {
    color: $secondary;
    font-weight: bold;
    text-align: center;
  }
}
</style>
