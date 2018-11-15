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
      v-on:toggleuploadsmenu="_toggleUploadsMenu"
      v-on:uploadfiles="_uploadFiles"
      v-on:prevclicked="_prev"
      v-on:playpauseclicked="_playpause"
      v-on:stopclicked="_stop"
      v-on:nextclicked="_next"
    )
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
      filesLoaded: false,
      playlist: [],
      index: -1,
      track: null,
      duration: null,
      current: null,
      timer: null
    }
  },

  methods: _methods,

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

</style>
