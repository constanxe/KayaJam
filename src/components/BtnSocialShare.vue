<template>
  <!-- package used: https://github.com/nicolasbeauvais/vue-social-sharing -->
  <ShareNetwork :network="network" :url="url" :title="title">
    <ButtonSocial :network="network">
      &nbsp;Share to {{ capitalizeFirstLetter(network) }}
    </ButtonSocial>
  </ShareNetwork>
</template>

<script>
import ButtonSocial from './BtnSocial.vue'

export default {
  name: 'ButtonSocialShare',
  components: {
    ButtonSocial
  },
  props: {
    network: String,
    url: { type: String, default: "http://spotify.com/" },  /* facebook needs a valid URL */
    title: { type: String, default: "sick!! check this out" }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
