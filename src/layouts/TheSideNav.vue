<template>
  <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <custom-scrollbar :settings="settings">
      <div class="sb-sidenav-menu">
        <div class="nav" id="sidebarNav">
          <!-- customise here -->
          <div class="sb-sidenav-menu-heading">Discover</div>
          <SideNavMenu heading="Music" icon-class="bi-book-fill">
            <SideNavItem route="/music">All</SideNavItem>
            <SideNavItem route="/music/album">Albums</SideNavItem>
            <SideNavItem route="/music/artist">Artists</SideNavItem>
          </SideNavMenu>
          <SideNavMenu heading="Users" icon-class="bi-people-fill">
            <SideNavItem route="/users/a">Placeholder</SideNavItem>
            <SideNavItem route="/users/b">Placeholder</SideNavItem>
          </SideNavMenu>
          <div class="sb-sidenav-menu-heading">Account</div>
          <SideNavItem route="/account/profile" icon-class="bi-person-fill">Profile</SideNavItem>
          <SideNavItem route="/account/settings" icon-class="bi-gear-fill">Settings</SideNavItem>
          <!-- temporary -->
          <div class="sb-sidenav-menu-heading">Core</div>
          <SideNavItem route="/temp/home" icon-class="bi-house-door-fill">Home</SideNavItem>
          <SideNavItem route="/temp/about" icon-class="bi-question-circle-fill">About</SideNavItem>
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

export default {
  name: 'TheSideNav',
  components: {
    SideNavItem,
    SideNavMenu,
    CustomScrollbar
  },
  data() {
    return {
      // reference: https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  }
}
</script>

<style lang="scss">
#sidebarNav {
  a {
    cursor: pointer;

    &.router-link-exact-active {
      color: map-get($colors, brand);
    }
  }
}
</style>
