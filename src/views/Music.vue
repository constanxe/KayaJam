<template>
  <div class="music">
 
    <!-- Top Bar-->
    <div class="container-jumbotron">
      <!-- Header-->
      <div class="container header">Join and build communities.</div>

      <!-- Search Bar-->
      <div class="container form">
        <form id="form" role="search">
          <input type="search" id="query" name="q" autocomplete="off"
            placeholder="Search for your favourite artists or albums"
            aria-label="Search through site content">
          <Button btn-class="btn__search">Search</Button>
        </form>
      </div>

      <!-- Filter Buttons-->
      <div class="container filter-buttons" ref="filterButtons">
        <router-link to="/music"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('')">All</Button></router-link>
        <router-link to="/music/album"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('album')">Albums</Button></router-link>
        <router-link to="/music/artist"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('artist')">Artists</Button></router-link>
      </div>
    </div>

    <!-- Paginator -->
    <nav class="pagination">
      <a role="button" class="active"/>
      <a role="button"/>
      <a role="button"/>
      <a role="button"/>
      <a role="button"/>
    </nav>

    <!-- Albums/Artists Cards-->
    <!-- Code only works for Albums right now-->
    <div class="container">
       <div class="row">
           <div b-card-group class="music-card col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-5"  v-for='item in dataItems' :key="item.id" ref="musicCards">
            <router-link :to="'/music/'+item.type">
            <div class="card-img">
              <img :src="item.images[0].url" alt="Card image">
            </div>
            <div class="card-body">
              <h4 class="card-title tag">
                {{ item.name }}
              </h4>
              <!-- for album typed cards -->
              <!-- Need to reroute. Might be better to use artist ID as link instead-->
              <p class="card-text" v-if="item.type">
                by <router-link to="/music/artist" class="tag">{{ item.artists[0].name }}</router-link>
              </p>
              </div>
         </router-link>
        </div>
       </div>


       
    </div>
  </div>
</template>

<script>
import Button from '@/components/Btn.vue'
//import MusicCard from '@/components/MusicCard'
import SpotifyApi from '@/services/spotify-auth'
import { gsap } from "gsap";


export default {
  name: "Music",
  components: {
    Button,
    //MusicCard
  },
  data() {
    return {
    /* can customise */
    artistId: ["3FodFdWfVWIiER6Cv6YVVQ"],  //This is the string of all artists
    dataLimit: 12,
    /* will be updated automatically */
    dataOffset: 0,
    dataLoading: true,
    dataItems: [],
    artistData: [],
    dataPages: 0,
    dataActivePage: 1,
    artistType: '',
    /* temporary fallbacks */
    dataArtistIds: [],
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
          console.log(data)
          console.log(22)
          this.albumData = data
          this.dataItems = data.items
          this.dataPages = Math.ceil(data.total / this.dataLimit)
          //this.dataArtistIds = 

          this.dataLoading = false

          /* temporary info for widgets */
          this.artistName = this.dataItems[0].artists[0].name
          this.activeAlbum = this.dataItems[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
        })
        },
    getArtists() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtists(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          this.artistData = data
          this.artistType = this.artistData.type
          console.log(data)
          console.log("test")
          this.dataLoading = false

          /* temporary info for widgets */
          this.artistName = this.artistData[0].artists[0].name
          this.activeAlbum = this.artistData[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
        })
        },
    filterSelection(selection) {
      var cardBoxes = this.$refs.musicCards.children;
      for (let i = 0; i < cardBoxes.length; i++) {
        // Hide elements that are not selected by removing the "show" class (display:block)
        this.RemoveClass(cardBoxes[i], "show");
        // Show filtered elements by adding the "show" class (display:block)
        if (cardBoxes[i].getAttribute("data-type").includes(selection)) this.AddClass(cardBoxes[i], "show");
      }
      /* [animation] documentation: https://greensock.com/get-started/ */
      gsap.timeline()
        .to(cardBoxes, { duration: 0, opacity: 0, ease: 'expo.out' })
        .to(cardBoxes, { duration: 0.9, opacity: 1, ease: 'back.out' })
    },
    AddClass(element, name) {
      var elementClasses = element.className.split(" ");
      var newClasses = name.split(" ");
      for (let i = 0; i < newClasses.length; i++) {
        if (elementClasses.indexOf(newClasses[i]) == -1) {
          element.className += " " + newClasses[i];
        }
      }
    },
    RemoveClass(element, name) {
      var elementClasses = element.className.split(" ");
      var newClasses = name.split(" ");
      for (let i = 0; i < newClasses.length; i++) {
        while (elementClasses.indexOf(newClasses[i]) > -1) {
          elementClasses.splice(elementClasses.indexOf(newClasses[i]), 1);
        }
      }
      element.className = elementClasses.join(" ");
    },
    ResetActiveClass(btnContainer) {
      var currentBtn = btnContainer.getElementsByClassName("active");
      if (currentBtn.length > 0) currentBtn[0].className = currentBtn[0].className.replace(" active", "");
    },
    routeLoaded() {
      // get subroute on change in $route (specifically /music/subroute) or mounted
      var currentSelection = this.$route.params.pathMatch.slice(1);
      // Determine cards to display
      this.filterSelection(currentSelection);
      // Add active class to the current control button (highlight it)
      var btnContainer = this.$refs.filterButtons;
      var btns = btnContainer.getElementsByClassName("btn");
      this.ResetActiveClass(btnContainer);
      var possibleSelections = ["", "album", "artist"];
      var newBtn = btns[possibleSelections.indexOf(currentSelection)];
      newBtn.className += " active";
    },
  },
  /* reference: https://stackoverflow.com/questions/52468088/vue-router-call-function-after-route-has-loaded */
  watch: {
    $route() {
      this.$nextTick(this.routeLoaded());
    }
  },
  mounted() {
    this.$router.onReady(() => this.routeLoaded());
    // Add active class to the current control button (highlight it)
    var btnContainer = this.$refs.filterButtons;
    var btns = btnContainer.getElementsByClassName("btn");
    const instanceRef = this;
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        instanceRef.ResetActiveClass(btnContainer);
        this.className += " active";
      });
    }
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => this.getArtistAlbums(), 800)
    setTimeout(() => this.getArtists(), 800)
  },
};
</script>

<style scoped lang="scss">
.music-card {
  //display: none; /* Default state for albums/artists is invisible */
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

/* The "show" class is added to the filtered elements */
.show {
  display: block;
}

.filter-buttons * {
  height: 44px;
  width: 70px;
}
</style>
