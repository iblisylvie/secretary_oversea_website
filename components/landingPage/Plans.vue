<template>
  <div class="plans">
    <article class="plan free">
      <img src="~assets/images/free-plan.png" alt="Free Plan" />
      <h4>Free Plan</h4>
      <p class="desc">
        Satisfy the basic needs of answering calls. From letting your callers
        know that you are busy to where to put packages and to refusing spam
        calls. Accurate, reliable, and always on duty. Ready even when you are
        not.
      </p>
      <!-- <Button v-if="!user" tag="a" :href="signup" text="Start" />
      <Button v-if="user" tag="router-link" to="/call-history" text="Start" /> -->

      <!-- <div class="content">
        <DotText text="Answer Your Calls" />
        <DotText text="Service 1 Number" />
        <DotText text="AI Voice at Your Service" />
      </div> -->
    </article>

    <article class="plan premium">
      <img src="~assets/images/premium-plan.png" alt="Premium Plan" />
      <h4>Premium Plan</h4>
      <p class="desc">
        Enjoy all the customizable features you need while reluctantly missing
        calls. From customizing replies for your contacts and unknown callers to
        setting your assistant’s voice. Your personal assistant should be this
        personalized and flexible.
      </p>
      <!-- <p class="coming">Coming Soon</p> -->

      <!-- <div class="content">
        <DotText premium text="Answer Your Calls" />
        <DotText premium text="Service Multiple Numbers" />
        <DotText premium text="Choose Your Voice - 4 voices" />
        <DotText premium text="Customize Your Name" />
        <DotText premium text="Customize Your HeyTico AI-Assistant’s Name" />
        <DotText premium text="Customize Opening Remarks" />
        <DotText premium text="Customize Your Replies For Your Contacts" />
        <DotText premium text="Customize Specific Replies" />
        <DotText premium text="Customize Your Refusal Replies" />
      </div> -->
    </article>
  </div>
</template>

<script>
// import Button from '~/components/utils/Button.vue'
// import DotText from '~/components/app/DotText.vue'

export default {
  // components: { DotText },
  props: {
    user: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.plans {
  display: flex;
  justify-content: center;
  align-items: stretch;

  @include mobile {
    flex-direction: column;
  }
}

.plan {
  width: 480px;
  padding: 3.8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: $white;
  color: $white;
  font-weight: bold;
  border-radius: 2rem;
  box-shadow: 0px 24px 88px rgba(111, 111, 155, 0.1),
    0px 16px 32px rgba(202, 208, 217, 0.25);

  @include mobile {
    width: 90%;
    padding: 24px 30px;
    border-radius: 1rem;
  }

  img {
    width: 8rem;
    height: 8rem;
    margin-bottom: 1rem;

    @include mobile {
      width: 8rem;
    }
  }

  h4 {
    font-size: 2.2rem;
    line-height: 1.5;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #59687a;
    @include mobile {
      font-size: 16px;
    }
  }

  p.desc {
    font-size: 1.1rem;
    font-weight: normal;
    line-height: 1.8;
    text-align: center;
    opacity: 0.7;
    color: $dark;
  }

  a {
    color: $white;
    margin-top: 3rem;
  }

  &.free {
    h4 {
      color: $primary;
    }

    a {
      background: $primary;
    }

    @include mobile {
      margin-bottom: 16px;
    }
  }

  &.premium {
    z-index: 1;

    h4 {
      color: $secondary;
    }

    .coming {
      color: $secondary;
      margin-top: 3rem;
      text-align: center;
    }
  }
}
</style>
