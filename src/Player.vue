<template lang="pug">
  #audio(ref="vPlr")
    .vPlr
      plr-display(
        v-bind:currenttime="current"
        v-bind:trackduration="duration"
        v-bind:trackloaded="track"
        v-bind:showingremaining="showingRemaining"
        v-on:displaycurrenttimechange="_displayCurrentTimeChange"
        v-on:changecurrenttime="_changeCurrentTime"
        v-on:toggleremainingduration="_toggleRemainingDuration"
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
      volume-controls(
        v-bind:showingvolumeslider="showingVolumeSlider"
        v-bind:volume="volume"
        v-on:setvolume="_setVolume"
        v-on:closevolumemenu="_toggleVolumeSlider"
      )
    .logo
      span Powered by
      img(src="./assets/mp3.png")
</template>

<script>
import _methods from './_methods.js'
import PlrDisplay from './components/PlrDisplay.vue'
import PlrControls from './components/PlrControls.vue'
import VolumeControls from './components/VolumeControls.vue'

export default {
  name: 'vPlayer',

  components: {
    'plr-display': PlrDisplay,
    'plr-controls': PlrControls,
    'volume-controls': VolumeControls
  },

  data () {
    return {
      isPlaying: false,
      showingUploadsMenu: false,
      showingVolumeSlider: false,
      filesLoaded: false,
      showingRemaining: localStorage.getItem('vPlr_showingRemaining') || true,
      playlist: [],
      index: -1,
      volume: localStorage.getItem('vPlr_volume') || 0.6,
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

// hide audio element
audio
  display: none

img
  width: 100%
  max-width: 100%

#audio
  display: flex

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

.logo
  max-width: 55px
  font-size: 8px
</style>
