<template>
  <div class="music">
    <!-- Top Bar-->
    <div class="container-jumbotron">
      <!-- Header-->
      <div class="container header">Join and build communities.</div>

      <!-- Search Bar-->
      <div class="container form">
        <form id="form" role="search">
          <input type="search" id="query" name="q" autocomplete="off"
            placeholder="Search for your favourite artists or albums"
            aria-label="Search through site content">
          <Button btn-class="btn__search">Search</Button>
        </form>
      </div>

      <!-- Filter Buttons-->
      <div class="container filter-buttons" ref="filterButtons">
        <router-link to="/music"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('')">All</Button></router-link>
        <router-link to="/music/album"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('album')">Albums</Button></router-link>
        <router-link to="/music/artist"><Button btn-class="btn__toggle btn--radio" @click="filterSelection('artist')">Artists</Button></router-link>
      </div>
    </div>

    <!-- Paginator -->
    <nav class="pagination">
      <a role="button" class="active"/>
      <a role="button"/>
      <a role="button"/>
      <a role="button"/>
      <a role="button"/>
    </nav>

    <!-- Albums/Artists Cards-->
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
</template>

<script>
import Button from '@/components/Btn.vue'
import MusicCard from '@/components/MusicCard'
import { gsap } from "gsap";

export default {
  name: "Music",
  components: {
    Button,
    MusicCard
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
      var btns = btnContainer.getElementsByClassName("btn");
      this.ResetActiveClass(btnContainer);
      var possibleSelections = ["", "album", "artist"];
      var newBtn = btns[possibleSelections.indexOf(currentSelection)];
      newBtn.className += " active";
    },
  },
  /* reference: https://stackoverflow.com/questions/52468088/vue-router-call-function-after-route-has-loaded */
  watch: {
    $route() {
      this.$nextTick(this.routeLoaded());
    }
  },
  mounted() {
    this.$router.onReady(() => this.routeLoaded());
    // Add active class to the current control button (highlight it)
    var btnContainer = this.$refs.filterButtons;
    var btns = btnContainer.getElementsByClassName("btn");
    const instanceRef = this;
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        instanceRef.ResetActiveClass(btnContainer);
        this.className += " active";
      });
    }
  }
};
</script>

<style scoped lang="scss">
form {
  width: 450px;
  height: 44px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-left: 5px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 5px;
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

.container-jumbotron {
  padding: 20px;
  text-align: center;
  background-color: map-get($colors-brands, spotify);

  /* immediate children */
  & > * {
    all: unset;
  }

  .header {
    font-size: 40px;
    font-weight: bolder;
    color: white;
  }

  .form {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.container {
  margin-top: 5px;
  margin-bottom: 5px;
}

/* The "show" class is added to the filtered elements */
.show {
  display: block;
}

.filter-buttons * {
  height: 44px;
  width: 70px;
}
</style>
