<template>
  <nav class="sb-sidenav accordion" :class="theme == 'light' ? 'sb-sidenav-light' : 'sb-sidenav-dark'" id="sidenavAccordion">
    <custom-scrollbar :settings="scrollbarSettings">
      <div class="sb-sidenav-menu">
        <div class="nav" id="sidebarNav">
          <!-- customise here -->
          <div class="sb-sidenav-menu-heading">Discover</div>
          <SideNavMenu heading="Music" icon-class="bi-music-note-list">
            <SideNavItem route="/music" exact>All</SideNavItem>
            <SideNavItem route="/music/album">Albums</SideNavItem>
            <SideNavItem route="/music/artist">Artists</SideNavItem>
          </SideNavMenu>
          <SideNavMenu heading="Users" icon-class="bi-people-fill">
            <SideNavItem route="/chat">Chat</SideNavItem>
          </SideNavMenu>
          <div class="sb-sidenav-menu-heading">Account</div>
          <SideNavItem route="/profile" icon-class="bi-person-fill">Profile</SideNavItem>
          <SideNavItem route="/account/settings" icon-class="bi-gear-fill">Settings</SideNavItem>
          <!-- showcase pages -->
          <div class="sb-sidenav-menu-heading">Demo</div>
          <SideNavItem route="/demo/components" icon-class="bi-house-door-fill">Components</SideNavItem>
          <SideNavItem route="/demo/spotify/api" icon-class="bi-spotify">Spotify API</SideNavItem>
          <SideNavItem route="/demo/spotify/widgets" icon-class="bi-spotify">Spotify Widgets</SideNavItem>
        </div>
      </div>
    </custom-scrollbar>
  </nav>
</template>

<script>
import SideNavItem from './SideNavItem.vue'
import SideNavMenu from './SideNavMenu.vue'
import CustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
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
#sidebarNav a.router-link-active {
  color: map-get($colors-brands, spotify);
}
</style>
