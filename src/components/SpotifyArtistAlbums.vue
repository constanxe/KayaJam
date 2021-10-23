<template>
  <div>
    <h1>getArtistAlbums</h1>
    <h4>{{ artistId }}</h4>
    <ul><li v-for="item in rawData" :key="item.name">{{ item.name }}</li></ul>
  </div>
</template>

<script>
import SpotifyApi from '@/services/spotify-auth'

export default {
  name: 'SpotifyArtistAlbums',
  props: {
    artistId: String
  },
  data() {
    return {
      rawData: []
    }
  },
  created() {
    setTimeout(() => {
      // console.log(`=== getArtistAlbums ${this.artistId} ===`)
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtistAlbums(this.artistId, { limit: 10 })
        .then((data) => {
          // console.log(data)
          this.rawData = data.items
        })
        .catch((error) => {
          console.log(error.responseText)
        })
    }, 800)
  }
}
</script>
