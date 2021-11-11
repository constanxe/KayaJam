<template>
  <div class="p-4">
    <span class="fs-4">{{ artistName }}</span>&nbsp;

    <!-- Buttons with features -->
    <router-link :to="'/chat/artist:'+artistName">
      <Button v-tooltip="'Chat with others about this artist'">Discussion</Button>
    </router-link>&nbsp;
    <Button v-tooltip="'Set player to a random album by this artist'" @click.native="setPlayerAlbum(getRandomAlbum().id)">Play Random Album</Button>

    <!-- Spotify API -->
    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
    <Loading
      :active="dataLoading" color="green" loader="bars"
      :background-color="theme == 'light' ? 'white' : 'black'"
    />
    <!-- Data -->
    <div><li v-for="item in dataItems" :key="item.id">{{ item.name }}</li></div>
    <!-- Paginator -->
    <nav class="pagination">
      <a
        v-for="page in Math.min(dataPages, 5)" :key="page"
        :class="{'active': dataActivePage == page}"
        @click="handlePaginate(page)" role="button"
      />
    </nav>
  </div>
</template>

<script>
import SpotifyApi from '@/services/spotify-auth'
import Loading from 'vue-loading-overlay'
import Button from '@/components/Btn.vue'
import { toastedOptions } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SpotifyArtistAlbums',
  components: {
    Loading,
    Button,
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
      artistName: ""
    }
  },
  methods: {
    ...mapMutations(['setPlayerAlbum']),
    getArtistAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtistAlbums(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          this.dataLoading = false
          // console.log(data)
          this.dataItems = data.items
          this.dataPages = Math.ceil(data.total / this.dataLimit)
          this.artistName = this.dataItems[0].artists[0].name
        })
        .catch((error) => {
          this.dataLoading = false
          // console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
        })
    },
    handlePaginate(page) {
      if (page != this.dataActivePage) {
        this.dataOffset = (page - 1) * this.dataLimit
        this.getArtistAlbums()
        this.dataActivePage = page
      }
    },
    getRandomAlbum() {
      return this.dataItems[Math.floor(Math.random() * this.dataLimit)]
    }
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => this.getArtistAlbums(), 800)
  },
  computed: {
    ...mapState(['theme'])
  },
}
</script>
