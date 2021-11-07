<template>
  <router-link :is="!route ? 'a' : 'router-link'" :to="route" class="nav-link" :exact="exact">
    <SideNavItemIcon v-if="iconClass" :icon-class="iconClass"/>
    <slot/>
  </router-link>
</template>

<script>
import SideNavItemIcon from './SideNavItemIcon.vue'

export default {
  name: 'SideNavItem',
  components: {
    SideNavItemIcon
  },
  props: {
    route: String,
    iconClass: String,
    exact: { type: Boolean, default: false }
  }
}
</script>

<style scoped lang="scss">
.nav-link:hover {
  color: var(--color-text) !important;
}
</style>
