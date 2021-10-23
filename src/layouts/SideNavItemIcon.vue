<template>
  <div :class="collapseIcon ? 'sb-sidenav-collapse-arrow' : 'sb-nav-link-icon'">
    <i class="bi" :class="collapseIcon ? 'bi-caret-down-fill' : iconClass"/>
  </div>
</template>

<script>
export default {
  name: 'SideNavItemIcon',
  props: {
    iconClass: String,
    collapseIcon: { type: Boolean, default: false }
  }
}
</script>
