<template>
  <!-- adapted from: https://startbootstrap.com/template/sb-admin -->
  <div class="sb-nav-fixed">
    <TheTopNav/>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav"><TheSideNav/></div>
      <div id="layoutSidenav_content" @click="closeSidenavIfOverlay">
        <main>
          <router-view :key="$route.fullPath"/> <!-- key to trigger rerender of components (esp when toggling chats)-->
          <iframe :src="`https://open.spotify.com/embed/album/${playerAlbum}`" class="player"
                  width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import TheTopNav from './TheTopNav.vue'
import TheSideNav from './TheSideNav.vue'
import {mapGetters} from 'vuex';

export default {
  name: 'TheNav',
  components: {
    TheTopNav,
    TheSideNav
  },
  methods: {
    closeSidenavIfOverlay(event) {
      /* adapted from: https://stackoverflow.com/questions/58001666/how-to-determine-if-before-is-applied-to-an-element */
      const hasSidenavOverlay = window.getComputedStyle(event.target, "before").getPropertyValue("content") != "none"

      if (hasSidenavOverlay) {
        const bodyClasses = document.body.classList
        const toggledClass = "sb-sidenav-toggled"
        if (bodyClasses.contains(toggledClass)) bodyClasses.remove(toggledClass)
      }
    }
  },
  computed: {
    ...mapGetters({
      playerAlbum: 'getPlayerAlbum',
    }),
  },
}
</script>

<style lang="scss">
#layoutSidenav {
  &_nav {
    height: 100% !important;
  }

  &_content {
    /* meant for unrealistically small widths, but doesn't allow scroll for chat filter buttons */
    // min-width: auto !important;

    main {
      height: 100%;
      padding-bottom: 80px; /* bottom player */
    }
  }
}

.sb-sidenav-toggled #layoutSidenav_content::before {
  cursor: pointer;
}

.player {
  position: fixed;
  bottom: 0;
}
</style>
