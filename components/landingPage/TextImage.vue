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
    padding: 1rem 0;

    div.content {
      width: 66%;

      h4 {
        font-size: 14px;
        line-height: 1.4;
      }

      p {
        font-size: 12px;
      }
    }

    img {
      width: 30%;
    }
  }
}
</style>
