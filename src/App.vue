<template>
  <div id="app">
    <!-- <Login v-if="$route.name == 'Login'"/>
    <TheNav v-else/> -->
    <TheNav/>
  </div>
</template>

<script>
import TheNav from '@/layouts/TheNav.vue'
// import Login from '@/views/Login.vue'
import { toastedOptions } from '@/utils'

export default {
  name: 'App',
  components: {
    TheNav,
    // Login
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.$store.getters.getTheme)
    this.$toasted.success(`Login successful. Welcome and have fun discovering new music & people!`, toastedOptions)
    this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
  }
}
</script>
