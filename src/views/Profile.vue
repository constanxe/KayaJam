<template>
  <div class="profile-page">
    <div class="page-header"></div>
    <div class="main main-raised">
      <div class="profile-content">
        <div class="container">
          <div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img :src="profile_pic"/>
              </div>

              <div class="name">
                <h3 class="title">{{ myUuid }}</h3>
                <h6>Singapore</h6>
              </div>

              <div class="description text-center border rounded">
                <p>
                  Hi, I'm John. My favourite artist is Elvis Presley and my
                  favourite song is Blue Suede Shoes.
                </p>
              </div>

              <div class="social-buttons">
                <a
                  :href="'facebook.com/' + facebookUn"
                  target="_blank"
                  role="button"
                >
                  <ButtonSocial
                    network="facebook"
                    class="justify-content-center"
                  ></ButtonSocial
                ></a>
                <a
                  :href="'twitter.com/' + twitterUn"
                  target="_blank"
                  role="button"
                >
                  <ButtonSocial
                    network="twitter"
                    class="justify-content-center"
                  ></ButtonSocial
                ></a>
                <a :href="'t.me/' + telegramUn" target="_blank" role="button">
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

          <div class="container ps-4 pe-4">
            <div class="row">
              <template v-if="currentSelection == ''">
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
              <template v-if="currentSelection != 'album'">
                <MusicCard
                  v-for="item of artistData"
                  :key="item.id"
                  :item="item"
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
import ButtonSocial from "@/components/BtnSocial.vue";
// import Button from '@/components/Btn.vue'
// import Star from "@/components/Star.vue";
import MusicCard from "@/components/MusicCard";
import { mapGetters } from "vuex";
import SpotifyApi from "@/services/spotify-auth";
import { toastedOptions } from "@/utils";
// import { gsap } from "gsap";
// import axios from "axios";

