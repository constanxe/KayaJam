<template>
  <div>
    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
    <loading
      :active="dataLoading"
      :background-color="theme == 'light' ? 'white' : 'black'"
      color="green"
      loader="bars"
    />

    <h1>Artist: {{ artistName }}</h1>

    <h4>Albums</h4>
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
    <hr>

    <h4>Artist</h4>
    <router-link :to="'/chat/artist:'+artistName"><Button v-tooltip="'Chat with others about this artist'">Discussion</Button></router-link><br>
    <!-- [Spotify widgets] reference: https://developer.spotify.com/documentation/widgets -->
    <!-- Follow: Detail view -->
    <iframe :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=detail&theme='+theme"
            width="210" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
    <iframe :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=detail&theme='+theme+'&show-count=0'"
            width="168" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
    <!-- Follow: Basic View -->
    <iframe :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=basic&theme='+theme+'&show-count=0'"
            width="100" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>
    <iframe :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=basic&theme='+theme"
            width="150" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>
    <hr>
    <h4>Album</h4>
    <!-- Player: Large view (customisable height) -->
    <iframe :src="'https://open.spotify.com/embed/album/'+activeAlbum"
            width="300" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
    <!-- Player: Compact view -->
    <iframe :src="'https://open.spotify.com/embed/album/'+activeAlbum"
            width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
  </div>
</template>

<script>
import Button from '@/components/Btn.vue'
import SpotifyApi from '@/services/spotify-auth'
import Loading from 'vue-loading-overlay'

export default {
  name: 'SpotifyArtistAlbums',
  components: {
    Loading,
    Button
  },
  props: {
    artistId: String
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
      /* temporary fallbacks */
      artistName: 'name',
      activeAlbum: "5Ay88ZVN61blW8QYUpofy6",
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

          /* temporary info for widgets */
          this.artistName = this.dataItems[0].artists[0].name
          this.activeAlbum = this.dataItems[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = "Error occurred. Please try again."
        })
    },
    handlePaginate(page) {
      this.dataOffset = (page - 1) * this.dataLimit
      this.getArtistAlbums()
      this.dataActivePage = page
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
