<template>
  <div class="music">
    <!-- Top Bar-->
    <div class="container-jumbotron">
      <!-- Header-->
      <div class="container header">Join and build communities.</div>

      <!-- Search Bar-->
      <div class="container form">
        <form id="form" role="search">
          <input type="search" id="query" name="q"
            placeholder="Search for your favourite artists or albums"
            aria-label="Search through site content">
          <button>Search</button>
        </form>
      </div>

      <!-- Filter Buttons-->
      <div class="container filterbutton" id="filterbuttons">
        <router-link to="/music"><button class="btn" @click="filterSelection('')">All</button></router-link>
        <router-link to="/music/album"><button class="btn" @click="filterSelection('album')">Albums</button></router-link>
        <router-link to="/music/artist"><button class="btn" @click="filterSelection('artist')">Artists</button></router-link>
      </div>
    </div>

    <!-- Albums/Artists-->
    <div class="container">
      <div class="row">
        <!-- Album Cards -->
        <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://f4.bcbits.com/img/a2407592093_10.jpg" alt="Card image"></div>
            <div class="card-body">
              <h4 class="card-title">Time/Space</h4>
              <p class="card-text">by <router-link to="/music/artist" class="album-artist-tag">Charlie Lim</router-link></p>
            </div>
          </router-link>
        </div>

        <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://f4.bcbits.com/img/a3424343514_10.jpg" alt="Card image"></div>
            <div class="card-body">
              <h4 class="card-title">Strawberry Feels</h4>
              <p class="card-text">by <router-link to="/music/artist" class="album-artist-tag">Subsonic Eye</router-link></p>
            </div>
          </router-link>
        </div>

        <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://images.squarespace-cdn.com/content/v1/561f70f2e4b05c4e86dede19/1591256499796-J3CM6FL7W3W71PT8FJM2/1frontcover.jpg?format=2500w" alt="Card image"></div>
            <div class="card-body">
              <h4 class="card-title">Letters To Ubin</h4>
              <p class="card-text">by <router-link to="/music/artist" class="album-artist-tag">Inch</router-link></p>
            </div>
          </router-link>
        </div>

        <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
            <router-link to="/music/album">
            <div class="card-img"><img src="https://media.pitchfork.com/photos/60f9880e4a319e50a860a52e/1:1/w_600/James-Blake.jpg" alt="Card image"></div>
            <div class="card-body">
              <h4 class="card-title">Friends</h4>
              <p class="card-text">by <router-link to="/music/artist" class="album-artist-tag">James Blake</router-link></p>
            </div>
          </router-link>
        </div>

        <!-- Artist Cards -->
        <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://cdn.filestackcontent.com/eLeq7DuSsKWq57U1mC1t/convert?cache=true&crop=0%2C146%2C1920%2C960&crop_first=true&quality=90&w=1920"></div>
            <div class="card-body">
              <h4 class="card-title">Gentle Bones</h4>
              <p class="card-text"></p>
            </div>
          </router-link>
        </div>

        <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="http://pilerats.com/assets/Uploads/benjamin-kheng-find-me-introducing.jpg"></div>
            <div class="card-body">
              <h4 class="card-title">Benjamin Kheng</h4>
              <p class="card-text"></p>
            </div>
          </router-link>
        </div>

        <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://www.nme.com/wp-content/uploads/2021/07/linying-credit-jovian-lim@2000x1270.jpg"></div>
            <div class="card-body">
              <h4 class="card-title">Linying</h4>
              <p class="card-text"></p>
            </div>
          </router-link>
        </div>

        <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
          <router-link to="/music/album">
            <div class="card-img"><img src="https://www.augustman.com/my/wp-content/uploads/sites/3/2021/04/Yung_Raja_Thumb-scaled.jpg"></div>
            <div class="card-body">
              <h4 class="card-title">Yung Raja</h4>
              <p class="card-text"></p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Music",
  methods: {
    filterSelection(selection) {
      var i, cardBoxes;
      cardBoxes = document.getElementsByClassName("box");
      for (i = 0; i < cardBoxes.length; i++) {
        // Hide elements that are not selected by removing the "show" class (display:block)
        this.RemoveClass(cardBoxes[i], "show");
        // Show filtered elements by adding the "show" class (display:block)
        if (cardBoxes[i].className.indexOf(selection) > -1) this.AddClass(cardBoxes[i], "show");
      }
    },
    AddClass(element, name) {
      var i, elementClasses, newClasses;
      elementClasses = element.className.split(" ");
      newClasses = name.split(" ");
      for (i = 0; i < newClasses.length; i++) {
        if (elementClasses.indexOf(newClasses[i]) == -1) {
          element.className += " " + newClasses[i];
        }
      }
    },
    RemoveClass(element, name) {
      var i, elementClasses, newClasses;
      elementClasses = element.className.split(" ");
      newClasses = name.split(" ");
      for (i = 0; i < newClasses.length; i++) {
        while (elementClasses.indexOf(newClasses[i]) > -1) {
          elementClasses.splice(elementClasses.indexOf(newClasses[i]), 1);
        }
      }
      element.className = elementClasses.join(" ");
    },
    routeLoaded() {
      // get subroute on change in $route (specifically /music/subroute) or mounted
      var currentSelection = this.$route.params.pathMatch.slice(1);
      // Determine cards to display
      this.filterSelection(currentSelection);
      // Add active class to the current control button (highlight it)
      var btnContainer = document.getElementById("filterbuttons");
      var btns = btnContainer.getElementsByClassName("btn");
      var currentBtn = btnContainer.getElementsByClassName("active");
      if (currentBtn.length > 0) {
        currentBtn[0].className = currentBtn[0].className.replace(" active", "");
      }
      var possibleSelections = ["", "album", "artist"];
      var newBtn = btns[possibleSelections.indexOf(currentSelection)];
      newBtn.className += " active";
    },
  },
  watch: {
    $route() {
      this.$nextTick(this.routeLoaded());
    }
  },
  mounted() {
    this.$router.onReady(() => this.routeLoaded());
    // Add active class to the current control button (highlight it)
    var btnContainer = document.getElementById("filterbuttons");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var currentBtn = btnContainer.getElementsByClassName("active");
        currentBtn[0].className = currentBtn[0].className.replace(" active", "");
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
button {
  all: unset;
  cursor: pointer;
  width: 44px;
  height: 44px;
  font-weight: bold;
  color: black;
}

.container-jumbotron {
  text-align: center;
  justify-content: center;
  background-color: map-get($colors, brand);
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
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
  width: 70px;
  padding: 2px 10px;
  background-color: #2f4f4f;
  color: white;
  cursor: pointer;
  border-radius: 50px;

  &:hover {
    background-color: lightgrey;
  }

  &.active {
    background-color: darkgrey;
    color: white;
  }
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
  display: grid;
  justify-content: center;
  border: 0;
  margin-left: auto;
  margin-right: auto;
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

.box {
  display: none; /* Default state for albums/artists is invisible */
  justify-content: center;
  text-align: center;
  text-align: -webkit-center;
  color: map-get($colors, text);

  a {
    color: map-get($colors, text);

    &.album-artist-tag:hover {
      color: map-get($colors, brand);
    }
  }
}
/* The "show" class is added to the filtered elements */
.show {
  display: block;
}

.card-img {
  width: 230px;
  height: 230px;
  position: relative;
  overflow: hidden;
  border: 2px solid map-get($colors, text);
  justify-content: center;
  display: flex;

  img {
    display: block;
    margin: auto;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    justify-content: center;
  }
}
</style>
