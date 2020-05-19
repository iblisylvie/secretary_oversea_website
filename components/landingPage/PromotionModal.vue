<template>
  <transition name="fade">
    <b-modal :active.sync="isModalActive">
      <div class="card content">
        <h3>Welcome to HeyTico!</h3>
        <p>
          Guess you are one of those explorers who have found us! Here’s what we
          reward you with for being one of the firsts!
        </p>
        <span>
          Enjoy a 1 month PREMIUM account for FREE to start your boss journey.
        </span>
        <div class="buttonWrapper">
          <Button
            tag="a"
            :href="url"
            text="FREE PREMIUM ACCOUNT"
            class="promotionBtn"
          />
        </div>
        <img src="~assets/images/modal_image.png" alt="Illustrations" />
      </div>
    </b-modal>
  </transition>
</template>

<script>
import Button from '~/components/utils/Button.vue'

export default {
  components: { Button },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isModalActive: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => (this.isModalActive = true), 4000)
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/ .modal-content {
  overflow: visible;

  @include mobile {
    overflow: hidden;
  }
}

/deep/ .modal-close {
  display: block !important;
}

.card {
  padding: 4rem;
  position: relative;
  border-radius: 20px;
  max-width: 840px;

  @include mobile {
    padding: 3rem 1rem;
    max-width: 90%;
    margin: 0 auto;
  }
}

h3,
p,
span {
  max-width: 410px;

  @include mobile {
    z-index: 2;
    position: relative;
  }
}

p {
  font-size: 1.25rem;
}

span {
  font-size: 1rem;
  display: block;
  font-weight: bold;
}

.buttonWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  @include mobile {
    margin-top: 4rem;
    justify-content: flex-start;
    z-index: 2;
    position: relative;
  }

  .promotionBtn {
    background: $linear-gradient;
    font-size: 14px;
  }
}

img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -100px;
  max-width: 350px;

  @include mobile {
    max-width: 200px;
    bottom: -10px;
    right: -10px;
    top: unset;
    transform: none;
    z-index: 0;
    opacity: 10%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
