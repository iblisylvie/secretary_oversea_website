<template>
  <article :class="{ inverse: inverse }" class="image-text section">
    <img alt="Illustration" :src="require('~/assets/images/' + image)" />
    <div class="content">
      <h4>{{ title }}</h4>
      <p>
        {{ subTitle }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    inverse: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.image-text {
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.content {
    width: 65%;
  }

  &.inverse {
    flex-direction: row-reverse;
  }

  img {
    width: 220px;
  }

  @include mobile {
    padding-left: 0px;
    padding-right: 0px;

    div.content {
      width: 70%;

      h4 {
        font-size: 16px;
      }

      p {
        font-size: 13px;
      }
    }

    img {
      width: 80px;
    }
  }
}
</style>
