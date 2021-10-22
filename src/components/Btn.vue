<template>
  <button type="button" class="my-2 text-white btn" :class="btnClass">
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
