<!--TODO List
1. Every time a new user is created from the login page, add a new object to users based on first entry template.
Set things which the user entered in account creation: username (must be unique).

2. List of favourites for albums/artists starts empty. Clicking favourite will add it to list, clicking again will remove it.
-->

<template>
	<div class="user-settings">
		<!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
		<Loading
			:active="dataLoading" color="green" loader="bars"
			:background-color="theme == 'light' ? 'white' : 'black'"
		/>

		<div class="container header">
			<div class="row" style="background-color: #1db954">Settings</div>
		</div>
		<!-- Search Bar-->
		<div id="user_setting_app" class="container form p-4">
			<div class="row mb-4">
				<div class="display-6 col-3">Theme</div>
				<div class="col-9">
						<Button btn-class="btn__toggle " ref="themeToggle" @click.native="toggleTheme()" style="width:40px;"/>
				</div>
			</div>

			<div class="display-6">Profile</div>
			<!-- <img
				class="profile_pic"
				v-bind:src="getObjFromUser().profile_pic"
			/> -->
			<div class="row">
				<div class="col-3">
					<label class="label" for="profile_pic">Profile Picture</label>
				</div>

				<div class="col-9" :key="update_pfps">
					<template v-for="pfp_image of available_pics">
						<img
							v-if="pfp_image === getObjFromUser().profile_pic"
							style="border: 5px solid cyan"
							class="profile_pic"
							:src="pfp_image"
							:key="pfp_image"
						/>
						<img
							v-else
							class="profile_pic"
							:src="pfp_image"
							:key="pfp_image"
							@click="changeProfilePic(pfp_image)"
						/>
					</template>
				</div>
			</div>
			<div class="row">
				<div class="col-3">
					<label class="label" for="description">Description</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="description"
							name="description"
							v-bind:value="getObjFromUser().description"
						/>
						<button @click="changeDescription()" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label" for="facebook_un">Facebook Un</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="facebook_un"
							name="facebook_un"
							v-bind:value="getObjFromUser().facebook_un"
						/>
						<button @click="changeFacebookUn()" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label" for="twitter_un">Twitter Un</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="twitter_un"
							name="twitter_un"
							v-bind:value="getObjFromUser().twitter_un"
						/>
						<button @click="changeTwitterUn()" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label" for="telegram_un">Telegram Un</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="telegram_un"
							name="telegram_un"
							v-bind:value="getObjFromUser().telegram_un"
						/>
						<button @click="changeTelegramUn()" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label">Featured Albums</label>
				</div>
				<div class="col-9" v-if="getObjFromUser().fav_albums.length > 0">
					<img
						v-for="item of albumData"
						:key="item.id"
						class="album_pic"
						:src="item.images[0].url"
						:style="getObjFromUser().feat_albums.indexOf(item.id) > -1 ? 'border: 5px solid cyan' : ''"
						@click="
							updateImageSelect();
							updateFeatAlbums(item.id);
						"
					/>
				</div>
				<div class="col-9" v-else>
					<label>No favourited albums.</label>
				</div>
			</div>
			<div class="row">
				<div class="col-3">
					<label class="label">Featured Artists</label>
				</div>
				<div class="col-9" v-if="getObjFromUser().fav_artists.length > 0">
					<img
						v-for="item of artistData"
						:key="item.id"
						class="artist_pic"
						:style="getObjFromUser().feat_artists.indexOf(item.id) > -1 ? 'border: 5px solid cyan' : ''"
						:src="item.images[0].url"
						@click="
							updateImageSelect();
							updateFeatArtists(item.id);
						"
					/>
				</div>
				<div class="col-9" v-else>
					<label>No favourited artists.</label>
				</div>
			</div>

			<button
				class="btn"
				style="margin-top: 10px"
				@click="shareLocation()"
			>
				Click to Share Location
			</button>

			<a href="./#/profile" style="margin-top: 10px;">
				<Button style="background-color: darkgrey;">
					View your profile
				</Button>
			</a>

			<div id="map"></div>
		</div>
	</div>
</template>

