<template>
  <button type="button" class="my-2 text-white btn" :class="this.btnClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    btnClass: { type: String, default: "bg-brand" }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
