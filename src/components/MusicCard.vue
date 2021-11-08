<template>
  <div class="music-card col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-5">
    <router-link :to="'/music/'+type">
      <div class="card-img"><img :src="imgSrc" alt="Card image"></div>
      <div class="card-body">
        <h4 class="card-title tag">{{ title }}</h4>
        <!-- for album typed cards -->
        <p class="card-text" v-if="artistTagName">
          by <router-link to="/music/artist" class="tag">{{ artistTagName }}</router-link>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MusicCard',
  props: {
    type: String,
    title: String,
    imgSrc: String,
    artistTagName: { type: String, required: false }
  }
}
</script>

<style scoped lang="scss">
.music-card {
  display: none; /* Default state for albums/artists is invisible */
  text-align: center;
  text-align: -webkit-center;

  a,
  a:hover {
    color: var(--color-text);
  }
}

.card-img {
  width: 230px;
  height: 230px;
  display: flex;
  overflow: hidden;
  position: relative;
  justify-content: center;
  border: 2px solid var(--color-text);

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
    justify-content: center;
  }
}
</style>
