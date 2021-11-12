<template>
  <div class="music-card col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-5">
    <router-link :to="`/${item.type}/${item.id}`">
      <div class="card-img"><img :src="item.images[0].url" alt="Card image"></div>
      <div class="card-body">
        <h4 class="card-title tag">{{ item.name }}</h4>
        <!-- for album typed cards -->
        <p class="card-text" v-if="item.type == 'album'">
          by <router-link :to="'/artist/'+artistTag.id" class="tag">{{ artistTag.name }}</router-link>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MusicCard',
  props: {
    item: Object,
    artistTag: { type: Object, required: false }
  }
}
</script>

<style scoped lang="scss">
.music-card {
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
