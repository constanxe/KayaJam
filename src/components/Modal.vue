<template>
  <!-- adapted from: https://getbootstrap.com/docs/5.0/components/modal/ -->
  <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="id+'Label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="id+'Label'">
            <slot name="title"/>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <slot name="body"/>
        </div>
        <div class="modal-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: String
  }
}
</script>

<style scoped lang="scss">
.modal-content {
  background-color: map-get($colors-bg, dark);

  .modal-header, .modal-footer {
    border-color: map-get($colors-bg, light);
  }
}
</style>
