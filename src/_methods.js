const _plrmethods = {
  // UI Methods
  _toggleUploadsMenu () {
    if (this.showingVolumeSlider) {
      this.showingVolumeSlider = false
    }

    this.showingUploadsMenu = !this.showingUploadsMenu
  },

  _togglePlayPause () {
    this.isPlaying = !this.isPlaying
  },

  _toggleVolumeSlider () {
    if (this.showingUploadsMenu) {
      this.showingUploadsMenu = false
    }

    this.showingVolumeSlider = !this.showingVolumeSlider
  },

  _toggleRemainingDuration () {
    this.displayTimeRemaining = !this.displayTimeRemaining
    localStorage.setItem('vPlr_remaining-duration', this.displayTimeRemaining)
  },

  // Player Methods
  _resetPlaylist () {
    clearInterval(this.timer)
    this._stop()
    this.isPlaying = false
    this.showingUploadsMenu = false
    this.filesLoaded = false
    this.showingVolumeSlider = false
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

    // load the first track for playback
    this.index++
    this._loadtrack()
  },

  _loadtrack () {
    this.track = this.playlist[this.index]
    this.track.audio.volume = this.volume
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
    if (this.track) {
      this.track.audio.pause()
      this.track.audio.currentTime = 0
      this._togglePlayPause()
    }
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

  _setVolume (e) {
    this.volume = e.target.value
    this.track.audio.volume = this.volume
    localStorage.setItem('vPlr_volume', this.volume)
  },

  _displayCurrentTimeChange (e) {
    let time = e.target.value
    this.current = time
  },

  _changeCurrentTime (e) {
    let time = e.target.value
    this.current = this.track.audio.currentTime = time
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
    clearInterval(this.timer)
    this.current = this.track.audio.currentTime = 0
    this.timer = null
    this.isPlaying = false
  }
}

export default _plrmethods
