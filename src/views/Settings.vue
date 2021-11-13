<!--TODO List
1. Every time a new user is created from the login page, add a new object to users based on first entry template.
Set things which the user entered in account creation: username (must be unique), first name, last name.

2. List of favourites for albums/artists starts empty. Clicking favourite will add it to list, clicking again will remove it.

3. All instances of 'Jack' in this file should refer to the current user's username.

<template>

</template>

<script>
export default {

}
</script>

<style>

</style>
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
				v-bind:src="getObjFromUser('Jack').profile_pic"
			/>
			<div class="row">
				<div class="col-3">
					<label class="label" for="last_name">Profile Picture</label>
				</div>

				<div class="col-9" :key="update_pfps">
					<template v-for="pfp_image of getObjFromUser('Jack').available_pics">
						<img
							v-if="pfp_image === getObjFromUser('Jack').profile_pic"
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
							@click="changeProfilePic('Jack', pfp_image)"
						/>
					</template>
				</div>
			</div>
			<div class="row">
				<div class="col-3">
					<label class="label" for="first_name">First Name</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="first_name"
							name="first_name"
							v-bind:value="getObjFromUser('Jack').first_name"
						/>
						<button @click="changeFirstName('Jack')" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label" for="last_name">Last Name</label>
				</div>
				<div class="col-9">
					<form>
						<input
							type="text"
							id="last_name"
							name="last_name"
							v-bind:value="getObjFromUser('Jack').last_name"
						/>
						<button @click="changeLastName('Jack')" style="color: black">
							Save
						</button>
					</form>
				</div>
			</div>

			<div class="row">
				<div class="col-3">
					<label class="label">Featured Albums</label>
				</div>
				<div class="col-9" v-if="getObjFromUser('Jack').fav_albums.length > 0">
					<img
						v-for="image of getObjFromUser('Jack').fav_albums"
						:key="image"
						class="album_pic"
						:src="image"
						@click="
							updateImageSelect();
							updateFeatAlbums('Jack', image);
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
				<div class="col-9" v-if="getObjFromUser('Jack').fav_artists.length > 0">
					<img
						v-for="image of getObjFromUser('Jack').fav_artists"
						:key="image"
						class="artist_pic"
						:src="image"
						@click="
							updateImageSelect();
							updateFeatArtists('Jack', image);
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
				@click="shareLocation('Jack')"
			>
				Click to Share Location
			</button>

			<div id="map"></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
const usersDB = `${process.env.VUE_APP_JSONSERVER_URL}/users`
/*
var users = [
	{
		first_name: "",
		last_name: "",
		username: "",
		fav_albums: [],
		feat_albums: [],
		fav_artists: [],
		feat_artists: [],
		location: [0, 0], //latitude, longtitude
		available_pics: [
			"https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
			"https://freefoodphotos.com/imagelibrary/fruit/slides/ripe_orange.jpg",
			"https://freefoodphotos.com/imagelibrary/fruit/slides/green_grapes.jpg",
		], //always the same for every user
		profile_pic:
			"https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
	},
	{
		first_name: "Jack",
		last_name: "Smith",
		username: "Jack",
		fav_albums: [
			"https://f4.bcbits.com/img/a2407592093_10.jpg",
			"https://f4.bcbits.com/img/a3424343514_10.jpg",
			"https://images.squarespace-cdn.com/content/v1/561f70f2e4b05c4e86dede19/1591256499796-J3CM6FL7W3W71PT8FJM2/1frontcover.jpg",
		],
		feat_albums: [],
		fav_artists: [
			"https://cdn.filestackcontent.com/eLeq7DuSsKWq57U1mC1t",
			"http://pilerats.com/assets/Uploads/benjamin-kheng-find-me-introducing.jpg",
			"https://www.nme.com/wp-content/uploads/2021/07/linying-credit-jovian-lim@2000x1270.jpg",
		],
		feat_artists: [],
		location: [0, 0], //latitude, longtitude
		available_pics: [
			"https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
			"https://freefoodphotos.com/imagelibrary/fruit/slides/ripe_orange.jpg",
			"https://freefoodphotos.com/imagelibrary/fruit/slides/green_grapes.jpg",
		], //always the same for every user
		profile_pic:
			"https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
	},
];
*/
export default {
	name: "Settings",
	data() {
		return {
			users: [],
			update_pfps: 0
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
	methods: {
		getObjFromUser(user) {
			//usernames are unique
			for (var obj of this.users) {
				if (obj.username === user) {
					return obj;
				}
			}
		},
		changeProfilePic(user, image) {
			var profile_pic = image;
			var targetObj = this.getObjFromUser(user);
			for (var obj of this.users) {
				if (obj === targetObj) {
					obj.profile_pic = profile_pic;
					console.log(obj.profile_pic);
					this.update_pfps += 1;
				}
			}
		},
		changeFirstName(user) {
			event.preventDefault();
			var first_name = document.querySelector("input[name=first_name]").value;
			var targetObj = this.getObjFromUser(user);
			for (var obj of this.users) {
				if (obj === targetObj) {
					obj.first_name = first_name;
					console.log(obj.first_name);
				}
			}
		},

		changeLastName(user) {
			event.preventDefault();
			var last_name = document.querySelector("input[name=last_name]").value;
			var targetObj = this.getObjFromUser(user);
			for (var obj of this.users) {
				if (obj === targetObj) {
					obj.last_name = last_name;
					console.log(obj.last_name);
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
		updateFeatAlbums(user, image) {
			var targetObj = this.getObjFromUser(user);
			for (var obj of this.users) {
				if (obj === targetObj) {
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
		updateFeatArtists(user, image) {
			var targetObj = this.getObjFromUser(user);
			for (var obj of this.users) {
				if (obj === targetObj) {
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
		shareLocation(user) {
			//Get current location, credit: https://shellcreeper.com/get-current-address-with-geolocation-and-google-maps-api/
			navigator.geolocation.getCurrentPosition(
				function (position) {
					// success cb
					console.log(position);

					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					alert(`Location shared.\nLatitude: ${lat}\nLongtitude: ${lng}`);
					for (var obj of this.users) {
						if (obj.username === user) {
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
	},
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
	width: 150px;
	height: 100px;
	margin-right: 10px;
	margin-bottom: 10px;
}
</style>