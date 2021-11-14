<template>
  <div class="music">
    <!-- Top Bar -->
    <div class="container-jumbotron">
      <!-- Header-->
      <div class="container header">Join and build communities.</div>

      <!-- Search Bar-->
      <div class="container form">
        <input v-model="query" @keyup.enter="search" type="search" :placeholder="`Search for your favourite ${currentSelection ? currentSelection+'s' : 'artists or albums'}`" :key="currentSelection" aria-label="Search through site content">
        <Button btn-class="btn__search" @click.native="search">Search</Button>
      </div>

      <!-- Filter Buttons-->
      <div class="container filter-buttons" ref="filterButtons">
        <router-link to="/music"><Button btn-class="btn__toggle btn--radio" @click.native="isSearch = false" v-tooltip="isSearch & currentSelection!='' ? 'Clicking this will reset your search' : ''">All</Button></router-link>
        <router-link to="/music/artist"><Button btn-class="btn__toggle btn--radio" @click.native="isSearch = false" v-tooltip="isSearch & currentSelection!='artist' ? 'Clicking this will reset your search' : ''">Artists</Button></router-link>
        <router-link to="/music/album"><Button btn-class="btn__toggle btn--radio" @click.native="isSearch = false" v-tooltip="isSearch & currentSelection!='album' ? 'Clicking this will reset your search' : ''">Albums</Button></router-link>
      </div>
    </div>

    <!-- SPOTIFY API -->

    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
    <Loading
      :active="dataLoading" color="green" loader="bars"
      :background-color="theme == 'light' ? 'white' : 'black'"
    />
    <!-- Paginator -->
    <nav class="pagination">
      <a
        v-for="page in Math.min(dataPages, 7)" :key="page"
        :class="{'active': dataActivePage == page}"
        @click="handlePaginate(page)" role="button"
      />
    </nav>

    <!-- Albums/Artists Cards-->
    <div class="container ps-4 pe-4">
      <div class="row" ref="musicCards">
        <template v-if="currentSelection != 'album'">
          <MusicCard v-for="item of artistData" :key="item.id" :item="item"/>
        </template>
        <template v-if="currentSelection != 'artist'">
          <MusicCard
            v-for="item of albumData" :key="item.id" :item="item"
            :artist-tag="item.artists[0]"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import Button from '@/components/Btn.vue'
import MusicCard from '@/components/MusicCard'
import SpotifyApi from '@/services/spotify-auth'
import { toastedOptions } from '@/utils'
import { mapState } from 'vuex'
import { gsap } from "gsap";

