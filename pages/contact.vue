<template>
  <div class="contact content">
    <h1>Contact Us</h1>
    <p>
      Consectetur quis elementum faucibus purus tellus hendrerit sodales.
      Ultrices elit nulla interdum
    </p>
    <div class="form-row">
      <b-field label="Name *" class="field">
        <b-input v-model="name" required></b-input>
      </b-field>
      <b-field label="Email *" class="field">
        <b-input v-model="email" required type="email"></b-input>
      </b-field>
    </div>
    <b-field label="Message *">
      <b-input maxlength="400" type="textarea" required></b-input>
    </b-field>
    <Button text="Submit" />
  </div>
</template>

<script>
import Button from '~/components/utils/Button.vue'

export default {
  layoutVariant: true,
  components: { Button },
  data() {
    return {
      name: '',
      email: '',
      content: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  padding: 3.5rem 3rem;
  width: 60%;
  min-width: 900px;
  margin: 0 auto;
  background: $white;
  position: relative;
  top: 8rem;
  margin-bottom: 15rem;
  border-radius: 8px;

  @include mobile {
    min-width: 0px;
    width: 90%;
    padding: 2rem;
  }

  /deep/ .label {
    color: #59687a;
  }

  /deep/ input,
  /deep/ textarea {
    background: #f3f6f8;
    border: none;
    box-shadow: none;
    border-radius: 8px;
    color: $dark;
    font-weight: bold;
  }

  /deep/ button {
    min-height: 0;
    background: $primary;

    span {
      font-size: 18px;
    }
  }

  .form-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 1rem;

    @include mobile {
      flex-direction: column;
    }

    .field {
      width: 45%;

      @include mobile {
        width: 100%;
      }
    }
  }
}
</style>
