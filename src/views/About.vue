<template>
  <div class="about">
    <h1>demo/test page</h1>

    <h2>components</h2>

    <Rating :star="this.star"></Rating>

    <div>
      <Button>Submit</Button>
      <Button :btnClass="'btn-primary'">Submit</Button>
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
import Button from '../components/Button.vue'
import ButtonSocial from '../components/ButtonSocial.vue'
import ButtonSocialShare from '../components/ButtonSocialShare.vue'

export default {
  name: 'About',
  components: {
    Rating,
    Button,
    ButtonSocial,
    ButtonSocialShare
  },
  data() {
    return {
      star: 0,   // or the value if rated before
    }
  }
}
</script>
