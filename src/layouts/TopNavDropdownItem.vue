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
