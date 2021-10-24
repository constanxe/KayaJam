<template>
  <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
      <div class="nav" id="sidebarNav">

        <!-- customise here -->
        <div class="sb-sidenav-menu-heading">Core</div>
        <SideNavItem route="/home" icon-class="bi-house-door-fill">Home</SideNavItem>
        <SideNavItem route="/about" icon-class="bi-question-circle-fill">About</SideNavItem>
        <div class="sb-sidenav-menu-heading">Discover</div>
        <SideNavMenu heading="Users" icon-class="bi-people-fill">
          <SideNavItem route="/test1a">Placeholder</SideNavItem>
          <SideNavItem route="/test1b">Placeholder</SideNavItem>
        </SideNavMenu>
        <SideNavMenu heading="Music" icon-class="bi-book-fill">
          <SideNavItem route="/music">Album</SideNavItem>
          <SideNavItem route="/music">Artists</SideNavItem>
        </SideNavMenu>

      </div>
    </div>
  </nav>
</template>

<script>
import SideNavItem from './SideNavItem.vue'
import SideNavMenu from './SideNavMenu.vue'

export default {
  name: 'TheSideNav',
  components: {
    SideNavItem,
    SideNavMenu
  }
}
</script>

<style lang="scss">
#sidebarNav {
  a {
    cursor: pointer;

    &:hover {
      color: map-get($colors, text);
    }

    &.router-link-exact-active {
      color: map-get($colors, brand);
    }
  }
}
</style>
