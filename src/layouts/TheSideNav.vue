<template>
  <nav class="sb-sidenav accordion" :class="theme == 'light' ? 'sb-sidenav-light' : 'sb-sidenav-dark'" id="sidenavAccordion">
    <custom-scrollbar :settings="scrollbarSettings">
      <div class="sb-sidenav-menu">
        <div class="nav" id="sidebarNav">
          <!-- customise here -->
          <div class="sb-sidenav-menu-heading">Core</div>
          <SideNavItem route="/home" icon-class="bi-house-door-fill">Home</SideNavItem>
          <div class="sb-sidenav-menu-heading">Account</div>
          <SideNavItem route="/profile" icon-class="bi-person-fill">Profile</SideNavItem>
          <SideNavItem route="/settings" icon-class="bi-gear-fill">Settings</SideNavItem>
          <div class="sb-sidenav-menu-heading">Discover</div>
          <SideNavMenu heading="Music" icon-class="bi-music-note-list">
            <SideNavItem route="/music" exact>All</SideNavItem>
            <SideNavItem route="/music/artist" partial-match="artist/">Artists</SideNavItem>
            <SideNavItem route="/music/album" partial-match="album/">Albums</SideNavItem>
          </SideNavMenu>
          <SideNavMenu heading="Users" icon-class="bi-people-fill">
            <SideNavItem route="/chat">Chat</SideNavItem>
          </SideNavMenu>
          <!-- showcase pages -->
          <!-- <div class="sb-sidenav-menu-heading">Demo</div>
          <SideNavItem route="/demo/components" icon-class="bi-house-door-fill">Components</SideNavItem>
          <SideNavItem route="/demo/spotify/api" icon-class="bi-spotify">Spotify API</SideNavItem>
          <SideNavItem route="/demo/spotify/widgets" icon-class="bi-spotify">Spotify Widgets</SideNavItem> -->
        </div>
      </div>
    </custom-scrollbar>
  </nav>
</template>

<script>
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
import CustomScrollbar from 'vue-custom-scrollbar'
import SideNavItem from './SideNavItem.vue'
import SideNavMenu from './SideNavMenu.vue'
import { mapState } from 'vuex'

export default {
  name: 'TheSideNav',
  components: {
    SideNavItem,
    SideNavMenu,
    CustomScrollbar
  },
  data() {
    return {
      /* documentation: https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar */
      scrollbarSettings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  },
  computed: {
    ...mapState(['theme'])
  },
}
</script>

<style lang="scss">
#sidebarNav .router-link-active {
  color: map-get($colors-brands, spotify);
}

.router-link-active-partial {
  color: map-get($colors-brands, spotify) !important;
}
</style>
