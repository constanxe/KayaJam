<template>
  <!-- adapted from: https://startbootstrap.com/template/sb-admin -->
  <div class="sb-nav-fixed">
    <TheTopNav/>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav"><TheSideNav/></div>
      <div id="layoutSidenav_content" @click="closeSidenavIfOverlay">
        <main><router-view/></main>
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
  },
  methods: {
    closeSidenavIfOverlay(e) {
      const hasSidenavOverlay = window.getComputedStyle(e.target, "before").getPropertyValue("content") != "none"
      if (hasSidenavOverlay) {
        const bodyClasses = document.body.classList
        const toggledClass = "sb-sidenav-toggled"
        if (bodyClasses.contains(toggledClass)) bodyClasses.remove(toggledClass)
      }
    }
  }
}
</script>

<style lang="scss">
#layoutSidenav {
  &_nav {
    height: 100% !important;
  }

  &_content {
    min-width: auto !important;

    main {
      height: 100%;
    }
  }
}

.sb-sidenav-toggled #layoutSidenav_content::before {
  cursor: pointer;
}
</style>
