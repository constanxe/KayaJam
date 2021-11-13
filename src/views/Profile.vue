<template>
	<div class="profile-page">
		<div class="page-header"></div>
			<div class="main main-raised">
				<div class="profile-content">
					<div class="container">
						<div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
							<div class="profile">
								<div class="avatar">
								
								<img src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"/>
								<!-- <Star :star="starValue" :maxstars="1" style="align-right"/> -->

								<!-- <div class='star' >
									<Star :star="starValue" :maxstars="1" style="align-right"/>
								</div> -->
								</div>
				

								<div class="name">
									<h3 class="title">{{ myUuid }}</h3>
									<h6>Singapore</h6>
								</div>

								<div class="description text-center border rounded">
									<p>Hi, I'm John. My favourite artist is Elvis Presley and my favourite song is Blue Suede Shoes. </p>
								</div>

								<div class="social-buttons">
									<ButtonSocial network="facebook" class='justify-content-center border'></ButtonSocial>
									<ButtonSocial network="twitter" class='justify-content-center border'></ButtonSocial>
									<ButtonSocial network="telegram" class='justify-content-center border'></ButtonSocial>
								</div>
							</div>
						</div>

						<!-- Filter Buttons-->
						<div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
							<div class="profile-tabs" ref="filterButtons">
								<ul class="nav nav-pills nav-pills-icons justify-content-center">
									<li class="nav-item" v-bind:class="{active:isActive}">
										<a @click="filterSelection('artist')"  class="nav-link active" role="tab" data-toggle="tab">
											<i class="bi bi-person-video2"/>
											Artists
										</a>

									</li>
									<li class="nav-item">
										<a @click="filterSelection('album')" class="nav-link" role="tab" data-toggle="tab">
											<i class="bi bi-book-fill"/>
											Albums
										</a>
									</li>
									<li class="nav-item">
										<a @click="filterSelection('song')" class="nav-link" role="tab" data-toggle="tab">
											<i class="bi bi-file-earmark-music-fill"/>
											Songs
										</a>
									</li>
								</ul>
							</div>
					
						</div>

						<div class="container">
							<div class="row" ref="musicCards">
								<MusicCard data-type="album" type="album" artist-tag-name="Charlie Lim" title="Time/Space" img-src="https://f4.bcbits.com/img/a2407592093_10.jpg"/>
								<MusicCard data-type="album" type="album" artist-tag-name="Subsonic Eye" title="Strawberry Feels" img-src="https://f4.bcbits.com/img/a3424343514_10.jpg"/>
								<MusicCard data-type="album" type="album" artist-tag-name="Inch" title="Letters To Ubin" img-src="https://images.squarespace-cdn.com/content/v1/561f70f2e4b05c4e86dede19/1591256499796-J3CM6FL7W3W71PT8FJM2/1frontcover.jpg?format=2500w"/>
								<MusicCard data-type="album" type="album" artist-tag-name="James Blake" title="Friends" img-src="https://media.pitchfork.com/photos/60f9880e4a319e50a860a52e/1:1/w_600/James-Blake.jpg"/>

								<MusicCard data-type="artist" type="artist" title="Gentle Bones" img-src="https://cdn.filestackcontent.com/eLeq7DuSsKWq57U1mC1t/convert?cache=true&crop=0%2C146%2C1920%2C960&crop_first=true&quality=90&w=1920"/>
								<MusicCard data-type="artist" type="artist" title="Benjamin Kheng" img-src="http://pilerats.com/assets/Uploads/benjamin-kheng-find-me-introducing.jpg"/>
								<MusicCard data-type="artist" type="artist" title="Linying" img-src="https://www.nme.com/wp-content/uploads/2021/07/linying-credit-jovian-lim@2000x1270.jpg"/>
								<MusicCard data-type="artist" type="artist" title="Yung Raja" img-src="https://www.augustman.com/my/wp-content/uploads/sites/3/2021/04/Yung_Raja_Thumb-scaled.jpg"/>      </div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-3 ml-auto" ref='ProfileCards'>
								<img
									src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80"
									class="rounded"
								/>
								<img
									src="https://images.unsplash.com/photo-1528249227670-9ba48616014f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66b8e7db17b83084f16fdeadfc93b95b&auto=format&fit=crop&w=357&q=80"
									class="rounded"
								/>
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
// import MusicCard from '@/components/MusicCard';
import { mapGetters } from 'vuex';
import { gsap } from "gsap";


export default {
	name: "About",
	components: {
		ButtonSocial,
		// Button,
		// Star,
	},

	methods: {
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
      var btns = btnContainer.getElementsByClassName("a");
      this.ResetActiveClass(btnContainer);
      var possibleSelections = ["artist", "album", "song"];
      var newBtn = btns[possibleSelections.indexOf(currentSelection)];
      newBtn.className += " active";
    },
	

//  geocodeLatLng(geocoder) {
//   const input = document.getElementById("latlng").value;
//   const latlngStr = input.split(",", 2);
//   const latlng = {
//     lat: parseFloat(latlngStr[0]),
//     lng: parseFloat(latlngStr[1]),
//   };


    },


	data() {
		return {
			starValue: 0
		}
	},
  computed: {
    ...mapGetters({
			myUuid: 'getMyUuid'
		}),
		
  }
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
	background-color: #1DB954; /*2a313a*/
	margin: 0;
	padding: 0;
	border: 0;
	display: flex;
	align-items: center;
}

.main-raised {
	margin: -60px 30px 0;
	border-radius: 6px;
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
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
	border-color: var(--color-text);
}

.my-1.btn.btn--facebook{
	height:35px;
	width: 65px;
	margin: 4px 4px 4px 4px;
	
}

.my-1.btn.btn--facebook .bi.bi-facebook{
	align-content: auto;
}

.my-1.btn.btn--twitter{
	height:35px;
	width: 65px;
	margin: 4px 4px 4px 4px;
	
}

.my-1.btn.btn--telegram{
	height:35px;
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
	background-color: #3C4858;
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