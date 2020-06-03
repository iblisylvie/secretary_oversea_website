<template>
  <h1 class="title is-spaced m-b-35">
    Your AI assistant for answering
    <transition name="fade" mode="out-in">
      <span :key="index" class="hightlight">{{ highlightWord }}</span>
    </transition>
    calls
  </h1>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      list: [
        'unwanted',
        'unanswered',
        'appointment',
        'delivery',
        'scheduling',
        'spam',
        'fraud'
      ],
      interval: null
    }
  },
  computed: {
    highlightWord() {
      return this.list[this.index]
    }
  },
  mounted() {
    this.startInterval()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.index++
        if (this.index >= this.list.length) this.index = 0
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  line-height: 1.3;
  color: $white;
  max-width: 590px;
}

.hightlight {
  background: #1465db;
  border-radius: 4px;
  padding: 0 5px;
}

@include mobile {
  .title {
    margin-bottom: 1rem !important;
    color: $dark;
  }

  .hightlight {
    background: $colored-bg;
  }
}

.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
</style>
