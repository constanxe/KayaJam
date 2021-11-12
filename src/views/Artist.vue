<template>
		<!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
		<div class="album">
			<Loading
				:active="dataLoading" color="green" loader="bars"
				:background-color="theme == 'light' ? 'white' : 'black'"
			/>

			<div class="container">
				<div class="row">
					<!--Album Picture-->
					<div class="col-xl-5 col-lg-12">
						<img class="img1 rounded center-block" :src="artistData.images[0].url" alt="Card image"/>
					</div>
					<br />

					<!--Album Writeup + Info-->
					<div class="writeup col-xl-7 col-lg-12 p-3">
						<!-- Name from Spotify API-->
						<h1 class="display-4 text-center">Meet {{ artistData.name }} 🇸🇬</h1>
						<!-- Type Name from Spotify API-->
						<h4 class="text-center">Local {{ this.capitaliseFirstLetter(artistData.type) }}</h4>
						<!-- Genre/Genres from Spotify API-->
						<h4 class="text-center">{{ this.storeArrayAsString(artistData.genres) }}</h4>

						<!-- Spotify Player (not API) -->
            <div class="d-flex justify-content-center mt-5">
							<iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${id}&size=basic&theme=${theme}`" width="150" height="30" scrolling="no" frameborder="0" allowtransparency="true"/>
            </div>
            <br>

						<!--Play Random Album-->
						<div class="row text-center mt-3">
              <Button class="btn-lg bg-white text-dark" id="chatButton" v-tooltip="'Set Spotify player to a random album by this artist'" @click.native="setPlayerAlbum(getRandomAlbum().id)">Preview {{ artistData.name }}'s music</Button>
						</div>

						<!--Discussion Button-->
						<div class="row text-center mt-4">
							<router-link :to="'/chat/artist:' + artistData.name">
                <Button class="btn-lg bg-danger" v-tooltip="'Chat with fans or write a message of support'">
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
			<div class="container-fluid bg-success text-white mt-5">
				<div class="row pt-3 text-center">
					<h3>Works by {{ artistData.name }}</h3>
				</div>
				<!--Other Albums - Photos & Links-->
				<div class="row p-2 justify-content-center">
					<div class="col-lg-3 p-2 text-center" v-for="item of albumDataItems" :key="item.id">
						<router-link :to="`/album/${item.id}`" class="tag">
							<img class="img2" :src="item.images[0].url" />
							<h4>{{ item.name }}</h4>
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
          <ButtonSocialShare network="facebook" url="facebook.com" />
          <ButtonSocialShare network="twitter" title="test" />
          <ButtonSocialShare network="telegram" />
        </div>
			</div>
		</div>
</template>

<script>
import SpotifyApi from "@/services/spotify-auth";
import ButtonSocialShare from "@/components/BtnSocialShare.vue";
import Button from "@/components/Btn.vue";
import Loading from "vue-loading-overlay";
import { toastedOptions } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
	name: "Artist",
	components: {
    ButtonSocialShare,
		Button,
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
		};
	},
	methods: {
     ...mapMutations(['setPlayerAlbum']),

    getRandomAlbum() {
      return this.artistDataItems[Math.floor(Math.random() * this.dataLimit)]
    },
		storeArrayAsString: function (genres) {
      if (!genres) return ""
			var str = "";
			for (var i = 0; i < genres.length; i++) {
				str += this.capitaliseFirstLetter(genres[i]) + ", ";
			}
			if (genres.length == 1) {
				str = "Genre: " + str.substring(0, str.length - 2);
			} else {
				str = "Genres: " + str.substring(0, str.length - 2);
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
			this.dataActivePage = page;
		},
	},
	created() {
		/* give time to set access token in spotify-auth.js */
		setTimeout(() => {
      this.getArtistAlbums()
			this.getArtist()
    }, 800)
	},
	computed: {
		...mapState(["theme"]),
		id() {
      return this.$route.params.id;
    }
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
