<template>
  <div class="testimonial-wrapper">
    <img
      src="~assets/images/left-arrow.svg"
      class="arrow left-arrow"
      alt="Left Arrow"
      @click="goLeft"
    />

    <Testimonial
      :avatar="items[0].avatar"
      :name="items[0].name"
      :content="items[0].content"
      :color="items[0].color"
      :class="cssItem0"
    />

    <Testimonial
      :avatar="items[1].avatar"
      :name="items[1].name"
      :content="items[1].content"
      :color="items[1].color"
      :class="cssItem1"
    />

    <Testimonial
      :avatar="items[2].avatar"
      :name="items[2].name"
      :content="items[2].content"
      :color="items[2].color"
      :class="cssItem2"
    />

    <img
      src="~assets/images/right-arrow.svg"
      class="arrow right-arrow"
      alt="Left Arrow"
      @click="goRight"
    />
  </div>
</template>

<script>
import Testimonial from './Testimonial.vue'

export default {
  components: { Testimonial },
  data() {
    return {
      items: [
        {
          avatar: 'avatar.png',
          name: 'Darlene Flores',
          content:
            'Unlike your regular voicemail that only has one answer for all, TicMeet has answers for all your callers.'
        },
        {
          avatar: 'avatar.png',
          name: 'Darlene Flores',
          content: 'testimonial No.2',
          color: '#dcf0f9'
        },
        {
          avatar: 'avatar.png',
          name: 'Darlene Flores',
          content: 'testimonial No.3',
          color: '#02aefc'
        }
      ],
      order: [0, 1, 2]
    }
  },
  computed: {
    cssItem0() {
      return 'testimonial testimonial-' + this.order[0]
    },
    cssItem1() {
      return 'testimonial testimonial-' + this.order[1]
    },
    cssItem2() {
      return 'testimonial testimonial-' + this.order[2]
    }
  },
  methods: {
    goLeft() {
      const temp = this.order[2]
      this.order.pop()
      this.order.unshift(temp)
    },
    goRight() {
      const temp = this.order[0]
      this.order.shift()
      this.order.push(temp)
    }
  }
}
</script>

<style lang="scss" scoped>
.testimonial-wrapper {
  width: 70%;
  height: 250px;
  margin: 0 auto;
  position: relative;
  left: 4%;
}

.testimonial {
  position: absolute;
  transition: all 0.5s ease;
}

.testimonial-0 {
  transform: scale(0.9) translateX(-9%);
  z-index: 10;
}

.testimonial-1 {
  transform: scale(0.8);
  z-index: 8;
}

.testimonial-2 {
  transform: scale(0.7) translateX(11%);
  z-index: 6;
  transition: none;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  cursor: pointer;
}

.left-arrow {
  left: -18%;
}

.right-arrow {
  right: -8%;
}
</style>