export default {
  name: "Music",
  components: {
    Button,
    MusicCard,
    Loading
  },
  data() {
    return {
      /* can customise */
    // temporary fallbacks
      artistIds: ["3FodFdWfVWIiER6Cv6YVVQ", "5IIP34JBy1d8kBYlAGnRaW", "2HXfSr5CfTPZbcqS2gyGYm", "53GouHDfCfsBJIn1OjYmPO", "4v3jejyuqIBVx8nKiCSDym", "1rya10vhugXdhuxVDPUwng","4iaSNWastd6eaTcxc5I5ZT","6tVhJDK05xM7fBVa6Jx2cU","0AbaYCVaRtwCSxFuRCZHjr","0OeveoyUBFrGziPEKxAP8S","2gj35CRyiuvuJ5VzjkX52i","4dDWr3bmcGdlbLsWofWail","31TM5zBknJ7ZInbxnR0rlX","1kjkddXmDG9vdt7P8lwYUd","5OCCRySomkXZXoE1JQ5Hkb","3GFO1X5LAHduvR314sXnqI","6t8lTIBY8GyKkICndpenVv","3bdade2XqS9F4378nhCNcl","0mXXLFHmd5bUHxkzaC9ujw","3wwPhsiYLk7w68ZEE36kZ5","7EY3xvBhvVnAGIN4hyGIUk","51sob9QZyfLff9XqvYluN5","0kXDB5aeESWj5BD9TCLkMu","07h1mcCInWa0LF0ZMzVQfa","6n8yGGsqYQhvH412YUbBsd","0rvCOUI3i3QNNYiAQaWvql","5OCCRySomkXZXoE1JQ5Hkb","0REOJnRmOSNn3yY7crGPi0","3risOBDAx6GGVaCcBuhswz","3HgrsNDURBPYS1KlN7LgnE","2a1ts2wPvq6Vif1x7KJV7a","4ONKKiZXVVuz5nAWCUnnjG","5mHPapKjRFXq1IdaFDnHW9","3vYlOrtxEjNzvUPhacOdoV","6k0tAEcYn1sa2M3EZhlEfw","4dDWr3bmcGdlbLsWofWail","51sob9QZyfLff9XqvYluN5","1bRzYcqon5jDsXrdzPz6cO","02Cz717BTulFiQXUuIXH6n","0xvPxLJDw3DPNZZkp8u2Tk","2pZzvphS66rCxKBiJCrO9y"],      // albumIds: ["5Ay88ZVN61blW8QYUpofy6"],  //This is the array of all albums
    // pagination
      dataLimit: 12,
      /* will be updated automatically */
      dataPages: 0,
      dataActivePage: 1,
      dataOffset: 0,
      isSearch: false,
    // data
      dataLoading: true,
      albumData: [],
      artistData: [],
    // other
      query: "",
    }
  },
  methods: {
    getCurrentDataLimit() {
      if (!this.currentSelection) return Math.ceil(this.dataLimit/2)  /* all */
      return this.dataLimit
    },

    search() {
      if (!this.query) return

      const types = this.currentSelection ? [this.currentSelection] : ['artist','album']
      /* documentation: https://jmperezperez.com/spotify-web-api-js/?q=search#src-spotify-web-api.js-constr.prototype.search */
      SpotifyApi
        .search(this.query, types, { limit: this.getCurrentDataLimit(), offset: this.dataOffset })
        .then((data) => {
          this.isSearch = true
          this.dataLoading = false
          // console.log(data)
          this.artistData = data.artists ? data.artists.items : []
          this.albumData = data.albums ? data.albums.items : []
          this.dataPages = Math.ceil(Math.max(data.artists ? data.artists.total : 0, data.albums ? data.albums.total : 0) / this.getCurrentDataLimit())
        })
        .catch((error) => {
          this.dataLoading = false
          // console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
        })
    },
    getArtistAlbums() {
      this.albumData = [];
      for (let i=this.dataOffset; i<(Math.min(this.dataOffset+this.getCurrentDataLimit(), this.artistIds.length)); i++) {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
        SpotifyApi
          .getArtistAlbums(this.artistIds[i])
          .then((data) => {
            this.isSearch = false
            this.dataLoading = false;
            // console.log(data);
            this.albumData.push(data.items[data.items.length-1]);
            // this.albumData = this.albumData.filter(item => item.id != this.id)
          })
          .catch((error) => {
            this.dataLoading = false;
            // console.log(error.responseText)
            this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
            this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL}` , toastedOptions)
          });
      }
    },
    getArtists() {
      const currentArtistIds = this.artistIds.slice(this.dataOffset, this.dataOffset+this.getCurrentDataLimit())
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartists */
      SpotifyApi
        .getArtists(currentArtistIds)
        .then((data) => {
          this.isSearch = false
          this.dataLoading = false
          // console.log(data)
          this.artistData = data.artists
          this.dataPages = Math.ceil(this.artistIds.length / this.dataLimit);
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

        if (this.isSearch) this.search()
        else if (!this.currentSelection) {  /* all & not search */
          this.getArtistAlbums()
          this.getArtists()
        } else if (this.currentSelection == "album") {
          this.getArtistAlbums()
        } else if (this.currentSelection == "artist") {
          this.getArtists()
        }

        this.animateChangeSelection()
        this.dataActivePage = page
      }
    },

    animateChangeSelection() {
      var cardBoxes = this.$refs.musicCards;
      /* [animation] documentation: https://greensock.com/get-started/ */
      gsap.timeline()
        .to(cardBoxes, { duration: 0, opacity: 0, ease: 'expo.out' })
        .to(cardBoxes, { duration: 0.8, opacity: 1, ease: 'back.out' })
    },
    ResetActiveClass(container) {
      var currentActive = container.getElementsByClassName("active");
      if (currentActive.length > 0) currentActive[0].classList.remove("active");
    },

    getActiveBtn() {
      // Add active class to the current control button (highlight it)
      var btnContainer = this.$refs.filterButtons;
      var btns = btnContainer.getElementsByClassName("btn");
      this.ResetActiveClass(btnContainer);
      var possibleSelections = ["", "album", "artist"];
      var newBtn = btns[possibleSelections.indexOf(this.currentSelection)];
      newBtn.classList.add("active");
    },
  },
  computed: {
    ...mapState(['theme']),
    currentSelection() {
      return this.$route.params.pathMatch.slice(1);
    }
  },
  /* depreceated due to use of key in nav */
  // /* reference: https://stackoverflow.com/questions/52468088/vue-router-call-function-after-route-has-loaded */
  // watch: {
  //   $route() {
  //     this.$nextTick(this.getActiveBtn());
  //   }
  // },
  mounted() {
    this.getActiveBtn()
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => {
      this.getArtistAlbums()
      this.getArtists()
    }, 800)
  },
};
</script>

<style scoped lang="scss">
input {
  all: unset;
  color: black;
  height: 100%;
  width: 100%;
  padding: 6px 10px;
}

::placeholder {
  color: black;
  opacity: 0.7;
  text-align: left;
}

.container-jumbotron {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: map-get($colors-brands, spotify);

  /* immediate children */
  & > * {
    all: unset;
  }

  .header {
    font-size: 40px;
    font-weight: bolder;
    color: white;
  }

  .form {
    max-width: 100%;
    width: 450px;
    height: 44px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    padding-left: 10px;
    padding-right: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.container {
  margin-top: 5px;
  margin-bottom: 5px;
}

.filter-buttons * {
  height: 44px;
  width: 70px;
}

.pagination {
  padding-top: 30px;
}
</style>
