<template lang="pug">
#plr-display(v-if="trackloaded")
  .currentTrackTime {{_displayCurrentTime.minutes}}:{{_displayCurrentTime.seconds}}
  .playbackSlider
    input(type="range"
      :value="currenttime || 0"
      min="0"
      :max="trackduration"
      step="0.01"
      @input="$emit('displaycurrenttimechange', $event)"
      @change="$emit('changecurrenttime', $event)"
    )
  .duration-remaining(@click="$emit('toggleremainingdur')")
    .currentTrackTimeRemaining(v-if="displaytimeremaining") - {{_displayTimeRemaining.minutes}}:{{_displayTimeRemaining.seconds}}
    .currentTrackDuration(v-else) {{_displayDuration.minutes}}:{{_displayDuration.seconds}}
</template>

<script>
import _ from 'lodash'

export default {
  props: [
    'currenttime',
    'trackduration',
    'trackloaded',
    'displaytimeremaining'
  ],

  computed: {
    _displayDuration () {
      let minutes = Math.floor(this.trackduration / 60)
      let seconds = Math.floor(this.trackduration - minutes * 60)
      let time = {
        minutes: _.padStart(minutes, 1, '0'),
        seconds: _.padStart(seconds, 2, '0')
      }

      return time
    },

    _displayCurrentTime () {
      let minutes = Math.floor(this.currenttime / 60)
      let seconds = Math.floor(this.currenttime - minutes * 60)
      let time = {
        minutes: _.padStart(minutes, 1, '0'),
        seconds: _.padStart(seconds, 2, '0')
      }

      return time
    },

    _displayTimeRemaining () {
      let remaining = this.trackduration - this.currenttime
      let minutes = Math.floor(remaining / 60)
      let seconds = Math.floor(remaining - minutes * 60)

      let time = {
        minutes: _.padStart(minutes, 1, '0'),
        seconds: _.padStart(seconds, 2, '0')
      }

      return time
    }
  }
}
</script>

<style lang="sass">

#plr-display
  display: flex
  justify-content: space-between
  font-size: 11px
  padding: 0 8px

.currentTrackDuration,
.currentTrackTime
  user-select: none

.playbackSlider
  input[type="range"]
    margin: 0px -25px 10px 0px
    transform: translateY(-2px)

.duration-remaining
  cursor: pointer

</style>