<script>
import SpotifyApi from "@/services/spotify-auth";
import Button from '@/components/Btn.vue'
import Loading from 'vue-loading-overlay';
import { toastedOptions, defaultUser, capitalizeFirstLetter } from "@/utils";
import { mapGetters } from 'vuex';
import axios from 'axios'

const usersDB = `${process.env.VUE_APP_JSONSERVER_URL}/users`

export default {
	name: "Settings",
	components: {
    Button,
		Loading
  },
	data() {
		return {
			users: [],
			update_pfps: 0,
			available_pics: [
        "https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
        "https://freefoodphotos.com/imagelibrary/fruit/slides/ripe_orange.jpg",
        "https://freefoodphotos.com/imagelibrary/fruit/slides/green_grapes.jpg"
      ],
			theme: [],
    // data
      dataLoading: true,
      albumData: [],
      artistData: [],
		};
	},
	async created(){
		try {
			const res = await axios.get(usersDB)
			this.users = res.data
			// setTimeout(() => {
			this.getAlbums()
			this.getArtists()
			// }, 800)
		} catch(e){
			console.error(e)
		}
	},
	computed: {
		...mapGetters({
			username: 'getUserUuid'
		}),
	},
  mounted() {
    this.theme = this.$store.getters.getTheme

    const toggleBtn = this.$refs.themeToggle.$el
    if (this.theme == "light") toggleBtn.classList.add("active")
    toggleBtn.innerText = capitalizeFirstLetter(this.theme)
  },
	methods: {
		async patch(id, data){
			try {
				const res = await axios.patch(`${usersDB}/${id}`, data)
				this.users[id] = res.data
			} catch(e){
				console.error(e)
			}
		},
		getObjFromUser() {
			//usernames are unique
			for (var obj of this.users) {
				if (obj.username === this.username) {
					return obj;
				}
			}
			return defaultUser;
		},
		updateImageSelect() {
			var eleStyle = event.target.style;
			if (eleStyle.border == "") {
				eleStyle.border = "5px solid cyan";
			} else {
				eleStyle.border = "";
			}
		},

		toggleTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'

      document.documentElement.setAttribute('data-theme', this.theme)
      this.$store.commit('setTheme', this.theme)

      const toggleBtn = this.$refs.themeToggle.$el
      toggleBtn.classList.toggle("active")
      toggleBtn.innerText = capitalizeFirstLetter(this.theme)
    },

		changeProfilePic(image) {
			var profile_pic = image;
			for (var obj of this.users) {
				if (obj.username === this.username) {
					obj.profile_pic = profile_pic;
					console.log(obj.profile_pic);
					this.update_pfps += 1;
				}
			}
			this.patch(this.getObjFromUser().id, {"profile_pic": profile_pic})
		},
		changeDescription() {
			event.preventDefault();
			var description = document.querySelector("input[name=description]").value;
			for (var obj of this.users) {
				if (obj.username === this.username) {
					obj.description = description;
					console.log(obj.description);
				}
			}
			this.patch(this.getObjFromUser().id, {"description": description})
		},

		changeFacebookUn() {
			event.preventDefault();
			var facebook_un = document.querySelector("input[name=facebook_un]").value;
			for (var obj of this.users) {
				if (obj.username === this.username) {
					obj.facebook_un = facebook_un;
					console.log(obj.facebook_un);
				}
			}
			this.patch(this.getObjFromUser().id, {"facebook_un": facebook_un})
		},
		changeTwitterUn() {
			event.preventDefault();
			var twitter_un = document.querySelector("input[name=twitter_un]").value;
			for (var obj of this.users) {
				if (obj.username === this.username) {
					obj.twitter_un = twitter_un;
					console.log(obj.twitter_un);
				}
			}
			this.patch(this.getObjFromUser().id, {"twitter_un": twitter_un})
		},
		changeTelegramUn() {
			event.preventDefault();
			var telegram_un = document.querySelector("input[name=telegram_un]").value;
			for (var obj of this.users) {
				if (obj.username === this.username) {
					obj.telegram_un = telegram_un;
					console.log(obj.telegram_un);
				}
			}
			this.patch(this.getObjFromUser().id, {"telegram_un": telegram_un})
		},

		updateFeatAlbums(id) {
			for (var obj of this.users) {
				if (obj.username === this.username) {
					var item_index = obj.feat_albums.indexOf(id);
					if (item_index > -1) {
						obj.feat_albums.splice(item_index, 1);
					} else {
						obj.feat_albums.push(id);
					}
				console.log(obj.feat_albums)
				this.patch(this.getObjFromUser().id, {"feat_albums": obj.feat_albums})
				}
			}
		},
		updateFeatArtists(id) {
			for (var obj of this.users) {
				if (obj.username === this.username) {
					var item_index = obj.feat_artists.indexOf(id);
					if (item_index > -1) {
						obj.feat_artists.splice(item_index, 1);
					} else {
						obj.feat_artists.push(id);
					}
					console.log(obj.feat_artists)
				}
			}
			this.patch(this.getObjFromUser().id, {"feat_artists": obj.feat_artists})
		},

		shareLocation() {
			const instance = this
			//Get current location, credit: https://shellcreeper.com/get-current-address-with-geolocation-and-google-maps-api/
			navigator.geolocation.getCurrentPosition(
				function (position) {
					// success cb
					console.log(position);

					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					alert(`Location shared.\nLatitude: ${lat}\nLongtitude: ${lng}`);
					for (var obj of instance.users) {
						if (obj.username === instance.username) {
							obj.location = [lat, lng];
							console.log(obj.location);
						}
					}
					instance.patch(instance.getObjFromUser().id, {"location": [lat, lng]})
				},
				function () {
					// fail cb
					alert(
						"Error in getting your location. Did you enable location sharing?"
					);
				}
			);
		},

		getAlbums() {
      const favAlbums = this.getObjFromUser().fav_albums
      if (favAlbums.length != 0) {
        /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getalbums */
        SpotifyApi
          .getAlbums(favAlbums)
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
      } else {
        this.dataLoading = false
      }
    },
    getArtists() {
      const favArtists = this.getObjFromUser().fav_artists
      if (favArtists.length != 0) {
        /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartists */
        SpotifyApi
          .getArtists(favArtists)
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
      } else {
        this.dataLoading = false
      }
    },
	}
};
</script>

