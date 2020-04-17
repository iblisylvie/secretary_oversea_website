<template>
  <div class="plans">
    <article class="plan variant">
      <img src="~assets/images/logo_blue.svg" alt="logo" />
      <h4>Free Plan</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus.
      </p>
      <a href="https://google.ca">Get Start</a>
    </article>

    <article class="plan">
      <img src="~assets/images/logo_pure.svg" alt="logo" />
      <h4>Premium Plan</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam fringilla
        tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
        fringilla tempus.
      </p>
      <a href="https://google.ca">Coming Soon</a>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.plans {
  display: flex;
  justify-content: center;
  align-items: center;
}

.plan {
  width: 350px;
  padding: 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #0084ff;
  color: $white;
  font-weight: bold;
  border-radius: 2rem;

  img {
    width: 2.5rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    opacity: 0.7;
  }

  a {
    color: $white;
  }

  &.variant {
    background: #dcf0f9;
    color: $dark;
    margin-right: -1.6rem;

    a {
      background: -webkit-linear-gradient(0deg, #0084ff, #34ddff);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
