<template>
  <div class="about">
    <h1>demo/test page</h1>

    <h2>components</h2>

    <div><Star :star="starValue" :maxstars="1" starsize="xs"/> Star</div>
    <div>5 Stars <Star :star="starsValue" hasdescription/></div>

    <div>
      <Button btnClass="btn-primary">Submit</Button>
      <!-- Modal with button as example trigger-->
      <Button data-bs-target="#exampleModal" data-bs-toggle="modal">Open Modal</Button>
      <Modal id="exampleModal">
        <template #title>Title</template>
        <template #body>Body</template>
        <template #footer>
          <Button btnClass="btn-secondary" data-bs-dismiss="modal">Close</Button>
          <Button data-bs-dismiss="modal">Submit</Button>
        </template>
      </Modal>
    </div>

    <div>
      <ButtonSocial network="facebook"></ButtonSocial>
      <a href="https://twitter.com" target="_blank">
        <ButtonSocial network="twitter"></ButtonSocial>
      </a>
      <ButtonSocial network="telegram">&nbsp;Telegram</ButtonSocial>
    </div>

    <div>
      <ButtonSocialShare network="facebook" url="facebook.com"/>
      <ButtonSocialShare network="twitter" title="test"/>
      <ButtonSocialShare network="telegram"/>
    </div>
  </div>
</template>

<script>
import Star from '../components/Star.vue'
import Modal from '../components/Modal.vue'
import Button from '../components/Btn.vue'
import ButtonSocial from '../components/BtnSocial.vue'
import ButtonSocialShare from '../components/BtnSocialShare.vue'

export default {
  name: 'About',
  components: {
    Star,
    Modal,
    Button,
    ButtonSocial,
    ButtonSocialShare,
  },
  data() {
    return {
      starValue: 0, starsValue: 0,  // or the value if rated before
    }
  }
}
</script>