<style scoped>
form {
	height: 44px;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	padding-left: 5px;
	padding-right: 20px;
	margin-left: 5px;
	margin-right: 5px;
	margin-bottom: 10px;
	border: 1px grey solid;
}
input {
	all: unset;
	color: black;
	border: grey;
	height: 100%;
	width: 100%;
	padding: 6px 10px;
}
::placeholder {
	color: black;
	opacity: 0.7;
}
button {
	all: unset;
	cursor: pointer;
	width: 44px;
	height: 44px;
	font-weight: bold;
}
svg {
	color: #fff;
	fill: currentColor;
	width: 24px;
	height: 24px;
	padding: 10px;
}
.filterbutton {
	all: unset;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	padding-top: 5px;
}
.btn {
	border: none;
	outline: none;
	width: 300px;
	padding: 2px 10px;
	background-color: #2f4f4f;
	color: white;
	cursor: pointer;
	border-radius: 50px;
	font-family: Arial, Helvetica, sans-serif;
}
.btn:hover {
	background-color: lightgrey;
}
.btn.active {
	background-color: darkgrey;
	color: white;
}
.container {
	justify-content: center;
	border: 0;
	margin-left: auto;
	margin-right: auto;
	margin-top: 5px;
	margin-bottom: 5px;
}
.form {
	all: unset;
	justify-content: left;
	display: grid;
	border: 0;
	margin-left: auto;
	margin-left: auto;
	margin-top: 10px;
	margin-bottom: 10px;
}
.header {
	all: unset;
	justify-content: center;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	font-size: 40px;
	font-weight: bolder;
	color: white;
}
.row {
	border: 0;
	margin-top: 0px;
	justify-content: center;
}
label {
	font-size: 20px;
	font-weight: bolder;
}
.profile_pic,
.album_pic,
.artist_pic {
	width: 140px;
	margin-right: 10px;
	margin-bottom: 10px;
	border: 1px grey solid;
}
</style>
