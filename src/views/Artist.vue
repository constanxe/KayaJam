<template>
  <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
  <div class="album">
    <Loading
      :active="dataLoading" color="green" loader="bars"
      :background-color="theme == 'light' ? 'white' : 'black'"
    />

    <div class="container pb-5">
      <div class="row">
        <!--Album Picture-->
        <div class="col-xl-5 col-lg-12">
          <img class="img1 rounded center-block" :src="artistData.images[0].url" alt="Card image"/>
        </div>
        <br />

        <!--Album Writeup + Info-->
        <div class="writeup col-xl-7 col-lg-12 p-3 text-center">

          <!-- Name from Spotify API-->
          <h1 class="display-4">Meet {{ artistData.name }}</h1>

          <!-- Genre/Genres from Spotify API-->
          <h4 v-html="storeArrayAsString(artistData.genres)"/>
          <i>Popularity:</i> <Star :star="Math.ceil(artistData.popularity/20)" :maxstars="5" hasdescription isdisabled class="d-inline-block" :key="artistData.popularity"/>

          <!-- Spotify Player (not API) -->
          <div class="d-flex justify-content-center mt-5">
            <iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${id}&size=basic&theme=${theme}`" width="150" height="30" scrolling="no" frameborder="0" allowtransparency="true"/>
          </div>
          <br>

          <!--Play Random Album-->
          <div class="row text-center mt-3">
						<a role="button">
							<Button class="btn-lg bg-white text-dark" v-tooltip="'Set Spotify player to a random album by this artist'" @click.native="setPlayerAlbum(getRandomAlbum().id)"  style="border: 1px grey solid;">
								Preview {{ artistData.name }}'s music
							</Button>
						</a>
          </div>

          <!--Discussion Button-->
          <div class="row text-center mt-4">
            <router-link :to="`/chat/artist:${artistData.name}`">
              <Button class="btn-lg btn-lg bg-danger" v-tooltip="'Chat with fans or write a message of support'">
                Chat with fans ❤️
              </Button>
            </router-link>
            </div>
          </div>
        <br />
        <br />
      </div>
    </div>


    <!--Other Albums-->
    <div class="container-fluid bg-success text-white" v-if="artistData.name != 'Various Artists'">
      <div class="row pt-4 pb-1 text-center">
        <h3>Works by {{ artistData.name }}</h3>
      </div>
			<!-- Paginator -->
			<nav class="pagination">
				<a
					v-for="page in Math.min(dataPages, 7)" :key="page"
					:class="{'active': dataActivePage == page}"
					@click="handlePaginate(page)" role="button"
				/>
			</nav>
      <!--Other Albums - Photos & Links-->
      <div class="row pb-2" ref="musicCards">
        <div class="p-2 text-center col-md-4 col-sm-6 mt-3" v-for="item of albumDataItems" :key="item.id">
          <router-link :to="`/album/${item.id}`" class="tag">
            <img class="img2" :src="item.images[0].url" />
            <h4 style="color:white;">{{ item.name }}</h4>
          </router-link>
        </div>
      </div>
    </div>

    <!--Social Sharing-->
    <div class="container-fluid text-black bg-light col-12">
      <div class="row pt-3 text-center">
        <h3>Share with your friends and family</h3>
      </div>
      <div class="socialshare justify-content-center">
      <!-- Share post to social media platforms -->
        <ButtonSocialShare network="facebook" :url="`${baseUrl}artist/${id}`"/>
        <ButtonSocialShare network="twitter" :url="`${baseUrl}artist/${id}`"/>
        <ButtonSocialShare network="telegram" :url="`${baseUrl}artist/${id}`"/>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyApi from "@/services/spotify-auth";
import Star from '@/components/Star.vue'
import Button from "@/components/Btn.vue";
import ButtonSocialShare from "@/components/BtnSocialShare.vue";
import Loading from "vue-loading-overlay";
import { toastedOptions } from '@/utils'
import { mapState, mapMutations } from 'vuex'
import { gsap } from "gsap";

export default {
	name: "Artist",
	components: {
    Star,
		Button,
    ButtonSocialShare,
		Loading,
	},
	data() {
		return {
			/* can customise */
			dataLimit: 3,
			/* will be updated automatically */
			dataOffset: 0,
			dataLoading: true,
			dataPages: 0,
			dataActivePage: 1,
			albumDataItems: [],
			artistData: {images:[{url:''}]},	/* prevent error when haven't set */
			baseUrl: "localhost:8081"	/* temporary fallback */
		};
	},
	methods: {
     ...mapMutations(['setPlayerAlbum']),

    getRandomAlbum() {
      return this.albumDataItems[Math.floor(Math.random() * this.albumDataItems.length-1)]
    },
		storeArrayAsString: function (genres) {
      if (!genres) return ""
			var str = "";
			for (var i = 0; i < genres.length; i++) {
				str += this.capitaliseFirstLetter(genres[i]) + ", ";
			}
			if (genres.length == 1) {
				str = "<i>Genre:</i> " + str.substring(0, str.length - 2);
			} else {
				str = "<i>Genres:</i> " + str.substring(0, str.length - 2);
			}
			return str;
		},
		capitaliseFirstLetter: function (passedstring) {
      if (!passedstring) return ""
			//This function is used for Type and Genres
			const arr = passedstring.split(" ");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
			}
			return arr.join(" ");
		},
		// readMoreLess: function () {
		// 	//This function is used for the Read More/Less Button
		// 	//console.log("test");
		// 	var dots = document.getElementById("dots");
		// 	var moreText = document.getElementById("more");
		// 	var btnText = document.getElementById("readmoreButton");

		// 	if (dots.style.display === "none") {
		// 		dots.style.display = "inline";
		// 		btnText.innerHTML = "Read more";
		// 		moreText.style.display = "none";
		// 	} else {
		// 		dots.style.display = "none";
		// 		btnText.innerHTML = "Read less";
		// 		moreText.style.display = "inline";
		// 	}
    // },

    getArtistAlbums() {
			/* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
			SpotifyApi.getArtistAlbums(this.id, { limit: this.dataLimit, offset: this.dataOffset })
				.then((data) => {
					this.dataLoading = false;
					// console.log(data);
					this.albumDataItems = data.items;
					this.dataPages = Math.ceil(data.total / this.dataLimit);
				})
				.catch((error) => {
					this.dataLoading = false;
					// console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
				});
		},
		getArtist() {
			/* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartists */
			SpotifyApi.getArtist(this.id)
				.then((data) => {
					this.dataLoading = false;
					// console.log(data);
					this.artistData = data;
				})
				.catch((error) => {
					this.dataLoading = false;
					// console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
				});
		},
		handlePaginate(page) {
			this.dataOffset = (page - 1) * this.dataLimit;
			this.getArtistAlbums();
			this.animateChangeSelection();
			this.dataActivePage = page;
		},
    animateChangeSelection() {
      var cardBoxes = this.$refs.musicCards;
      /* [animation] documentation: https://greensock.com/get-started/ */
      gsap.timeline()
        .to(cardBoxes, { duration: 0, opacity: 0, ease: 'expo.out' })
        .to(cardBoxes, { duration: 0.8, opacity: 1, ease: 'back.out' })
    },
	},
	created() {
		/* give time to set access token in spotify-auth.js */
		setTimeout(() => {
			this.getArtist()
      this.getArtistAlbums()
    }, 800)
	},
	computed: {
		...mapState(["theme"]),
		id() {
      return this.$route.params.id;
    }
	},
	mounted() {
		this.baseUrl = process.env.BASE_URL
	},
};
</script>

<style scoped lang="scss">
.album {
	margin-top: 50px;
}

.socialshare {
	justify-content: center;
  display: flex;
  padding-top: 5px;
	padding-bottom: 20px;
}

.img1 {
	border: 2px solid rgb(247, 244, 244);
	margin-top: 8px;
	display: block;
	margin: auto;
	width: 400px;
	height: 400px;
	display: block;
	object-fit: cover;
	object-position: center;
	justify-content: center;
}
.writeup {
	padding-top: 10px;
	padding-left: 45px;
	padding-right: 45px;
}

.img2 {
	width: 200px;
	height: 200px;
	border-style: solid;
	border-color: white;
	border-width: 1px;
	display: block;
	margin: auto;
	border-radius: 8px;
	margin-bottom: 5px;
}

.btn-lg {
	width: 400px;
	min-width: fit-content;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	align-items: center;
	text-align: center;
	display: inline-block;
}


#readmoreButton {
	width: 120px;
}

#more {
	display: none;
}
</style>
