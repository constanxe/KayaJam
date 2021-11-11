<template>
  <div class="user-settings p-4">
              <div class="container header">
            <div class="row" style="background-color: #1DB954">Profile Settings</div>
        </div>
        <!-- Search Bar-->
        <div id="user_setting_app" class="container form">
            
            <img id="profile_pic" v-bind:src="getObjFromUser('Jack').profile_pic"><!--TODO EDIT: get profile pic from profile page-->
            <div class="row">
                
                <div class="col-3">
                    
                    <label class="label" for="last_name" >Profile Picture</label>
                    
                </div>
                <div class="col-9">
                    <form>
                        <input id="new_pfp" type="file" name="new_pfp" accept="image/*">
                        <button @click="changeProfilePic">Save</button><!--TODO: update the profile pic in the profile page with new_pfp; don't change html here-->
                    </form>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label class="label" for="first_name" >First Name</label>
                </div>
                <div class="col-9">
                    <form>
                        <input pattern="[A-Za-z]*" type="search" id="first_name" name="first_name"
                            v-bind:value="getObjFromUser('Jack').first_name"><!--TODO: v-bind with profile first name-->
                        <button type="submit" @click="changeFirstName('Jack')">Save</button>
                    </form>
                    
                </div>
            </div>
            
            <div class="row">
                <div class="col-3">
                    <label class="label" for="last_name" >Last Name</label>
                </div>
                <div class="col-9">
                    <form>
                        <input pattern="[A-Za-z]*" type="search" id="last_name" name="last_name"
                            v-bind:value="getObjFromUser('Jack').last_name"><!--TODO: v-bind with profile first name-->
                        <button @click="changeLastName">Save</button>
                    </form>
                    
                </div>
            </div>

            <div class="row">
                
                <div class="col-3">
                    
                    <label class="label">Featured Albums</label>
                    
                </div>
                <div class="col-9">
                    <img v-for="image of getObjFromUser('Jack').fav_albums" :key="image" class="album_pic" :src="image" @click="updateImageSelect">
                </div>
                
            </div>
            <div class="row">
                
                <div class="col-3">
                    
                    <label class="label">Featured Artists</label>
                    
                </div>
                <div class="col-9">
                    <img v-for="image of getObjFromUser('Jack').fav_artists" :key="image" class="artist_pic" :src="image" @click="updateImageSelect">
                </div>
                
            </div>
            
            <button class="btn" style="margin-top: 10px" @click="shareLocation('Jack')">Click to Share Location</button>

            <div id="map"></div>
            

        </div>
        
  </div>
</template>

<script>
var user_data = [
    {
        first_name: "",
        last_name: "",
        username: "",//template user
        fav_albums: [],
        feat_albums: [],
        fav_artists: [],
        feat_artists: [],
        location: [0, 0], //latitude, longtitude
        profile_pic: ""
    },

    {
        first_name: "Jack",
        last_name: "Smith",
        username: "Jack",
        fav_albums: ["https://f4.bcbits.com/img/a2407592093_10.jpg", "https://f4.bcbits.com/img/a3424343514_10.jpg", "https://images.squarespace-cdn.com/content/v1/561f70f2e4b05c4e86dede19/1591256499796-J3CM6FL7W3W71PT8FJM2/1frontcover.jpg"],
        feat_albums: [],
        fav_artists: ["https://cdn.filestackcontent.com/eLeq7DuSsKWq57U1mC1t", "http://pilerats.com/assets/Uploads/benjamin-kheng-find-me-introducing.jpg", "https://www.nme.com/wp-content/uploads/2021/07/linying-credit-jovian-lim@2000x1270.jpg"],
        feat_artists: [],
        location: [0,0], //latitude, longtitude
        profile_pic: "./pfp_1.png"
    }
]

export default {
  name: 'UserSettings',
    data(){
        return user_data
    },
    methods:{
        getObjFromUser(user){//usernames are unique
            for(var obj of user_data){
                if (obj.username === user){
                    return obj
                }
            }
        },
        changeFirstName(user){
            event.preventDefault()
            const first_name = document.querySelector("input[name=first_name]").value
            console.log(first_name)
            var targetObj = this.getObjFromUser(user)
            for(var obj of user_data){
                if (obj === targetObj){
                    obj.first_name = first_name
                    console.log(obj)
                }
            }
        },
        updateImageSelect(ele){
            if(ele.target.style.border == ""){
                ele.target.style.border = "5px solid cyan"
                //TODO update JSON depending on what class it is from
            }
            else{
                ele.target.style.border = ""
                //TODO update JSON depending on what class it is from
            }
        },
        shareLocation(user){//Get current location, credit: https://shellcreeper.com/get-current-address-with-geolocation-and-google-maps-api/
            navigator.geolocation.getCurrentPosition(
                function( position ){ // success cb
                    console.log( position );
                    
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    alert(`Location shared.\nLatitude: ${lat}\nLongtitude: ${lng}`)
                    for(var obj of user_data){
                        if (obj.username === user){
                            obj.location = [lat, lng]
                        } 
                    }
                    console.log(user_data)
                },
                function(){ // fail cb
                    alert("Error in getting your location. Did you enable location sharing?")
                }
            );
        
        }
    }
}
</script>

<style scoped>

      form {
          width: 450px;
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
          color:black;
          height: 100%;
          width: 100%;
          padding: 6px 10px;
      }
      ::placeholder {
          color:black;
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
          all:unset;
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
          background-color:#2f4f4f;
          color: white;
          cursor: pointer;
          border-radius: 50px;
          font-family: Arial, Helvetica, sans-serif;
      }

      .btn:hover {
          background-color:lightgrey;
      }

      .btn.active {
          background-color: darkgrey;
          color: white;
      }

      .container{
          justify-content: center;
          border: 0;
          margin-left: auto;
          margin-right: auto;
          margin-top: 5px;
          margin-bottom: 5px;
      }

      .form{
          all:unset;
          justify-content: left;
          display:grid;
          border: 0;
          margin-left: auto;
          margin-left: auto;
          margin-top: 10px;
          margin-bottom: 10px;
      }
      .header{
          all:unset;
          justify-content: center;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          font-size: 40px;
          font-weight: bolder;
          color:white;
          
      }
      .row{
          border: 0;
          margin-top: 0px;
          justify-content: center;
      }
      body{
          font-family: Helvetica, sans-serif;
          background-color:black;
          margin-left: auto;
          margin-right: auto;
      }


      label{
        color: white;
        font-size: 20px;
        font-weight: bolder;
      }

      #profile_pic, .album_pic, .artist_pic{
          width:100px;
          
          height: 100px;
      }
</style>