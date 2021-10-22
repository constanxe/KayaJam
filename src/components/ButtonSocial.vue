<template>
  <Button :btnClass="this.btnClass">
    <i :class="this.iconClass"></i>
    <slot></slot>
  </Button>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'ButtonSocial',
  components: {
    Button
  },
  props: {
    network: {
      type: String,
      /* adapted from: https://v3.vuejs.org/guide/component-props.html#prop-validation */
      validator(value) {
        // The value must match one of these strings
        return ["facebook", "twitter", "telegram"].includes(value)
      }
    }
  },
  computed: {
    iconClass() {
      return `bi bi-${this.network}`
    },
    btnClass() {
      return `bg-${this.network}`
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
