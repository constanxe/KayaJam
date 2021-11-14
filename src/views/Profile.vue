<template>
  <div class="profile-page">
    <div class="page-header"></div>
    <div class="main main-raised">
      <div class="profile-content">
        <div class="container">
          <div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
								<img :src="getObjFromUser().profile_pic"/>
              </div>

              <div class="name">
                <h3 class="title">{{ username }}</h3>
                <h6>Singapore</h6>
              </div>

              <div class="description text-center border rounded">
                <p>
                  {{ getObjFromUser().description }}
                </p>
              </div>

              <div class="social-buttons">
                <a
                  :href="'https://facebook.com/' + getObjFromUser().facebook_un"
                  target="_blank"
                  role="button"
                >
                  <ButtonSocial
                    network="facebook"
                    class="justify-content-center"
                  ></ButtonSocial
                ></a>
                <a
                  :href="'https://twitter.com/' + getObjFromUser().twitter_un"
                  target="_blank"
                  role="button"
                >
                  <ButtonSocial
                    network="twitter"
                    class="justify-content-center"
                  ></ButtonSocial
                ></a>
                <a :href="'https://t.me/' + getObjFromUser().telegram_un" target="_blank" role="button">
                  <ButtonSocial
                    network="telegram"
                    class="justify-content-center"
                  ></ButtonSocial
                ></a>
              </div>
            </div>
          </div>

          <!-- Filter Buttons-->
          <div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
            <div class="profile-tabs">
              <ul
                class="nav nav-pills nav-pills-icons justify-content-center"
                ref="filterButtons"
              >
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentSelection == 'all' }"
                    @click="currentSelection = 'all'"
                    role="button"
                  >
                    <i class="bi bi-music-note-list" />
                    All
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentSelection == 'artist' }"
                    @click="currentSelection = 'artist'"
                    role="button"
                  >
                    <i class="bi bi-person-video2" />
                    Artists
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentSelection == 'album' }"
                    @click="currentSelection = 'album'"
                    role="button"
                  >
                    <i class="bi bi-book-fill" />
                    Albums
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- SPOTIFY API -->

          <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
          <Loading
            :active="dataLoading" color="green" loader="bars"
            :background-color="theme == 'light' ? 'white' : 'black'"
          />
          <div class="container ps-4 pe-4">
            <div class="row">
              <template v-if="currentSelection != 'album'">
                <MusicCard
                  v-for="item of artistData"
                  :key="item.id"
                  :item="item"
                />
              </template>
              <template v-if="currentSelection != 'artist'">
                <MusicCard
                  v-for="item of albumData"
                  :key="item.id"
                  :item="item"
                  :artist-tag="item.artists[0]"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyApi from "@/services/spotify-auth";
import ButtonSocial from "@/components/BtnSocial.vue";
import MusicCard from "@/components/MusicCard";
import Loading from 'vue-loading-overlay';
import { mapGetters } from "vuex";
import { toastedOptions } from "@/utils";
import axios from 'axios';

const usersDB = `${process.env.VUE_APP_JSONSERVER_URL}/users`
const defaultUser = {
  "username": "",
  "profile_pic": "https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png",
  "description": "No description yet",
  "facebook_un": "",
  "twitter_un": "",
  "telegram_un": "",
  "theme": "dark",
  "fav_albums": [],
  "feat_albums": [],
  "fav_artists": [],
  "feat_artists": [],
  "location": [0,0],
  "saved_chats": [],
  "id": 0
}

export default {
  name: "Profile",
  components: {
    ButtonSocial,
    MusicCard,
    Loading
  },
  data() {
    return {
      users: [],
    // data
      dataLoading: true,
      albumData: [],
      artistData: [],
    // other
      currentSelection: "all",
    };
  },
	async created(){
		try {
			const res = await axios.get(usersDB)
			this.users = res.data
		} catch(e){
			console.error(e)
		}
    this.getAlbums();
    this.getArtists();
	},

  methods: {
    getObjFromUser() {
			//usernames are unique
			for (var obj of this.users) {
				if (obj.username == this.username) {
					// console.log(obj.username)
					// console.log(this.username)
					return obj;
				}
			}
      return defaultUser
		},
    getAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getalbums */
      SpotifyApi
        .getAlbums(this.getObjFromUser().fav_albums)
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
        .getArtists(this.getObjFromUser().fav_artists)
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
  },
  computed: {
    ...mapGetters({
      theme: "getTheme",
      username: "getUserUuid",
    }),
  },
};
</script>
<!--Map API example from Week 1 Exercise 4: Start

    <script defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrTi43G7eqOr4x8cDR6EsH1bJIBvWBW28&callback=initMap">

        // Initialize and add the map
        function initMap() {
          // The location of the user (default: SMU)
          var location = {lat: 111, lng: 111};//get these numbers from user database
          // The map, centered at location
          var map = new google.maps.Map(
              document.getElementById('map'), {zoom: 4, center: location});
          // The marker, positioned at location
          var marker = new google.maps.Marker({position: location, map: map});
        }
    </script>

    Map API example from Week 1 Exercise 4: End-->

