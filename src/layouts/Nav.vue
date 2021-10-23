<template>
  <!-- adapted from: https://startbootstrap.com/template/sb-admin -->
  <div class="sb-nav-fixed">
    <TopNav></TopNav>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <SideNav></SideNav>
      </div>
      <div id="layoutSidenav_content">
        <main class="p-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from './TopNav.vue'
import SideNav from './SideNav.vue'

export default {
  name: 'Nav',
  components: {
    TopNav,
    SideNav
  }
}
</script>
