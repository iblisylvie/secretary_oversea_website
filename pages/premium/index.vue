<template>
  <div class="plans">
    <div class="plan content">
      <img src="~assets/images/free-plan.png" alt="Free Plan" />
      <h4>Free Plan</h4>
      <p>
        Enjoy all the customizable features you need while reluctantly missing
        calls. From customizing replies for your contacts and unknown callers to
        setting your assistant’s voice. Your personal assistant should be this
        personalized and flexible.
      </p>
    </div>

    <div class="plan content">
      <img src="~assets/images/premium-plan.png" alt="Premium Plan" />
      <h4>Premium Plan</h4>
      <p>
        Enjoy all the customizable features you need while reluctantly missing
        calls. From customizing replies for your contacts and unknown callers to
        setting your assistant’s voice. Your personal assistant should be this
        personalized and flexible.
      </p>
      <p class="coming">Coming Soon</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Premium',
  layout: 'dashboard'
}
</script>

<style lang="scss" scoped>
.plans {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 5rem;

  @include mobile {
    flex-direction: column;
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
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5;
    opacity: 0.7;
    text-align: left;
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

    p {
      opacity: 0.7;
    }

    .coming {
      color: $secondary;
      margin-top: 3rem;
      text-align: center;
    }
  }
}
</style>
