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
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.testimonial {
  width: 75%;
  background: #f5f8fc;
  border-radius: 2rem;
  margin: 0 auto 2rem;
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $dark;
}

.profile {
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 0.9rem;
    line-height: 2.2;
    margin-top: 0.75rem;
  }
}

.content {
  width: 75%;
  font-size: 1.375rem;
  line-height: 1.8;
}
</style>
