<template>
  <div class="about p-4">
    <h1>Components</h1>

    <h4>Star</h4>
    5 Stars <Star :star="starsValue" hasdescription/>
    <Star :star="starValue" :maxstars="1" starsize="xs"/> Star
    <hr>

    <h4>Buttons with Features</h4>
    <!-- Modal with button as example trigger-->
    <Button data-bs-target="#exampleModal" data-bs-toggle="modal">Open Modal</Button>
    <Modal id="exampleModal">
      <template #title>Title</template>
      <template #body>Body</template>
      <template #footer>
        <Button btn-class="btn-secondary" data-bs-dismiss="modal">Close</Button>
        <Button data-bs-dismiss="modal">Submit</Button>
      </template>
    </Modal>
    <!-- Dark/Light mode toggle -->
    <Button btn-class="btn__toggle" ref="themeToggle" @click.native="toggleTheme()" style="width:40px;"/>
    <br>
    <!-- Share post to social media platforms -->
    <ButtonSocialShare network="facebook" url="facebook.com"/>
    <ButtonSocialShare network="twitter" title="test"/>
    <ButtonSocialShare network="telegram"/>
    <hr>

    <h4>Standard Buttons</h4>
    <Button>&nbsp;Default&nbsp;</Button>
    <Button btn-class="btn-primary">With Class</Button>
    <br>
    <ButtonSocial network="facebook"></ButtonSocial>
    <a href="https://twitter.com" target="_blank">
      <ButtonSocial network="twitter"></ButtonSocial>
    </a>
    <ButtonSocial network="telegram">&nbsp;Telegram</ButtonSocial>
    <hr>

    <h4>Toggle Buttons</h4>
    <Button btn-class="btn__toggle">Unchosen Toggle</Button>
    <Button btn-class="btn__toggle active">Chosen Toggle</Button>
    <br>
    <Button btn-class="btn__toggle btn--radio">Unchosen Radio</Button>
    <Button btn-class="btn__toggle btn--radio active">Chosen Radio</Button>
  </div>
</template>

<script>
import Star from '../components/Star.vue'
import Modal from '../components/Modal.vue'
import Button from '../components/Btn.vue'
import ButtonSocial from '../components/BtnSocial.vue'
import ButtonSocialShare from '../components/BtnSocialShare.vue'
import { capitalizeFirstLetter } from '../utils'

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
      starValue: 0, starsValue: 0,  /* or the value if rated before */
    }
  },
  mounted() {
    this.theme = this.$store.getters.getTheme

    const toggleBtn = this.$refs.themeToggle.$el
    if (this.theme == "light") toggleBtn.classList.add("active")
    toggleBtn.innerText = capitalizeFirstLetter(this.theme)
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'

      document.documentElement.setAttribute('data-theme', this.theme)
      this.$store.commit('setTheme', this.theme)

      const toggleBtn = this.$refs.themeToggle.$el
      toggleBtn.classList.toggle("active")
      toggleBtn.innerText = capitalizeFirstLetter(this.theme)
    }
  }
}
</script>
