<template>
  <article class="testimonial section columns" :style="{ background: color }">
    <div class="profile">
      <figure class="image is-64x64">
        <img :src="require('~/assets/images/' + avatar)" alt="avatar" />
      </figure>
      <span>{{ name }}</span>
    </div>

    <p class="content">{{ content }}</p>
  </article>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style lang="scss" scoped>
.testimonial {
  width: 100%;
  background: #f5f8fc;
  border-radius: 2rem;
  margin: 0 auto 2rem;
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $dark;

  @include mobile {
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0px 5px 25px -10px rgba(54, 54, 54, 0.5);
  }
}

.profile {
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include mobile {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 16px;

    figure {
      width: 32px;
      height: 32px;
      margin-right: 20px;
    }
  }

  span {
    font-size: 0.9rem;
    line-height: 2.2;
    margin-top: 0.75rem;
    font-weight: bold;
    width: 150%;
    text-align: center;

    @include mobile {
      width: auto;
      margin-top: 0px;
      font-size: 14px;
    }
  }
}

.content {
  width: 75%;
  font-size: 1.375rem;
  line-height: 1.8;

  @include mobile {
    font-size: 13px;
    width: 100%;
  }
}
</style>
