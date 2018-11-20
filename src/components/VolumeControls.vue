<template lang="pug">
.volume-controls(v-if="showingvolumeslider")
  .slider
    input#volumerange(type="range" min="0" max="1" step="0.01"
      @input="$emit('setvolume', $event)"
      @change="$emit('closevolumeslider')"
      :value="volume"
    )
    span {{_computedVolume}}%
</template>

<script>
export default {
  props: [
    'showingvolumeslider',
    'volume'
  ],

  computed: {
    _computedVolume () {
      return Math.floor(this.volume * 100)
    }
  }
}
</script>

<style lang="sass">

.slider
  display: flex

  span
    display: inline-block
    margin: 0 8px

input[type="range"]
  -webkit-appearance: none
  width: 100%
  margin: 10px 0px 10px 5px

  &:focus
    outline: none

  &::-webkit-slider-runnable-track
    width: 100%
    height: 3px
    cursor: pointer
    box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200
    background: rgba(33, 33, 33, 0.7)
    border-radius: 0px
    border: 0px solid #010101

  &::-webkit-slider-thumb
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
    border: 1px solid #000000
    height: 10px
    width: 10px
    border-radius: 50px
    background: #ffffff
    cursor: pointer
    -webkit-appearance: none
    margin-top: -4px
  &:focus::-webkit-slider-runnable-track
    background: rgba(148, 148, 148, 0.7)

  &::-moz-range-track
    width: 100%
    height: 3px
    cursor: pointer
    box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200
    background: rgba(33, 33, 33, 0.7)
    border-radius: 0px
    border: 0px solid #010101

  &::-moz-range-thumb
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
    border: 1px solid #000000
    height: 10px
    width: 10px
    border-radius: 50px
    background: #ffffff
    cursor: pointer

  &::-ms-track
    width: 100%
    height: 3px
    cursor: pointer
    background: transparent
    border-color: transparent
    color: transparent

  &::-ms-fill-lower
    background: rgba(0, 0, 0, 0.7)
    border: 0px solid #010101
    border-radius: 0px
    box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200

  &::-ms-fill-upper
    background: rgba(33, 33, 33, 0.7)
    border: 0px solid #010101
    border-radius: 0px
    box-shadow: 0px 0px 0px #005900, 0px 0px 0px #007200

  &::-ms-thumb
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67)
    border: 1px solid #000000
    height: 10px
    width: 10px
    border-radius: 50px
    background: #ffffff
    cursor: pointer
    height: 3px

  &:focus::-ms-fill-lower
    background: rgba(33, 33, 33, 0.7)

  &:focus::-ms-fill-upper
    background: rgba(148, 148, 148, 0.7)

</style>
