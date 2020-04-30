<template>
  <article :class="{ 'is-active': active }" @click="toggle">
    <div class="content">
      <h4>{{ issue.question }}</h4>
      <p>
        {{ issue.answer }}
      </p>
    </div>
    <i class="arrow"></i>
  </article>
</template>

<script>
export default {
  props: {
    issue: {
      type: Object,
      default() {
        return {
          question: '',
          answer: ''
        }
      }
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  width: 100%;
  background: $white;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;

  @include mobile {
    padding: 2rem 1.5rem;
  }

  .content {
    margin: 0;
    width: 80%;

    p {
      margin: 0px;
      max-height: 24px;
      overflow: hidden;

      @include mobile {
        max-height: 0px;
      }
    }

    @include mobile {
      h4 {
        margin-bottom: 0;
        line-height: 20px;
      }
    }
  }

  .arrow {
    align-self: self-start;
    margin-top: 25px;
    border: solid #59687a;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);

    @include mobile {
      margin-top: 0px;
    }
  }

  /** expand state */
  &.is-active {
    p {
      max-height: 1000rem;
    }

    .arrow {
      transform: rotate(-135deg);
    }

    @include mobile {
      h4 {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
