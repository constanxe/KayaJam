<template>
  <div class="music-card col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-5">
    <router-link :to="'/music/'+type">
      <div class="card-img"><img :src="imgSrc" alt="Card image"></div>
      <div class="card-body">
        <h4 class="card-title">{{ title }}</h4>
        <!-- for album typed cards -->
        <p class="card-text" v-if="artistTagName">
          by <router-link to="/music/artist" class="album-artist-tag">{{ artistTagName }}</router-link>
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

<style lang="scss">
.music-card {
  display: none; /* Default state for albums/artists is invisible */
  justify-content: center;
  text-align: center;
  text-align: -webkit-center;
  color: map-get($colors, text);

  a {
    color: map-get($colors, text);

    &.album-artist-tag:hover {
      color: map-get($colors, brand);
    }
  }
}

.card-img {
  width: 230px;
  height: 230px;
  position: relative;
  overflow: hidden;
  border: 2px solid map-get($colors, text);
  justify-content: center;
  display: flex;

  img {
    display: block;
    margin: auto;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    justify-content: center;
  }
}
</style>
