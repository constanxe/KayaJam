<template>
  <button type="button" class="my-2 btn" :class="this.btnClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    btnClass: { type: String, default: "btn-success" }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