export default {
  name: "Profile",
  components: {
    ButtonSocial,
    MusicCard,
    // Button,
    // Star,
  },

  data() {
    return {
      artistIds: [
        "3FodFdWfVWIiER6Cv6YVVQ",
        "5IIP34JBy1d8kBYlAGnRaW",
        "2HXfSr5CfTPZbcqS2gyGYm",
        "53GouHDfCfsBJIn1OjYmPO",
        "4v3jejyuqIBVx8nKiCSDym",
        "1rya10vhugXdhuxVDPUwng",
        "4iaSNWastd6eaTcxc5I5ZT",
        "6tVhJDK05xM7fBVa6Jx2cU",
        "0AbaYCVaRtwCSxFuRCZHjr",
        "0OeveoyUBFrGziPEKxAP8S",
        "2gj35CRyiuvuJ5VzjkX52i",
        "4dDWr3bmcGdlbLsWofWail",
        "31TM5zBknJ7ZInbxnR0rlX",
        "1kjkddXmDG9vdt7P8lwYUd",
        "5OCCRySomkXZXoE1JQ5Hkb",
        "3GFO1X5LAHduvR314sXnqI",
        "6t8lTIBY8GyKkICndpenVv",
        "3bdade2XqS9F4378nhCNcl",
        "0mXXLFHmd5bUHxkzaC9ujw",
        "3wwPhsiYLk7w68ZEE36kZ5",
        "7EY3xvBhvVnAGIN4hyGIUk",
        "51sob9QZyfLff9XqvYluN5",
        "0kXDB5aeESWj5BD9TCLkMu",
        "07h1mcCInWa0LF0ZMzVQfa",
        "6n8yGGsqYQhvH412YUbBsd",
        "0rvCOUI3i3QNNYiAQaWvql",
        "5OCCRySomkXZXoE1JQ5Hkb",
        "0REOJnRmOSNn3yY7crGPi0",
        "3risOBDAx6GGVaCcBuhswz",
        "3HgrsNDURBPYS1KlN7LgnE",
        "2a1ts2wPvq6Vif1x7KJV7a",
        "4ONKKiZXVVuz5nAWCUnnjG",
        "5mHPapKjRFXq1IdaFDnHW9",
        "3vYlOrtxEjNzvUPhacOdoV",
        "6k0tAEcYn1sa2M3EZhlEfw",
        "4dDWr3bmcGdlbLsWofWail",
        "51sob9QZyfLff9XqvYluN5",
        "1bRzYcqon5jDsXrdzPz6cO",
        "02Cz717BTulFiQXUuIXH6n",
        "0xvPxLJDw3DPNZZkp8u2Tk",
        "2pZzvphS66rCxKBiJCrO9y",
      ], // albumIds: ["5Ay88ZVN61blW8QYUpofy6"],  //This is the array of all albums
      // pagination
      dataLimit: 12,
      /* will be updated automatically */
      dataPages: 0,
      dataActivePage: 1,
      dataOffset: 0,
      // isSearch: false,
      // data
      // dataLoading: true,
      albumData: [],
      artistData: [],
      // other
      query: "",
      currentSelection: "artist",
    };
  },
  // 	async created(){
  // 	try {
  // 		const res = await axios.get(usersDB)
  // 		this.users = res.data
  // 	} catch(e){
  // 		console.error(e)
  // 	}
  // },

  methods: {
    setDataPages() {
      this.dataPages = Math.ceil(
        this.artistIds.length / this.getCurrentDataLimit()
      );
    },

    getCurrentDataLimit() {
      if (!this.currentSelection)
        return Math.ceil(this.dataLimit / 2); /* all */
      return this.dataLimit;
    },

    getAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getalbums */
      SpotifyApi.getAlbums(this.albumIds)
        .then((data) => {
          this.dataLoading = false;
          // console.log(data)
          this.albumData = data.albums;
        })
        .catch((error) => {
          this.dataLoading = false;
          // console.log(error.responseText)
          this.$toasted.error(
            "Error occurred while fetching data. Please try again.",
            toastedOptions
          );
          this.$toasted.info(
            `Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `,
            toastedOptions
          );
        });
    },
    getArtistAlbums() {
      this.albumData = [];
      for (
        let i = this.dataOffset;
        i <
        Math.min(
          this.dataOffset + this.getCurrentDataLimit(),
          this.artistIds.length
        );
        i++
      ) {
        /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
        SpotifyApi.getArtistAlbums(this.artistIds[i])
          .then((data) => {
            this.dataLoading = false;
            // console.log(data);
            this.albumData.push(data.items[data.items.length - 1]);
            // this.albumData = this.albumData.filter(item => item.id != this.id)
            this.dataPages = Math.ceil(data.total / this.dataLimit);
          })
          .catch((error) => {
            this.dataLoading = false;
            // console.log(error.responseText)
            this.$toasted.error(
              "Error occurred while fetching data. Please try again.",
              toastedOptions
            );
            this.$toasted.info(
              `Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL}`,
              toastedOptions
            );
          });
      }
    },
    getArtists() {
      const currentArtistIds = this.artistIds.slice(
        this.dataOffset,
        this.dataOffset + this.getCurrentDataLimit()
      );
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartists */
      SpotifyApi.getArtists(currentArtistIds)
        .then((data) => {
          this.dataLoading = false;
          // console.log(data)
          this.artistData = data.artists;
        })
        .catch((error) => {
          this.dataLoading = false;
          // console.log(error.responseText)
          this.$toasted.error(
            "Error occurred while fetching data. Please try again.",
            toastedOptions
          );
          this.$toasted.info(
            `Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `,
            toastedOptions
          );
        });
    },
  },
  computed: {
    ...mapGetters({
      myUuid: "getUserUuid",
    }),
    // currentSelection() {
    //   return this.$route.params.pathMatch.slice(1);
    // },
  },
  mounted() {
    // this.getActiveBtn();
    this.setDataPages();
  },
  created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => {
      this.getArtistAlbums();
      this.getArtists();
    }, 800);

    // try {
    //   const res = await axios.get(usersDB);
    //   this.users = res.data;
    // } catch (e) {
    //   console.error(e);
    // }
  },
};
</script>

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