// adapted from: https://github.com/Jebasuthan/vue-star-rating

<template>
  <AwesomeVueStarRating
    :star="star"
    :starsize="starsize"
    :maxstars="maxstars"
    :disabled="disabled"
    :hasresults="hasresults"
    :hasdescription="hasdescription"
    :ratingdescription="ratingdescription"
  />
</template>

<script>
import AwesomeVueStarRating from 'awesome-vue-star-rating'

export default {
  name: 'Rating',
  components: {
    AwesomeVueStarRating
  },
  props: {
    star: { type: Number, default: 0 }
  },
  data() {
    return {
      ratingdescription: [
        { text: 'Poor', class: 'star-poor' },
        { text: 'Below Average', class: 'star-belowAverage' },
        { text: 'Average', class: 'star-average' },
        { text: 'Good', class: 'star-good' },
        { text: 'Excellent', class: 'star-excellent' }
      ],
      hasdescription: true,
      hasresults: false,
      starsize: 'lg', //[xs,lg,1x,2x,3x,4x,5x,6x,7x,8x,9x,10x],
      maxstars: 5,
      disabled: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
