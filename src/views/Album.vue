<template>
<div>
  <div class="album">
       <loading
        :active="dataLoading"
        :background-color="theme == 'light' ? 'white' : 'black'"
        color="green"
        loader="bars"
        />

       <div class="container">
        <div class="row">
            <!--Empty Col-->
            <div class="col-xl-1 col-lg-1 col-md-12 ">
            </div>
            <!--Album Picture-->
            <div class="col-xl-4 col-lg-5 col-md-12" >
                <img class="img1 rounded center-block" :src='albumData.items[1].images[1].url' alt="Card image">
            </div>
          <div class="col-1"></div>
            <!--Album Writeup + Info-->
            <div class="writeup col-xl-5 col-lg-5 col-md-12 ">
                <h1>{{ albumData.items[1].name}}</h1>
                <br>
                <h4>{{ this.capitaliseFirstLetter(albumData.items[1].album_type) }} by {{ albumData.items[1].artists[0].name }}</h4>
                
                <h5>Released in {{ albumData.items[1].release_date}}</h5>

                <!--Replace below with Star Function-->
                <div class="share">
                
                </div>
                
              
                <!--Discussion Button-->
                <div class=" row text-left mt-5">
            <router-link :to="'/chat/artist:'+artistName"><Button class="btn btn-success" style="width:min-content;" v-tooltip="'Chat with others about this album'">Discussion</Button></router-link><br>
                </div>
            </div>
        <div> </div>

            <!--Other Buttons-->
            <div class="socialshare col-12">
                <ButtonSocialShare network="facebook" url="facebook.com"/>
                <ButtonSocialShare network="twitter" title="test"/>
                <ButtonSocialShare network="telegram"/>
                



            </div>
           
            
        </div>


    
         </div>


        <!--Other Albums-->

        <div class="container-fluid bg-success text-white">
        <div class="row pt-3 text-center mt-5">
            <h3>Works by {{ albumData.items[1].artists[0].name }}</h3>
        </div>
        <!--Other Albums - Photos & Links-->
        <div class="row justify-content-center">
            <div class="col-lg-3 p-2 text-center">
                <a href="Charlie_CheckHook.html">
                    <img class="img2" :src='albumData.items[0].images[1].url'>
                </a>
                    <h4>{{ albumData.items[0].name}}</h4>
            </div>
            <div class="col-lg-3 mt-2 text-center">
                <a href="Charlie_TimeSpace">
                    <img class="img2" :src='albumData.items[1].images[1].url'>
                    <h4>{{ albumData.items[1].name}}</h4>
                </a>
            </div>
            <div class="col-lg-3 mt-2 text-center">
                <a href="Charlie_Self.html">
                    <img class="img2" :src='albumData.items[3].images[1].url'>
                    <h4>{{ albumData.items[3].name}}</h4>
                </a>

            </div>

        </div>
        </div>

  </div>
  </div>
</template>

<script>
//import Star from '@/components/Star.vue'
import Button from '@/components/Btn.vue'
import SpotifyApi from '@/services/spotify-auth'
//import SpotifyArtistAlbums from '@/components/SpotifyArtistAlbums.vue'
import ButtonSocialShare from '@/components/BtnSocialShare.vue'
import Loading from 'vue-loading-overlay'

export default {
  name: 'Home',
   components: {
    //Star,
    Button,
    Loading,
    
    // SpotifyArtistAlbums
    ButtonSocialShare,
  },

  props: {


  },

   data() {
        return {
        /* can customise */
        artistId: "3FodFdWfVWIiER6Cv6YVVQ",
        dataLimit: 12,
        /* will be updated automatically */
        dataOffset: 0,
        dataLoading: true,
        dataItems: [],
        artistData: [],
        dataPages: 0,
        dataActivePage: 1,
        artistType: '',
        /* temporary fallbacks */
        dataArtistIds: [],
        artistName: 'name',
        activeAlbum: "5Ay88ZVN61blW8QYUpofy6",
        }
    },

    methods: {
      storeArrayAsString: function(genres) {
          var str = '';

          for (var i = 0; i < genres.length; i++) {
                str += this.capitaliseFirstLetter(genres[i]) + ', ';                 
              }
          if(genres.length == 1 ){
                str = "Genre: " + str.substring(0, str.length - 2);
          }
          else{
                str = "Genres: " + str.substring(0, str.length - 2);
          }
          return str;
        },
      capitaliseFirstLetter: function(passedstring) { //This function is used for Type and Genres
        const arr = passedstring.split(" ");
        for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
      },
      readMoreLess: function() { //This function is used for the Read More/Less Button
            //console.log("test");
            var dots = document.getElementById("dots");
            var moreText = document.getElementById("more");
            var btnText = document.getElementById("readmoreButton");

            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Read more"; 
                moreText.style.display = "none";
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Read less"; 
                moreText.style.display = "inline";
            }
        },
    getArtistAlbums() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtistAlbums(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          console.log(data)
          console.log(22)
          this.albumData = data
          this.dataItems = data.items
          this.dataPages = Math.ceil(data.total / this.dataLimit)
          //this.dataArtistIds = 

          this.dataLoading = false

          /* temporary info for widgets */
          this.artistName = this.dataItems[0].artists[0].name
          this.activeAlbum = this.dataItems[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
        })
        },
    getArtist() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtist(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          this.artistData = data
          this.artistType = this.artistData.type
          console.log(data)
          console.log("test")
          this.dataLoading = false

          /* temporary info for widgets */
          this.artistName = this.artistData[0].artists[0].name
          this.activeAlbum = this.artistData[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
        })
        },
    handlePaginate(page) {
      this.dataOffset = (page - 1) * this.dataLimit
      this.getArtistAlbums()
      this.getArtist()
      this.dataActivePage = page
    }
  },
    created() {
    /* give time to set access token in spotify-auth.js */
    setTimeout(() => this.getArtistAlbums(), 800)
    setTimeout(() => this.getArtist(), 800)

  },
    computed: {
    theme() {
      return this.$store.getters.getTheme
    }
  }






}




</script>

<style scoped>
        body{
            color:white;
        }
        .img1 {

            border: 2px solid rgb(247, 244, 244);
            margin-top:8px ;
            display: block;
            margin:auto;
            width: 400px;
            height: 400px;
            display: block;
            object-fit: cover;
            object-position: center;
            justify-content: center;
            
        }
        .writeup{
             padding-top: 10px;
            padding-left: 45px;
            padding-right: 45px;
        }

        .main {
            margin-top: 50px;
            background-color: rgb(5, 5, 5);
        }
        .starimg {
            color:white ;
 
        }
        .reco {
            color:rgb(9, 209, 26);
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size:15px ;  
        }
        .img2 {
            width:200px ;
            height:200px ;
            border-style: solid;
            border-color: white;
            border-width: 1px;
            display: block;
            margin:auto;
            border-radius: 8px;
            margin-bottom: 5px;
        }

        .btn{
            width: 320px;
            display:flex ;
        }

        a{
            text-decoration: none;
            color: white;
        }
        .socialshare {
            justify-content: center;
            display: flex;
            margin-top: 50px;
            padding: 20px;
         
        }

</style>