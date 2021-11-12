<template>
  <div class="music">
    <!-- Top Bar -->
    <div class="container-jumbotron">
      <!-- Header-->
      <div class="container header">Join and build communities.</div>

      <!-- Search Bar-->
      <div class="container form">
        <form id="form" role="search">
          <input type="search" id="query" name="q" autocomplete="off"
            placeholder="Search for your favourite artists or albums"
            aria-label="Search through site content">
          <Button btn-class="btn__search" @click.native="search">Search</Button>
        </form>
      </div>

      <!-- Filter Buttons-->
      <div class="container filter-buttons" ref="filterButtons">
        <router-link to="/music"><Button btn-class="btn__toggle btn--radio">All</Button></router-link>
        <router-link to="/music/album"><Button btn-class="btn__toggle btn--radio">Albums</Button></router-link>
        <router-link to="/music/artist"><Button btn-class="btn__toggle btn--radio">Artists</Button></router-link>
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
        v-for="page in Math.min(dataPages, 5)" :key="page"
        :class="{'active': dataActivePage == page}"
        @click="handlePaginate(page)" role="button"
      />
    </nav>

    <!-- Albums/Artists Cards-->
    <div class="container">
      <div class="row" ref="musicCards">
        <template v-if="currentSelection != 'artist'">
          <MusicCard
            v-for="item of albumData" :key="item.id" :item="item"
            :artist-tag="item.artists[0]"
          />
        </template>
        <template v-if="currentSelection != 'album'">
          <MusicCard v-for="item of artistData" :key="item.id" :item="item"/>
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
// import { gsap } from "gsap";

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
      artistIds: ["3FodFdWfVWIiER6Cv6YVVQ", "5IIP34JBy1d8kBYlAGnRaW", "2HXfSr5CfTPZbcqS2gyGYm", "53GouHDfCfsBJIn1OjYmPO", "4v3jejyuqIBVx8nKiCSDym"],  //This is the array of all artists
      albumIds: ["5Ay88ZVN61blW8QYUpofy6"],  //This is the array of all albums
    // pagination
      dataLimit: 6,
      /* will be updated automatically */
      dataPages: 0,
      dataActivePage: 1,
      dataOffset: 0,
    // data
      dataLoading: true,
      // dataItems: [],
      artistData: [],
      albumData: [],
    }
  },
  methods: {
    /* [TODO] (1) search btn behaviour (2) dynamic fetching instead of hardcoded */
    search() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/?q=search#src-spotify-web-api.js-constr.prototype.search */
      console.log("===search===")
      // this.dataPages = Math.ceil(data.total / this.dataLimit)
      // this.dataArtistIds =
    },

    getAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getalbums */
      SpotifyApi
        .getAlbums(this.albumIds)
        .then((data) => {
          this.dataLoading = false
          // console.log(data)
          this.albumData = data.albums
        })
        .catch((error) => {
          this.dataLoading = false
          // console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
        })
    },
    getArtists() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartists */
      SpotifyApi
        .getArtists(this.artistIds)
        .then((data) => {
          this.dataLoading = false
          // console.log(data)
          this.artistData = data.artists
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
        this.getArtists()
        this.dataActivePage = page
      }
    },

    // animateChangeSelection() {
    //   var cardBoxes = this.$refs.musicCards;
    //   /* [animation] documentation: https://greensock.com/get-started/ */
    //   gsap.timeline()
    //     .to(cardBoxes, { duration: 0, opacity: 0, ease: 'expo.out' })
    //     .to(cardBoxes, { duration: 0.4, opacity: 1, ease: 'back.out' })
    // },
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
  /* reference: https://stackoverflow.com/questions/52468088/vue-router-call-function-after-route-has-loaded */
  watch: {
    $route() {
      this.$nextTick(this.getActiveBtn());
    }
  },
  mounted() {
    this.$router.onReady(() => this.getActiveBtn());
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => {
      this.getAlbums()
      this.getArtists()
    }, 800)
  },
};
</script>

<style scoped lang="scss">
form {
  width: 450px;
  height: 44px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-left: 5px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 5px;
}

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
}

.container-jumbotron {
  padding: 20px;
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
    display: flex;
    justify-content: center;
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
