<template>
    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
<div>
  <div><li v-for="item in dataItems" :key="item">{{ item.name }}</li></div>
  <div><li v-for="item1 in artistData" :key="item1">{{ item1 }}</li></div>

  <div class="album">
        <loading
        :active="dataLoading"
        :background-color="theme == 'light' ? 'white' : 'black'"
        color="green"
        loader="bars"
        />


        <div class="container">
        <div class="row">

            <!--Album Picture-->
            <div class="col-xl-5 col-lg-12" >
                <img class="img1 rounded center-block" src="https://www.esplanade.com/-/media/offstage-microsite/know-the-artists/now-hear-this-charlie-lim/nht_charlie_lim_1000x1000.jpg?mw=640" alt="Card image">
            </div>
            <!--Album Writeup + Info-->
            <div class="writeup col-xl-7 col-lg-12 ">
                <h1>Charlie Lim</h1>
                <h4>Artist</h4>
    <iframe :src="'https://open.spotify.com/follow/1/?uri=spotify:artist:'+artistId+'&size=basic&theme='+theme"
            width="150" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>

                <p style="color:white ;">Classically trained pianist Charlie Lim had an early start in music, sowing the seeds of ambition in church choirs and school bands since he was 14 years old. 2011’s self-titled debut EP kickstarted his journey into songwriting, blending neo-soul, electronic pop, R&B, folk and velvety vocals into a bright, breezy and groove-laden sound. <span id="dots">...</span><span id="more"> Released in 2015, Lim’s breakout double EP TIME / SPACE swept the charts and soundtracked festivals that year with its head-bobbing, electronica-tinged pop that fluently evoked a mix of moods. Lim continues to be an inspirational force on the Southeast Asian music scene, boldly pushing his musicality into exciting new places like 2018’s fresh-sounding effort, CHECK-HOOK, which slaloms between R&B and smart electronics. Lim draws lyrical inspiration from the reality of daily life, allowing a younger generation of music fans to find affinity in his universal observations.</span></p>
                
                <button class="btn btn-secondary" v-on:click="readMoreLess" id="readmoreButton">Read more</button>


                <!--Discussion Button-->
                <div class="row text-center mt-5">
            <router-link :to="'/chat/artist:'+artistName"><Button class="btn btn-success" id="chatButton" v-tooltip="'Chat with others about this artist'">Connect with fans</Button></router-link><br>
                </div> 
            </div>
     

            
        </div>
        </div>

        <!--Other Albums-->

        <div class="container-fluid bg-success text-white">
        <div class="row pt-3 text-center mt-5">
            <h3>Works by Charlie Lim</h3>
        </div>
        <!--Other Albums - Photos & Links-->
        <div class="row justify-content-center">
            <div class="col-lg-3 p-2 text-center">
                <a href="Charlie_CheckHook.html">
                    <img class="img2" src="https://f4.bcbits.com/img/a0682376044_10.jpg">
                    <h4>Check-Hook</h4>
                </a>
            </div>
            <div class="col-lg-3 mt-2 text-center">
                <a href="Charlie_TimeSpace">
                    <img class="img2" src="https://f4.bcbits.com/img/a2407592093_10.jpg">
                </a>
                <h4>Time/Space</h4>

            </div>
            <div class="col-lg-3 mt-2 text-center">
                <a href="Charlie_Self.html">
                    <img class="img2" src="https://f4.bcbits.com/img/a2453397251_10.jpg">
                    <h4>Charlie Lim</h4>
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
import Loading from 'vue-loading-overlay'

export default {
  name: 'Home',
   components: {
    //Star,
    Loading,
    Button,
    // SpotifyArtistAlbums
  },
  props: {
  //artistId: "3FodFdWfVWIiER6Cv6YVVQ"
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
        /* temporary fallbacks */
        dataArtistIds: [],
        artistName: 'name',
        activeAlbum: "5Ay88ZVN61blW8QYUpofy6",
        }
    },
    mounted() {
          setTimeout(() => console.log(this.$refs.test.dataItems), 900)
          setTimeout(() => console.log(this.$refs.test.artistData), 900)
    },
    methods: {
      readMoreLess: function() {
            console.log("test");
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
          //console.log(data)
          this.dataItems = data.items
          this.dataPages = Math.ceil(data.total / this.dataLimit)
          //this.dataArtistIds = 

          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = ""

          /* temporary info for widgets */
          this.artistName = this.dataItems[0].artists[0].name
          this.activeAlbum = this.dataItems[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = "Error occurred. Please try again."
        })
        },
    getArtist() {
      /* documentation: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.getartistalbums */
      SpotifyApi
        .getArtist(this.artistId, { limit: this.dataLimit, offset: this.dataOffset })
        .then((data) => {
          this.artistData = data.items
          console.log(data.items)
          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = ""

          /* temporary info for widgets */
          this.artistName = this.artistData[0].artists[0].name
          this.activeAlbum = this.artistData[0].id
        })
        .catch((error) => {
          // console.log(error.responseText)
          this.dataLoading = false
          this.$refs["errorArtistAlbums"].innerText = "Error occurred. Please try again."
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
        .album{
            margin-top: 50px;
        }

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

        #chatButton{
            width: 250px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;

            
        }

        #readmoreButton{
            width: 120px;
        }

        #more {display: none;}

        a{
            text-decoration: none;
            color: white;
        }


</style>