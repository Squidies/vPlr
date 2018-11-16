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
        input#volumerange(type="range" min="0" max="1" step="0.01"
          @input="_setVolume"
          :value="volume"
        )
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
      timer: null,
      rangeflag: false
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

.slider
  display: flex

  span
    display: inline-block
    margin: 0 8px

input[type=range]
  -webkit-appearance: none
  width: 100%
  margin: 5px 0

input[type=range]:focus
  outline: none

input[type=range]::-webkit-slider-runnable-track
  width: 100%
  height: 3.1px
  cursor: pointer
  box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200
  background: rgba(33, 33, 33, 0.7)
  border-radius: 0px
  border: 0px solid #010101

input[type=range]::-webkit-slider-thumb
  box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
  border: 0.1px solid #000000
  height: 10px
  width: 10px
  border-radius: 50px
  background: #ffffff
  cursor: pointer
  -webkit-appearance: none
  margin-top: -3.45px

input[type=range]:focus::-webkit-slider-runnable-track
  // background: rgba(148, 148, 148, 0.7)

input[type=range]::-moz-range-track
  width: 100%
  height: 3.1px
  cursor: pointer
  box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200
  background: rgba(33, 33, 33, 0.7)
  border-radius: 0px
  border: 0px solid #010101

input[type=range]::-moz-range-thumb
  box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
  border: 0.1px solid #000000
  height: 10px
  width: 10px
  border-radius: 50px
  background: #ffffff
  cursor: pointer

input[type=range]::-ms-track
  width: 100%
  height: 3.1px
  cursor: pointer
  background: transparent
  border-color: transparent
  color: transparent

input[type=range]::-ms-fill-lower
  background: rgba(0, 0, 0, 0.7)
  border: 0px solid #010101
  border-radius: 0px
  box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200

input[type=range]::-ms-fill-upper
  background: rgba(33, 33, 33, 0.7)
  border: 0px solid #010101
  border-radius: 0px
  box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200

input[type=range]::-ms-thumb
  box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
  border: 0.1px solid #000000
  height: 10px
  width: 10px
  border-radius: 50px
  background: #ffffff
  cursor: pointer
  height: 3.1px

input[type=range]:focus::-ms-fill-lower
  background: rgba(33, 33, 33, 0.7)

input[type=range]:focus::-ms-fill-upper
  background: rgba(148, 148, 148, 0.7)

</style>
