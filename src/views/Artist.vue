<template>
  <div class="album">
         <div class="container">

                  <SpotifyArtistAlbums :dataItems='dataItems' ref="test"/>


    
                    <div v-for="item in dataItems" :key="item">
                       <div v-for="id in item"  :key="id">
                      <h1>
                        {{ id }}
                     </h1>

                     </div>
                     </div> 
    
  <div class="home p-4">
    <SpotifyArtistAlbums artist-id="3FodFdWfVWIiER6Cv6YVVQ"/>


  
  </div>
        <div class="row">
            <!--Empty Col-->
            <div class="col-xl-1 col-lg-1 col-md-12 ">
            </div>
            <!--Album Picture-->
            <div class="col-xl-4 col-lg-5 col-md-12" >
                <img class="img1 rounded center-block" src="https://www.esplanade.com/-/media/offstage-microsite/know-the-artists/now-hear-this-charlie-lim/nht_charlie_lim_1000x1000.jpg?mw=640" alt="Card image">
            </div>
            <!--Album Writeup + Info-->
            <div class="writeup col-xl-6 col-lg-5 col-md-12 ">
                <h1>Charlie Lim</h1>
                <h4>Artist</h4>

                <p style="color:white ;">Classically trained pianist Charlie Lim had an early start in music, sowing the seeds of ambition in church choirs and school bands since he was 14 years old. 2011’s self-titled debut EP kickstarted his journey into songwriting, blending neo-soul, electronic pop, R&B, folk and velvety vocals into a bright, breezy and groove-laden sound. <span id="dots">...</span><span id="more"> Released in 2015, Lim’s breakout double EP TIME / SPACE swept the charts and soundtracked festivals that year with its head-bobbing, electronica-tinged pop that fluently evoked a mix of moods. Lim continues to be an inspirational force on the Southeast Asian music scene, boldly pushing his musicality into exciting new places like 2018’s fresh-sounding effort, CHECK-HOOK, which slaloms between R&B and smart electronics. Lim draws lyrical inspiration from the reality of daily life, allowing a younger generation of music fans to find affinity in his universal observations.</span></p>
                <button class="btn btn-light" onclick="readMoreLess()" id="readmoreButton">Read more</button>


                <!--Discussion Button-->
                <!-- <div class="row text-center mt-5">
            <router-link :to="'/chat/artist:'+artistName"><Button class="btn btn-success" id="chatButton" v-tooltip="'Chat with others about this artist'">Chat with other fans of this artist!</Button></router-link><br>
                </div> -->
            </div>

            <!--Empty Col-->
            <div class="col-xl-1 col-lg-1 col-md-12 ">
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
    
</template>

<script>
//import Star from '@/components/Star.vue'
// import Button from '@/components/Btn.vue'
import SpotifyArtistAlbums from '@/components/SpotifyArtistAlbums.vue'


export default {
  name: 'Home',
   components: {
    //Star,
    // Button,
    SpotifyArtistAlbums
  },
  props: ['dataItems'],
  mounted() {
          setTimeout(() => console.log(this.$refs.test.dataItems), 900)

      
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
            padding-left: 60px;
            padding-right: 60px;
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
            width: 320px;
        }

        #readmoreButton{
            width: 150px;
        }

        #more {display: none;}

        a{
            text-decoration: none;
            color: white;
        }


</style>