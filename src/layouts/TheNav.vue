<template>
  <!-- adapted from: https://startbootstrap.com/template/sb-admin -->
  <div class="sb-nav-fixed">
    <TheTopNav/>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav"><TheSideNav/></div>
      <div id="layoutSidenav_content">
        <main class="p-4"><router-view/></main>
      </div>
    </div>
  </div>
</template>

<script>
import TheTopNav from './TheTopNav.vue'
import TheSideNav from './TheSideNav.vue'

export default {
  name: 'TheNav',
  components: {
    TheTopNav,
    TheSideNav
  }
}
</script>
