<template lang="pug">
  #audio
    .menu-controls(v-if="track")
      .currentTrackTime {{_displayCurrentTime.minutes}}:{{_displayCurrentTime.seconds}}
      .currentTrackDuration {{_displayDuration.minutes}}:{{_displayDuration.seconds}}
    #plr-controls
      .uploads
        span(v-if="playlist.length === 0") Upload files
        i.icon.icon-cloud-upload(@click="_toggleUploadsMenu" title="Upload Files/Folder")
        .upload-options(:class="{show: showingUploadsMenu}")
          .icon.upload-files
            input#uploadFiles(@change="_uploadFiles($event)" type="file" multiple)
            label(for="uploadFiles")
              i.icon-file-audio-o
          .icon.upload-folder
            input#uploadFolder(@change="_uploadFiles($event)" type="file" webkitdirectory directory multiple)
            label(for="uploadFolder")
              i.icon-folder
      .controls(v-if="filesLoaded")
        .icon.previous.disabled(@click="_prev()")
          i.icon-backward
        .icon.playpause(@click="_playpause")
          i.icon-play(v-if="!isPlaying")
          i.icon-pause(v-else)
        .icon.stop(@click="_stop")
          i.icon-stop
        .icon.next(@click="_next")
          i.icon-forward
        .icon.volume-controls(style="display: none")
    #plr-menu
</template>

<script>
import _ from 'lodash'

export default {
  name: 'vPlayer',

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

  computed: {
    _displayDuration () {
      let minutes = Math.floor(this.duration / 60)
      let seconds = Math.floor(this.duration - minutes * 60)
      let time = {
        minutes: _.padStart(minutes, 1, '0'),
        seconds: _.padStart(seconds, 2, '0')
      }

      return time
    },

    _displayCurrentTime () {
      let minutes = Math.floor(this.current / 60)
      let seconds = Math.floor(this.current - minutes * 60)
      let time = {
        minutes: _.padStart(minutes, 1, '0'),
        seconds: _.padStart(seconds, 2, '0')
      }

      return time
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

#plr-controls
  display: flex
  max-height: 30px

.controls
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

.uploads

  input
    display: none

  span
    display: inline-block
    position: relative
    float: right
    top: 6px

  .upload-options
    height: 0
    opacity: 0
    overflow: hidden
    transition: all 300ms linear

    &.show
      height: 100%
      opacity: 1
      overflow: visible

.menu-controls
  display: flex
  justify-content: space-between
  font-size: 11px
  padding: 0 8px

</style>
