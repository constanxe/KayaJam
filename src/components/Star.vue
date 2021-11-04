<template>
  <!-- adapted from: https://github.com/Jebasuthan/vue-star-rating -->
  <AwesomeVueStarRating
    :star="star"
    :starsize="starsize"
    :maxstars="maxstars"
    :disabled="disabled"
    :hasresults="hasresults"
    :hasdescription="hasdescription"
    :ratingdescription="ratingdescription"
    :class="hasdescription ? 'with-desc' : 'hide-desc'"
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
    star: { type: Number, default: 0 },
    maxstars: { type: Number, default: 5 },
    hasdescription: { type: Boolean, default: false },
    starsize: {
      type: String,
      default: 'lg',
      /* adapted from: https://v3.vuejs.org/guide/component-props.html#prop-validation */
      validator(value) {
        /* The value must match one of these strings */
        return ['xs','lg','1x','2x','3x','4x','5x','6x','7x','8x','9x','10x'].includes(value)
      }
    }
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
      hasresults: false,
      disabled: false
    }
  }
}
</script>

<style lang="scss">
.rating {
  width: fit-content;
}

.hide-desc {
  display: inline-block;

  .nostar_desc {
    display: none !important;
  }
}

.with-desc {
  /* keep stars to 1 line */
  .star {
    display: contents !important;
  }
}
</style>
