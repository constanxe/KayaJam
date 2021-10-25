<template>
  <li>
    <router-link :to="route" class="dropdown-item">
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
  &:hover {
    cursor: pointer;
  }

  &.active,
  &:active {
    background-color: map-get($colors, brand);
  }
}
</style>
