<template>
  <div class="about">
    <h1>demo/test page</h1>

    <h2>components</h2>

    <Rating :star="star"></Rating>

    <div>
      <Button :btnClass="'btn-primary'">Submit</Button>
      <!-- Modal with button as example trigger-->
      <Button data-bs-target="#exampleModal" data-bs-toggle="modal">Open Modal</Button>
      <Modal :id="'exampleModal'">
        <template v-slot:title>
          Title
        </template>
        <template v-slot:body>
          Body
        </template>
        <template v-slot:footer>
          <Button :btnClass="'btn-secondary'" data-bs-dismiss="modal">Close</Button>
          <Button data-bs-dismiss="modal">Submit</Button>
        </template>
      </Modal>
    </div>

    <div>
      <ButtonSocial :network="'facebook'"></ButtonSocial>
      <a href="https://twitter.com" target="_blank">
        <ButtonSocial :network="'twitter'"></ButtonSocial>
      </a>
      <ButtonSocial :network="'telegram'">&nbsp;Telegram</ButtonSocial>
    </div>

    <div>
      <ButtonSocialShare :network="'facebook'" :url="'facebook.com'"></ButtonSocialShare>
      <ButtonSocialShare :network="'twitter'" :title="'test'"></ButtonSocialShare>
      <ButtonSocialShare :network="'telegram'"></ButtonSocialShare>
    </div>
  </div>
</template>

<script>
import Rating from '../components/Rating.vue'
import Button from '../components/Btn.vue'
import Modal from '../components/Modal.vue'
import ButtonSocial from '../components/BtnSocial.vue'
import ButtonSocialShare from '../components/BtnSocialShare.vue'

export default {
  name: 'About',
  components: {
    Rating,
    Button,
    Modal,
    ButtonSocial,
    ButtonSocialShare,
  },
  data() {
    return {
      star: 0,   // or the value if rated before
    }
  }
}
</script>
