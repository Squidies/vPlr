<template lang="pug">
#plr-controls
  .uploads
    span(v-if="!filesloaded") Upload files
    i.icon.icon-cloud-upload(@click="$emit('toggleuploadsmenu')" title="Upload Files/Folder")
    .upload-options(:class="{show: showinguploadsmenu}")
      .icon.upload-files
        input#uploadFiles(@change="$emit('uploadfiles', $event)" type="file" multiple)
        label(for="uploadFiles")
          i.icon-file-audio-o
      .icon.upload-folder
        input#uploadFolder(@change="$emit('uploadfiles', $event)" type="file" webkitdirectory directory multiple)
        label(for="uploadFolder")
          i.icon-folder
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
    //- .icon.volume-controls(style="display: none")
</template>

<script>
export default {
  props: [
    'filesloaded',
    'showinguploadsmenu',
    'isplaying'
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

</style>
