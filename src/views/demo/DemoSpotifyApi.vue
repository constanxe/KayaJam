<template>
  <div class="p-4">
    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
    <loading
      :active="dataLoading"
      :background-color="theme == 'light' ? 'white' : 'black'"
      color="green"
      loader="bars"
    />

    <h4>Elvis Presley's Albums</h4>
    <!-- Data -->
    <div><li v-for="item in dataItems" :key="item.id">{{ item.name }}</li></div>
    <div ref="errorArtistAlbums"/>
    <!-- Paginator -->
    <nav class="pagination">
      <a
        v-for="page in Math.min(dataPages, 5)" :key="page"
        :class="{ 'active': dataActivePage == page }"
        @click="handlePaginate(page)"
        role="button" v-tooltip="'Page '+page"
      />
    </nav>
  </div>
</template>

<script>
import SpotifyApi from '@/services/spotify-auth'
import Loading from 'vue-loading-overlay'

export default {
  name: 'SpotifyArtistAlbums',
  components: {
    Loading,
  },
  props: {
    artistId: { type: String, default: '43ZHCT0cAZBISjO8DG9PnE' }
  },
  data() {
    return {
      /* can customise */
      dataLimit: 12,
      /* will be updated automatically */
      dataOffset: 0,
      dataLoading: true,
      dataItems: [],
      dataPages: 0,
      dataActivePage: 1,
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

          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = ""
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = "Error occurred. Please try again."
        })
    },
    handlePaginate(page) {
      if (page != this.dataActivePage) {
        this.dataOffset = (page - 1) * this.dataLimit
        this.getArtistAlbums()
        this.dataActivePage = page
      }
    }
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => this.getArtistAlbums(), 800)
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }
  }
}
</script>
