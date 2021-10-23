<template>
  <router-link :is="!route ? 'a' : 'router-link'" :to="route" class="nav-link">
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
    iconClass: String
  }
}
</script>
