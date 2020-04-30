<template>
  <div class="contact content">
    <h1>Contact Us</h1>
    <p>
      Got any questions for us? Or have any feedback, feel free to fill out down
      below and let us know! Our customer service team will be right there with
      you. :D
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
      <b-input
        v-model="content"
        maxlength="400"
        type="textarea"
        required
      ></b-input>
    </b-field>
    <Button text="Submit" @click.native="submit" />
    <span v-if="success || fail">{{ message }}</span>
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
      content: '',
      message: '',
      success: false,
      fail: false
    }
  },
  methods: {
    submit() {
      if (this.email && this.name && this.content) {
        this.$axios({
          method: 'post',
          data: {
            email: this.email,
            name: this.name,
            content: this.content
          },
          url: `overseas/feedback`
        })
          .then((response) => {
            if (response.err_msg === 'success') {
              this.throwSuccess('Thanks, we will contact you soon.')
            } else {
              this.throwError(response.err_msg)
            }
          })
          .catch((error) => {
            this.throwError(error.toString())
          })
      } else {
        this.throwError('Please put valid info.')
      }
    },
    throwError(message) {
      this.success = false
      this.fail = true
      this.message = message
    },
    throwSuccess(message) {
      this.success = true
      this.fail = false
      this.message = message
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
  position: relative;
  z-index: 2;

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
