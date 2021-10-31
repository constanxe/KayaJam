<template>
  <li>
    <router-link :to="route" class="dropdown-item" role="button">
      <slot/>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'TopNavDropdownItem',
  props: {
    route: String
  }
}
</script>

<style scoped lang="scss">
.dropdown-item {
  &.active,
  &:active {
    background-color: map-get($colors, brand);
  }
}
</style>
