<template>
  <Button :btn-class="'btn--'+network">
    <i :class="'bi bi-'+network"/>
    <slot/>
  </Button>
</template>

<script>
import Button from './Btn.vue'

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
        /* The value must match one of these strings */
        return ["facebook", "twitter", "telegram"].includes(value)
      }
    }
  }
}
</script>
