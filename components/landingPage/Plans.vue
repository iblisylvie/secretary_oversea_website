<template>
  <div class="plans">
    <article class="plan free">
      <img src="~assets/images/free-plan.png" alt="Free Plan" />
      <h4>Free Plan</h4>
      <p>
        Satisfy the basic needs of answering calls. From letting your callers
        know that you are busy to where to put packages and to refusing spam
        calls. Accurate, reliable, and always on duty. Ready even when you are
        not.
      </p>
      <Button v-if="!user" tag="a" :href="signup" text="Start" />
      <Button v-if="user" tag="router-link" to="/call-history" text="Start" />
    </article>

    <article class="plan premium">
      <img src="~assets/images/premium-plan.png" alt="Premium Plan" />
      <h4>Premium Plan</h4>
      <p>
        Enjoy all the customizable features you need while reluctantly missing
        calls. From customizing replies for your contacts and unknown callers to
        setting your assistant’s voice. Your personal assistant should be this
        personalized and flexible.
      </p>
      <p class="coming">Coming Soon</p>
    </article>
  </div>
</template>

<script>
import Button from '~/components/utils/Button.vue'

export default {
  components: { Button },
  props: {
    user: {
      type: Boolean
    },
    signup: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.plans {
  display: flex;
  justify-content: center;
  align-items: center;

  @include mobile {
    flex-direction: column;
  }
}

.plan {
  width: 480px;
  padding: 3.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
    width: 10rem;
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

  p {
    font-size: 1.1rem;
    font-weight: normal;
    line-height: 1.5;
    opacity: 0.7;
    color: $dark;
    text-align: center;
  }

  a {
    color: $white;
    margin-top: 3rem;
  }

  &.free {
    margin-right: -3.6rem;
    transform: scale(0.9);

    h4 {
      color: $primary;
    }

    a {
      background: $primary;
    }

    @include mobile {
      margin-right: 0px;
      margin-bottom: 16px;
      transform: none;
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
