<template>
  <router-link
    class="nav-link"
    :is="!route ? 'a' : 'router-link'"
    :to="route"
    :exact="exact"
    :class="{'router-link-active-partial': partialMatch ? $route.path.includes(partialMatch) : false}"
  >
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
    partialMatch: String,
    exact: { type: Boolean, default: false },
  }
}
</script>

<style scoped lang="scss">
.nav-link:hover {
  color: var(--color-text) !important;
}
</style>
