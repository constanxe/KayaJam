<template>
  <div>
    <h1>Artist {{ artistId }}</h1>

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
        role="button"
      />
    </nav>

    <h4>Artist</h4>
    <!-- [Spotify widget] reference: https://developer.spotify.com/documentation/widgets/generate/follow-button/ -->
    <!-- Detail view -->
    <iframe class="spotify-follow" :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=detail&theme='+theme" width="210" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
    <iframe class="spotify-follow" :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=detail&theme='+theme+'&show-count=0'" width="168" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
    <!-- Basic View -->
    <iframe class="spotify-follow" :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=basic&theme='+theme+'&show-count=0'" width="100" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>
    <iframe class="spotify-follow" :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=basic&theme='+theme" width="150" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>

    <h4>Album</h4>
    <!-- [Spotify widget] reference: https://developer.spotify.com/documentation/widgets/generate/embed/ -->
    <!-- Large view: customisable height -->
    <iframe class="spotify-player" :src="'https://open.spotify.com/embed/album/'+activeAlbum" width="300" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
    <!-- Compact view -->
    <iframe class="spotify-player" :src="'https://open.spotify.com/embed/album/'+activeAlbum" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
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
      activeAlbum: "5Ay88ZVN61blW8QYUpofy6",  /* temporary */
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
          this.$refs["errorArtistAlbums"].innerText = ""
          /* for player (temporary) */
          this.activeAlbum = this.dataItems[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.$refs["errorArtistAlbums"].innerText = "Error occurred. Please try again."
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
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  }
}
</script>
