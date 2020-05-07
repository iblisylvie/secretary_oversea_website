/* eslint-disable vue/no-v-html */
<template>
  <article :class="{ 'is-active': active }" @click="toggle">
    <div class="content">
      <h4>{{ issue.question }}</h4>
      <p v-html="issue.answer"></p>
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
  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    toggle() {
      this.active = !this.active
    },
    navigate(event) {
      const target = event.target

      // If target is still not a link, ignore
      if (!(target instanceof HTMLAnchorElement)) {
        return
      }
      const to = target.getAttribute('to')
      const hash = target.getAttribute('hash')
      // Get link target, if local link, navigate with router link
      if (to) {
        event.preventDefault()
        if (hash) {
          this.$router.push({ path: to, hash })
        } else {
          this.$router.push(to)
        }
      }
    },
    addListeners() {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
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
  z-index: 2;
  position: relative;

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

      /deep/ ol {
        margin-top: 0;
      }

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
