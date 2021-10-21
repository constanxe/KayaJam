<template>
  <Button :btnClass="this.btnClass">
    <ShareNetwork
      :network="this.network"
      :url="this.url"
      :title="this.title"
    >
      <i :class="this.iconClass"></i>
      &nbsp;Share to {{ capitalizeFirstLetter(network) }}
    </ShareNetwork>
  </Button>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Rating',
  components: {
    Button
  },
  props: {
    network: {
      type: String,
      validator(value) {
        // The value must match one of these strings
        return ["facebook", "twitter", "telegram"].includes(value)
      }
    },
    url: { type: String, default: "http://spotify.com/" },  // facebook needs a valid URL
    title: { type: String, default: "sick!! check this out" }
  },
  computed: {
    iconClass() {
      return `bi bi-${this.network}`
    },
    btnClass() {
      return `bg-${this.network}`
    }
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
a, a:hover {
  color: map-get($colors, text);
}
</style>
