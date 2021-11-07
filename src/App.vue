<template>
  <div id="app">
    <!-- <Login v-if="$route.name == 'Login'"/>
    <TheNav v-else/> -->
    <TheNav/>
  </div>
</template>

<script>
import TheNav from './layouts/TheNav.vue'
// import Login from './views/Login.vue'

export default {
  name: 'App',
  components: {
    TheNav,
    // Login
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.$store.getters.getTheme)
  }
}
</script>