<style scoped lang="scss">
h6 {
  font-size: 0.75rem !important;
  font-weight: 700;
  line-height: 1.5em;
  text-transform: uppercase;
}

.name h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}

.profile-page {
  height: 50px;
  background-position: center;
  background-color: white;
}

.page-header {
  height: 30vh;
  background-size: cover;
  background-color: #1db954; /*2a313a*/
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;
}

.main-raised {
  margin: -60px 30px 0;
  padding-bottom: 100px;
  border-radius: 6px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.main {
  background: var(--color-default); /*3C4858*/
  position: relative;
}

.profile-page .profile {
  text-align: center;
}

.profile-page .profile img {
  max-width: 160px;
  width: 100%;
  margin: 0 auto;
  -webkit-transform: translate3d(0, -50%, 0);
  -moz-transform: translate3d(0, -50%, 0);
  -o-transform: translate3d(0, -50%, 0);
  -ms-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}

.img-raised {
  box-shadow: 0 5px 15px -8px rgba(0, 0, 0, 0.24),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.rounded-circle {
  border-radius: 50% !important;
}

.img-fluid,
.img-thumbnail {
  max-width: 100%;
  height: auto;
}

.title {
  margin-top: 10px;
  margin-bottom: 20px;
  min-height: 32px;
  font-weight: 700;
}

.profile-page .description {
  margin: auto;
  max-width: 600px;
  font-weight: 300;
  border-color: var(--color-text);
}

p {
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.profile-page .profile-tabs {
  margin-top: 4.284rem;
  align-content: center;
}

.social-buttons {
  margin: 10px;
}

.my-1.btn.btn--facebook {
  height: 35px;
  width: 65px;
  margin: 4px 4px 4px 4px;
}

.my-1.btn.btn--facebook .bi.bi-facebook {
  align-content: auto;
}

.my-1.btn.btn--twitter {
  height: 35px;
  width: 65px;
  margin: 4px 4px 4px 4px;
}

.my-1.btn.btn--telegram {
  height: 35px;
  width: 65px;
  margin: 4px 4px 4px 4px;
}

.nav-pills,
.nav-tabs {
  border: 0;
  border-radius: 3px;
  padding: 0 15px;
}

.nav .nav-item {
  position: relative;
  margin: 0 2px;
  align-content: center;
}

.nav-pills.nav-pills-icons .nav-item .nav-link {
  border-radius: 4px;
}

.nav-pills .nav-item .nav-link.active {
  color: #fff;
  background-color: #1db954;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2),
    0 13px 24px -11px rgba(156, 39, 176, 0.6);
}

.nav-pills .nav-item .nav-link {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  min-width: 100px;
  color: #fff;
  background-color: #3c4858;
  transition: all 0.3s;
  border-radius: 30px;
  padding: 10px 15px;
  text-align: center;
}

.nav-pills .nav-item .nav-link:not(.active):hover {
  background-color: #1db954 /*rgba(200, 200, 200, 0.2)*/;
}

.nav-pills .nav-item i {
  display: block;
  font-size: 30px;
  padding: 15px 0;
}

.tab-space {
  padding: 20px 0 50px;
}

.profile-page .gallery {
  margin-top: 3.213rem;
  padding-bottom: 50px;
}

.profile-page .gallery img {
  width: 100%;
  margin-bottom: 2.142rem;
}

.profile-page .profile .name {
  margin-top: -80px;
}

img.rounded {
  border-radius: 6px !important;
}

.tab-content > .active {
  display: block;
}
</style>
