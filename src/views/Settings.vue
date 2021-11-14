<!--TODO List
1. Every time a new user is created from the login page, add a new object to users based on first entry template.
Set things which the user entered in account creation: username (must be unique).

2. List of favourites for albums/artists starts empty. Clicking favourite will add it to list, clicking again will remove it.
-->

<template>
	<div class="user-settings">
		<div class="container header">
			<div class="row" style="background-color: #1db954">Profile Settings</div>
		</div>
		<!-- Search Bar-->
		<div id="user_setting_app" class="container form p-4">
			<img
				class="profile_pic"
				v-bind:src="getObjFromUser().profile_pic"
			/>
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

			<!-- <div class="row">
				<div class="col-3">
					<label class="label">Featured Albums</label>
				</div>
				<div class="col-9" v-if="getObjFromUser().fav_albums.length > 0">
					<img
						v-for="image of getObjFromUser().fav_albums"
						:key="image"
						class="album_pic"
						:src="image"
						@click="
							updateImageSelect();
							updateFeatAlbums(image);
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
						v-for="image of getObjFromUser().fav_artists"
						:key="image"
						class="artist_pic"
						:src="image"
						@click="
							updateImageSelect();
							updateFeatArtists(image);
						"
					/>
				</div>
				<div class="col-9" v-else>
					<label>No favourited artists.</label>
				</div>
			</div> -->

			<button
				class="btn"
				style="margin-top: 10px"
				@click="shareLocation()"
			>
				Click to Share Location
			</button>

			<div id="map"></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import { defaultUser } from "@/utils";

const usersDB = `${process.env.VUE_APP_JSONSERVER_URL}/users`

export default {
	name: "Settings",
	data() {
		return {
			users: [],
			update_pfps: 0,
			available_pics: [
        "https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
        "https://freefoodphotos.com/imagelibrary/fruit/slides/ripe_orange.jpg",
        "https://freefoodphotos.com/imagelibrary/fruit/slides/green_grapes.jpg"
      ]
		};
	},
	async created(){
		try {
			const res = await axios.get(usersDB)
			this.users = res.data
		} catch(e){
			console.error(e)
		}
	},
	computed: {
		...mapGetters({
			username: 'getUserUuid'
		}),
	},
	methods: {
		getObjFromUser() {
			//usernames are unique
			for (var obj of this.users) {
				if (obj.username === this.username) {
					return obj;
				}
			}
			return defaultUser;
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
		},

		updateImageSelect() {
			var eleStyle = event.target.style;
			if (eleStyle.border == "") {
				eleStyle.border = "5px solid cyan";
			} else {
				eleStyle.border = "";
			}
		},
		updateFeatAlbums(image) {
			for (var obj of this.users) {
				if (obj.username === this.username) {
					var item_index = obj.feat_albums.indexOf(image);
					if (item_index > -1) {
						obj.feat_albums.splice(item_index, 1);
					} else {
						obj.feat_albums.push(image);
					}
				console.log(obj.feat_albums)
				}
			}
		},
		updateFeatArtists(image) {
			for (var obj of this.users) {
				if (obj.username === this.username) {
					var item_index = obj.feat_artists.indexOf(image);
					if (item_index > -1) {
						obj.feat_artists.splice(item_index, 1);
					} else {
						obj.feat_artists.push(image);
					}
					console.log(obj.feat_artists)
				}
			}
		},
		shareLocation() {
			//Get current location, credit: https://shellcreeper.com/get-current-address-with-geolocation-and-google-maps-api/
			navigator.geolocation.getCurrentPosition(
				function (position) {
					// success cb
					console.log(position);

					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					alert(`Location shared.\nLatitude: ${lat}\nLongtitude: ${lng}`);
					for (var obj of this.users) {
						if (obj.username === this.username) {
							obj.location = [lat, lng];
							console.log(obj.location);
						}
					}
				},
				function () {
					// fail cb
					alert(
						"Error in getting your location. Did you enable location sharing?"
					);
				}
			);
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
body {
	font-family: Helvetica, sans-serif;
	background-color: black;
	margin-left: auto;
	margin-right: auto;
}
label {
	color: white;
	font-size: 20px;
	font-weight: bolder;
}
.profile_pic,
.album_pic,
.artist_pic {
	width: 140px;
	height: 90px;
	margin-right: 10px;
	margin-bottom: 10px;
}
</style>
