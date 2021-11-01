<template>
  <button type="button" class="my-1 btn" :class="btnClass">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    btnClass: { type: String, default: "btn--brand" }
  }
}
</script>
