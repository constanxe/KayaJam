<template>
  <div class="artist">
       <div class="container">
        <div class="row">
            <!--Empty Col-->
            <div class="col-xl-1 col-lg-1 col-md-12 ">
            </div>
            <!--Album Picture-->
            <div class="col-xl-4 col-lg-5 col-md-12" >
                <img class="img1 rounded center-block" src="https://f4.bcbits.com/img/a2407592093_10.jpg" alt="Card image">
            </div>
            <!--Album Writeup + Info-->
            <div class="writeup col-xl-6 col-lg-5 col-md-12 ">
                <h1>Time/Space</h1>
                <h4>EP by Charlie Lim</h4>
                <h5>Released in 2015</h5>

                <!--Replace below with Star Function-->
                <h5 class="starimg">⭐4.3</h5>
                
                <p style="color:white ;">TIME/SPACE, the stellar double EP by singer-songwriter Charlie Lim, has gotten a surprise limited release on vinyl. The album can now be enjoyed in its full genre-hopping, analogue glory right now — a perfect send off to the artist's defining work (well, so far at least)</p>
                <!--Discussion Button-->
                <div class=" text-center mt-5">
            <router-link :to="'/chat/artist:'+artistName"><Button class="btn btn-success" style="width:min-content;" v-tooltip="'Chat with others about this album'">Discussion</Button></router-link><br>
                </div>
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
                </a>
                    <h4>Check-Hook</h4>
            </div>
            <div class="col-lg-3 mt-2 text-center">
                <a href="Charlie_TimeSpace">
                    <img class="img2" src="https://f4.bcbits.com/img/a2407592093_10.jpg">
                    <h4>Time/Space</h4>
                </a>
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
import Button from '@/components/Btn.vue'

export default {
  name: 'Home',
   components: {
    //Star,
    Button,
  },
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

        .btn{
            width: 320px;
        }

        a{
            text-decoration: none;
            color: white;
        }

</style>