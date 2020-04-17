<template>
  <section class="container">
    <div
      v-video-player:myVideoPlayer="playerOptions"
      class="video-player-box"
      :playsinline="playsinline"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // component options
      playsinline: true,

      // videojs options
      playerOptions: {
        language: 'en',
        fluid: true,
        poster: require('~/assets/images/messager.png'),
        controlBar: {
          children: [
            { name: 'playToggle' },
            { name: 'progressControl' },
            { name: 'durationDisplay' },
            { name: 'volumePanel', inline: false }
          ]
        },
        sources: [
          {
            type: 'video/mp4',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    }
  }
  // mounted() {
  //   console.log('this is current player instance object', this.myVideoPlayer)
  // }
}
</script>

<style lang="scss" scoped>
/deep/ .vjs-big-play-button {
  width: 5rem;
  height: 5rem;
  top: calc(50% - 2.5rem);
  left: calc(50% - 2.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  .vjs-icon-placeholder {
    font-size: 4rem;

    &::before {
      top: 1rem;
    }
  }
}

/deep/ .vjs-has-started .vjs-big-play-button {
  display: none !important;
}

/deep/ .vjs-has-started.vjs-paused .vjs-big-play-button {
  display: flex !important;
}

/deep/ video {
  cursor: pointer;
}
</style>
