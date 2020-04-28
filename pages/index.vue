<template>
  <div class="landing-page">
    <!-- HERO HEADING -->
    <section class="hero is-fullheight">
      <div class="hero-body container">
        <div class="columns is-centered wrapper">
          <div class="column is-three-fifths">
            <h1 class="title is-spaced m-b-35">
              Your personal assistant for answering unwanted calls
            </h1>
            <h2 class="subtitle m-b-70">
              The future of call forwarding with TicMeet’s AI-powered phone
              assistant.
            </h2>
            <Button
              tag="router-link"
              to="/login"
              text="Try Now"
              sub-text="It's free"
            />
          </div>
          <div class="column messager">
            <img src="~assets/images/messager.png" alt="Illustrations" />
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCT SECTION -->
    <section class="section is-medium">
      <div class="container">
        <div class="columns wrapper">
          <div class="column is-two-fifths">
            <img
              src="~assets/images/logo_grey.png"
              alt="Logo"
              style="width: 256px;"
            />
          </div>
          <div class="column">
            <h2 class="title m-b-25 is-spaced">
              Is voicemail the only place for missed calls?
            </h2>
            <h5 class="subtitle">
              Whether you are busy or do not want to answer a call, your
              personal assistant can help you answer your call anywhere,
              anytime, with the appropriate answer.
            </h5>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURE SECTION -->
    <section class="section">
      <div class="container">
        <h2 class="title m-b-25 has-text-centered">
          Works on Any Phone You Have
        </h2>
        <div class="wrapper">
          <TextImage
            title="Different Scenarios, Different Answers"
            sub-title="Unlike your regular voicemail that only has one answer for all,
                TicMeet has answers for all your callers."
            image="icon1.png"
          />
          <TextImage
            title="Your Time is Valuable"
            sub-title="Stop wasting your time on listening to voice mails and answering spam calls. Get an assistant to save that time and enjoy life!"
            image="icon2.png"
            :inverse="true"
          />
          <TextImage
            title="Beyond an Answering Machine"
            sub-title="From answering with appropriate answers to taking down messages, TicMeet helps you eliminate spam calls and focus more on the calls and messages that matter"
            image="icon3.png"
          />
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="section">
      <div class="container">
        <h2 class="title m-b-60 has-text-centered">
          How Does TicMeet Work?
        </h2>
        <div class="wrapper m-b-60">
          <div class="video">
            <Video />
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL SECTION -->
    <section class="section">
      <div class="container">
        <h2 class="title m-b-60 has-text-centered">
          Everyone Can Have a Personal Assistant
        </h2>
        <div class="wrapper m-b-60">
          <Testimonials />
        </div>
      </div>
    </section>

    <!-- PRICE SECTION -->
    <section class="section">
      <div class="container">
        <h2 class="title m-b-60 has-text-centered">
          Plans and Pricing
        </h2>
        <div class="wrapper m-b-60">
          <Plans />
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="section">
      <div class="container">
        <h2 class="title m-b-60 has-text-centered">
          Your Personal Assistant Awaits
        </h2>
        <div class="wrapper m-b-60 CTA">
          <p class="m-b-45">
            Get started today for free and find out <br />
            what your personal assistant can do for you!
          </p>
          <Button
            tag="router-link"
            to="/login"
            text="Try Now"
            sub-text="It's free"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Button from '~/components/utils/Button.vue'
import TextImage from '~/components/landingPage/TextImage.vue'
import Video from '~/components/landingPage/Video.vue'
import Testimonials from '~/components/landingPage/Testimonials.vue'
import Plans from '~/components/landingPage/Plans.vue'

export default {
  name: 'HomePage',
  components: { Button, TextImage, Video, Testimonials, Plans }
}
</script>

<style lang="scss" scoped>
.subtitle,
h1,
h2,
h3,
h4,
h5,
h6,
span,
p {
  line-height: 1.6;
}

.landing-page {
  font-size: $size-4;
}

.wrapper {
  width: 85%;
  margin: 0 auto;

  @include touch {
    width: 100%;
  }
}

.hero {
  background: $background;

  h1 {
    line-height: 1.3;
  }

  .messager {
    display: flex;
    justify-content: flex-end;
  }
}

.minor-container {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.video {
  width: 70%;
  margin: 0 auto;

  video {
    width: 100%;
  }
}

.CTA {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
