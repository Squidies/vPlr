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

  methods: {
    // UI Methods
    _toggleUploadsMenu () {
      this.showingUploadsMenu = !this.showingUploadsMenu
    },

    _togglePlayPause () {
      this.isPlaying = !this.isPlaying
    },

    // Player Methods
    _resetPlaylist () {
      clearInterval(this.timer)
      this._stop()
      this.isPlaying = false
      this.showingUploadsMenu = false
      this.filesLoaded = false
      this.playlist = []
      this.index = -1
      this.track = null
      this.duration = null
      this.current = null
      this.timer = null
    },

    _resetTracks () {
      clearInterval(this.timer)
      this._stop()
      this.isPlaying = false
      this.showingUploadsMenu = false
      this.index = -1
      this.track = null
      this.duration = null
      this.current = null
      this.timer = null
    },

    _uploadFiles (e) {
      if (this.playlist.length > 0) {
        this._resetPlaylist()
      }

      // load files
      this.filesLoaded = true
      this.showingUploadsMenu = false

      let files = [...e.target.files]

      // create track files and push to playlist
      files.forEach(file => {
        let audio = new Audio(URL.createObjectURL(file))
        let track = {
          name: file.name,
          audio: audio
        }

        this.playlist.push(track)
      })

      this.index++
      this._loadtrack()
    },

    _loadtrack () {
      this.track = this.playlist[this.index]
    },

    _playpause () {
      if (this.index === -1 && this.filesLoaded) {
        ++this.index
        this._loadtrack()
      }

      if (this.isPlaying) {
        this._pause()
      } else {
        this._play()
      }

      this._togglePlayPause()
    },

    _play () {
      this.duration = this.track.audio.duration
      this.track.audio.play()
      this._currentTime()
    },

    _pause () {
      this.track.audio.pause()
    },

    _stop () {
      this.track.audio.pause()
      this.track.audio.currentTime = 0
      this._togglePlayPause()
    },

    _next () {
      if (this.index === -1 && this.playlist) {
        ++this.index
        this._loadtrack()
        this._play()
        this.isPlaying = true
      } else if (this.index < this.playlist.length - 1) {
        this._pause()
        this._resetTimer()
        this.track = null
        ++this.index
        this._loadtrack()
        this._play()
        this.isPlaying = true
      } else {
        this._resetTimer()
        this._resetTracks()
      }
    },

    _prev () {
      if (this.index === 0) {
        this._pause()
        this.isPlaying = false
        this.track.audio.currentTime = 0
      } else {
        this._pause()
        this.track.audio.currentTime = 0
        this.track = null
        --this.index
        this._loadtrack()
        this._play()
      }
    },

    _currentTime () {
      if (this.track) {
        if (this.current === null) {
          this.current = 0
        }

        this.timer = setInterval(current => {
          this.current = this.track.audio.currentTime
          this._timeCheck()
        }, 1000)
      }
    },

    _timeCheck () {
      if (this.current === this.duration) {
        this._next()
      }
    },

    _resetTimer () {
      this.track.audio.currentTime = 0
      clearInterval(this.timer)
      this.timer = null
      this.isPlaying = false
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

</style>
