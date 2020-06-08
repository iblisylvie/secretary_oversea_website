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
        preload: 'auto',
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
            src: require('~/assets/images/HeyTico-compressed.mp4')
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .video-js:hover {
  .vjs-big-play-button {
    background: $secondary;
  }
}

/deep/ .vjs-big-play-button {
  width: 5rem;
  height: 5rem;
  top: calc(50% - 2.5rem);
  left: calc(50% - 2.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: $secondary;
  border: none;

  .vjs-icon-placeholder {
    font-size: 4rem;

    &::before {
      top: 1rem;

      @include mobile {
        top: 0.7rem;
      }
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
