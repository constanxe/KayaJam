<template>
  <!-- package used: https://github.com/nicolasbeauvais/vue-social-sharing -->
  <ShareNetwork :network="network" :url="url" :title="title">
    <ButtonSocial :network="network">
      &nbsp;{{ capitalizeFirstLetter(network) }}
    </ButtonSocial>
  </ShareNetwork>
</template>

<script>
import ButtonSocial from './BtnSocial.vue'
import { capitalizeFirstLetter } from '@/utils'

export default {
  name: 'ButtonSocialShare',
  components: {
    ButtonSocial
  },
  props: {
    network: String,
    url: String,
    title: { type: String, default: "Check this out!" }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string)
    }
  }
}
</script>
