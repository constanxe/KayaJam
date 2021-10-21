<template>
  <div class="about">
    <h1>demo/test page</h1>

    <h2>components</h2>

    <Rating :star="this.star"></Rating>

    <Button>Submit</Button>
    <Button :btnClass="'btn-primary'">Submit</Button>

    <ButtonShare :network="'facebook'" :url="'facebook.com'"></ButtonShare>
    <ButtonShare :network="'twitter'" :title="'test'"></ButtonShare>
    <ButtonShare :network="'telegram'"></ButtonShare>
    <ButtonShare :network="'test'"></ButtonShare> <!--not shown due to validator-->
  </div>
</template>

<script>
import Rating from '../components/Rating.vue'
import Button from '../components/Button.vue'
import ButtonShare from '../components/ButtonShare.vue'

export default {
  name: 'about',
  components: {
    Rating,
    Button,
    ButtonShare
  },
  data() {
    return {
      star: 0,   // or the value if rated before
    }
  }
}
</script>
