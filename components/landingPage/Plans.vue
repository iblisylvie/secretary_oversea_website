<template>
  <div class="plans">
    <article class="plan free">
      <img src="~assets/images/free-plan.png" alt="Free Plan" />
      <h4>Free Plan</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
        fringilla tempus. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Diam fringilla tempus.
      </p>
      <Button tag="router-link" to="/login" text="Start" />
    </article>

    <article class="plan premium">
      <img src="~assets/images/premium-plan.png" alt="Premium Plan" />
      <h4>Premium Plan</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
        fringilla tempus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
        fringilla tempus. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Diam fringilla tempus.
      </p>
      <p class="coming">Coming Soon</p>
    </article>
  </div>
</template>

<script>
import Button from '~/components/utils/Button.vue'

export default {
  components: { Button }
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
  width: 560px;
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
  box-shadow: 0px 64px 88px rgba(90, 89, 165, 0.12);

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
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5;
    opacity: 0.7;
    color: #59687a;
    text-align: left;
  }

  a {
    color: $white;
    margin-top: 3rem;
  }

  &.free {
    margin-right: -3.6rem;

    h4 {
      color: $primary;
    }

    a {
      background: $primary;
    }

    @include mobile {
      margin-right: 0px;
      margin-bottom: 16px;
    }
  }

  &.premium {
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
