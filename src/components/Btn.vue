<template>
  <button type="button" class="my-2 text-white btn" :class="btnClass">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    btnClass: { type: String, default: "bg_brand" }
  }
}
</script>
