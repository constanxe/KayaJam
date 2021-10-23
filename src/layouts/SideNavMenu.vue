<template>
  <div>
    <SideNavItem class="collapsed"
      data-bs-toggle="collapse"
      :data-bs-target="'#'+id"
      :icon-class="iconClass"
      aria-expanded="false"
      :aria-controls="id"
    >{{ heading }}<SideNavItemIcon :collapse-icon="true"/>
    </SideNavItem>
    <div :id="id" :aria-labelledby="heading" class="collapse" data-bs-parent="#sidenavAccordion">
      <nav class="sb-sidenav-menu-nested nav">
        <slot/>
      </nav>
    </div>
  </div>
</template>

<script>
import SideNavItemIcon from './SideNavItemIcon.vue'
import SideNavItem from './SideNavItem.vue'

export default {
  name: 'TheSideNav',
  components: {
    SideNavItemIcon,
    SideNavItem
  },
  props: {
    heading: String,
    iconClass: String,
  },
  created() {
    this.id = `collapse${this.heading}`
  }
}
</script>
