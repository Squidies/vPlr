<template lang="pug">
#plr-controls
  .uploads
    span(v-if="!filesloaded") Upload files
    i.icon.icon-cloud-upload(@click="$emit('toggleuploadsmenu')" title="Upload Files/Folder")
    .upload-options(:class="{show: showinguploadsmenu}")
      .upload-files
        input#uploadFiles(@change="$emit('uploadfiles', $event)" type="file" multiple)
        label(for="uploadFiles")
          i.icon-file-audio-o
          span Files
      .upload-folder
        input#uploadFolder(@change="$emit('uploadfiles', $event)" type="file" webkitdirectory directory multiple)
        label(for="uploadFolder")
          i.icon-folder
          span Folder
  .controls(v-if="filesloaded")
    .icon.previous(@click="$emit('prevclicked')")
      i.icon-backward
    .icon.playpause(@click="$emit('playpauseclicked')")
      i.icon-play(v-if="!isplaying")
      i.icon-pause(v-else)
    .icon.stop(@click="$emit('stopclicked')")
      i.icon-stop
    .icon.next(@click="$emit('nextclicked')")
      i.icon-forward
    .icon(@click="$emit('togglevolumeslider')")
      i.icon-volume-off(v-if="volume < 33")
      i.icon-volume-down(v-if="volume < 66 && volume >= 33")
      i.icon-volume-up(v-if="volume >= 66")
</template>

<script>
export default {
  props: [
    'filesloaded',
    'showinguploadsmenu',
    'isplaying',
    'volume',
    'showingvolumeslider'
  ]
}
</script>

<style lang="sass">

#plr-controls
  display: flex
  max-height: 30px

.controls
  display: flex

.uploads

  input
    display: none

  label
    cursor: pointer

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

    & > div
      display: flex
      margin-left: 12px
      margin-top: 4px

    span
      margin-left: 8px
      top: 0

</style>
