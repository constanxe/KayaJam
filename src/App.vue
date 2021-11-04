<template>
  <div id="app">
    <TheNav/>
  </div>
</template>

<script>
import TheNav from './layouts/TheNav.vue'

export default {
  name: 'App',
  components: {
    TheNav
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.$store.getters.getTheme)
  }
}
</script>
