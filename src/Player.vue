<template lang="pug">
  #audio
    plr-display(
      v-bind:currenttime="current"
      v-bind:trackduration="duration"
      v-bind:trackloaded="track"
    )
    plr-controls(
      v-bind:filesloaded="filesLoaded"
      v-bind:showinguploadsmenu="showingUploadsMenu"
      v-bind:isplaying="isPlaying"
      v-bind:volume="_computedVolume"
      v-bind:showingvolumeslider="showingVolumeSlider"
      v-on:toggleuploadsmenu="_toggleUploadsMenu"
      v-on:uploadfiles="_uploadFiles"
      v-on:prevclicked="_prev"
      v-on:playpauseclicked="_playpause"
      v-on:stopclicked="_stop"
      v-on:nextclicked="_next"
      v-on:togglevolumeslider="_toggleVolumeSlider"
    )
    .volume-controls(v-if="showingVolumeSlider")
      .slider
        input(@input="_setVolume" list="tickmarks" :value="volume" type="range" min="0" max="1" step="0.01")
        span {{_computedVolume}}%
</template>

<script>
import _methods from './_methods.js'
import PlrDisplay from './components/PlrDisplay.vue'
import PlrControls from './components/PlrControls.vue'

export default {
  name: 'vPlayer',

  components: {
    'plr-display': PlrDisplay,
    'plr-controls': PlrControls
  },

  data () {
    return {
      isPlaying: false,
      showingUploadsMenu: false,
      showingVolumeSlider: false,
      filesLoaded: false,
      playlist: [],
      index: -1,
      volume: 0.6,
      track: null,
      duration: null,
      current: null,
      timer: null
    }
  },

  methods: _methods,

  computed: {
    _computedVolume () {
      return Math.floor(this.volume * 100)
    }
  },

  created () {
    if (this.playlist.length > 0) {
      this._resetPlaylist()
    }
    console.clear()
    console.log('..vPlr Loaded..')
  },

  destroyed () {
    this._resetPlaylist()
  }
}
</script>

<style lang="sass">
@import 'assets/icomoon/style.css'
@import 'assets/scss/styles.scss'

.disabled
  opacity: 0.3

// hide audio element
audio
  display: none

.icon,
.icon label
  width: 30px
  height: 30px
  display: flex
  font-size: 16px
  align-items: center
  justify-content: center
  cursor: pointer

  &.icon:active,
  &.icon:active label
    transform: scale(1.25)

input[type="range"]
  width: 100%

.slider
  display: flex

  span
    display: inline-block
    margin: 0 8px

</style>
