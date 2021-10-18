<template>
  <div>
    <h1>getArtistAlbums</h1>
    <h4>{{ artistId }}</h4>
    <ul>
      <li v-for="item in rawData" :key="item.name">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import SpotifyApi from '@/services/spotify-auth'

export default {
  name: 'SpotifyArtistAlbums',
  props: {
    artistId: String,
  },
  data() {
    return {
      rawData: [],
    };
  },
  created() {
    SpotifyApi
      .getArtistAlbums(this.artistId, { limit: 10 })
      .then((data) => {
        // console.log(`=== getArtistAlbums ${this.artistId} ===`)
        // console.log(data)
        this.rawData = data.items
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
