<template>
    <ShareNetwork
      :network="this.network"
      :url="this.url"
      :title="this.title"
    >
      <ButtonSocial :network="this.network">
        &nbsp;Share to {{ capitalizeFirstLetter(network) }}
      </ButtonSocial>
    </ShareNetwork>
</template>

<script>
import ButtonSocial from './ButtonSocial.vue'

export default {
  name: 'ButtonSocialShare',
  components: {
    ButtonSocial
  },
  props: {
    network: String,
    url: { type: String, default: "http://spotify.com/" },  // facebook needs a valid URL
    title: { type: String, default: "sick!! check this out" }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
