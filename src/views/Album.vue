<template>
	<div class="album">
		<!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
		<Loading
			:active="dataLoading" color="green" loader="bars"
			:background-color="theme == 'light' ? 'white' : 'black'"
		/>

		<div class="container pb-5">
			<div class="row">
				<!--Album Picture-->
				<div class="col-xl-5 col-lg-12">
					<img class="img1 rounded center-block" :src="albumData.images[0].url" alt="Card image"/>
				</div>
				<br />

				<!--Album Writeup + Info-->
				<div class="writeup col-xl-7 col-lg-12 p-3">
					<!-- Name from Spotify API-->
					<h1 class="display-4 text-center">{{ albumData.name }}</h1>
					<h4 class="text-center">
						{{ capitaliseFirstLetter(albumData.album_type) }} by 
						<router-link :class="artistName == 'Various Artists' ? '' : 'tag'" :is="artistName == 'Various Artists' ? 'span' : 'router-link'" :to="`/artist/${artistId}`">
							{{ artistName }}
						</router-link>
					</h4>
					<br>

					<!--Play Random Album-->
					<div class="row text-center mt-3">
						<Button
							class="btn-lg bg-white text-dark"
							id="chatButton"
							v-tooltip="'Play on Spotify'"
							@click.native="setPlayerAlbum(albumData.id)"
							style="border: 1px grey solid;"
						>Preview this {{ albumData.album_type }}</Button>
					</div>

					<!--Discussion Button-->
					<div class="row text-center mt-4">
						<router-link :to="`/chat/artist:${artistName}`">
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
		<div class="container-fluid bg-success text-white" v-if="artistName != 'Various Artists'">
			<div class="row pt-4 pb-1 text-center">
				<h3>Works by {{ artistName }}</h3>
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
					<router-link :to="`/album/${item.id}`" :class="{'tag': id != item.id}">
						<img class="img2" :src="item.images[0].url" />
						<h4 style="color:white;">{{ item.name }}</h4>
					</router-link>
				</div>
			</div>
		</div>

		<!--Social Sharing-->
		<div class="container-fluid text-black bg-light col-12">
			<div class="row pt-3 text-center">
				<h3>Share with friends and family</h3>
			</div>
			<div class="socialshare justify-content-center">
			<!-- Share post to social media platforms -->
				<ButtonSocialShare network="facebook" :url="`${baseUrl}album/${id}`"/>
				<ButtonSocialShare network="twitter" :url="`${baseUrl}album/${id}`"/>
				<ButtonSocialShare network="telegram" :url="`${baseUrl}album/${id}`"/>
			</div>
		</div>
	</div>
</template>

<script>
import SpotifyApi from "@/services/spotify-auth";
import Button from "@/components/Btn.vue";
import ButtonSocialShare from "@/components/BtnSocialShare.vue";
import Loading from "vue-loading-overlay";
import { toastedOptions } from '@/utils'
import { mapState, mapMutations } from 'vuex'
import { gsap } from "gsap";

export default {
	name: "Album",
	components: {
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
			albumData: {images:[{url:''}]},	/* prevent error when haven't set */
			artistName: "",
			artistId: "",
			baseUrl: "localhost:8081/"	/* temporary fallback */
		};
	},
	methods: {
		...mapMutations(['setPlayerAlbum']),

		capitaliseFirstLetter: function (passedstring) {
      if (!passedstring) return ""
			//This function is used for Type and Genres
			const arr = passedstring.split(" ");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
			}
			return arr.join(" ");
		},

		getArtistAlbums() {
			/* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
			SpotifyApi.getArtistAlbums(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
				.then((data) => {
					this.dataLoading = false;
					// console.log(data);
					this.albumDataItems = data.items;
					// this.albumDataItems = this.albumDataItems.filter(item => item.id != this.id)
					this.dataPages = Math.ceil(data.total / this.dataLimit);
				})
				.catch((error) => {
					this.dataLoading = false;
					// console.log(error.responseText)
          this.$toasted.error("Error occurred while fetching data. Please try again.", toastedOptions)
          this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
				});
		},
		getAlbum() {
			/* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getalbum */
			SpotifyApi.getAlbum(this.id)
				.then((data) => {
					this.dataLoading = false;
					// console.log(data);
					this.albumData = data;
					this.artistName = this.albumData.artists[0].name
					this.artistId = this.albumData.artists[0].id
					this.getArtistAlbums()
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
			this.getArtistAlbums(this.artistId);
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
    setTimeout(() => this.getAlbum(), 800)
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
</style>
