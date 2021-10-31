<template>
  <div>
    <!-- Header -->
    <h1>getArtistAlbums</h1>
    <h4>{{ artistId }}</h4>
    <!-- Data -->
    <ul><li v-for="item in dataItems" :key="item.id">{{ item.name }}</li></ul>
    <!-- Paginator -->
    <nav class="pagination">
      <a
        v-for="page in Math.min(dataPages, 5)" :key="page"
        :class="{ 'active': dataActivePage == page }"
        @click="handlePaginate(page)"
        role="button"
      />
    </nav>
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
      /* can customise */
      dataLimit: 12,
      /* will be updated automatically by paginator */
      dataOffset: 0,
      dataItems: [],
      dataPages: 0,
      dataActivePage: 1
    }
  },
  methods: {
    getArtistAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtistAlbums(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          // console.log(data)
          this.dataItems = data.items
          this.dataPages = Math.ceil(data.total / this.dataLimit)
        })
        .catch((error) => {
          console.log(error.responseText)
        })
    },
    handlePaginate(page) {
      this.dataOffset = page * this.dataLimit
      this.getArtistAlbums()
      this.dataActivePage = page
    }
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => this.getArtistAlbums(), 800)
  }
}
</script>
