<template>
  <div class="music">
    <!-- Top Bar-->     
    <div class="container-jumbotron">
        <!-- Header-->
        <div class="container header">
            <div class="row">Join and build communities.</div>
        </div>

         <!-- Search Bar-->
        <div class="container form">
            <div class="row">
            <div class="col-12">
            <form id="form" role="search">
                <input type="search" id="query" name="q"
                 placeholder="Search for your favourite artists or albums"
                 aria-label="Search through site content">
                <button>Search</button>
              </form>
            </div>
            </div>
            </div>

        <!-- Filter Buttons-->
        <div class="container filterbutton" id="filterbuttons">
        <div class="row">
        <div class="col-12">
            <button class="btn active" onclick="filterSelection('all')">All</button>
            <button class="btn" onclick="filterSelection('album')">Albums</button>
            <button class="btn" onclick="filterSelection('artist')">Artists</button>
            </div>
        </div>
            </div>
      </div>

<!-- Albums/Artists-->
    <div class="container">
        <div class="row">
            <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://f4.bcbits.com/img/a2407592093_10.jpg" alt="Card image">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Time/Space</a></h4>
                    <p href="#" class="card-text">by <a style="text-decoration:none; color: white" href="#">Charlie Lim</a></p>
                </div>
                  </a>
            </div>
       
            <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://f4.bcbits.com/img/a3424343514_10.jpg" alt="Card image">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Strawberry Feels</a></h4>
                    <p href="#" class="card-text">by <a style="text-decoration:none; color: white" href="#">Subsonic Eye</a></p>
                </div>
                    </a>
            </div>

            <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://images.squarespace-cdn.com/content/v1/561f70f2e4b05c4e86dede19/1591256499796-J3CM6FL7W3W71PT8FJM2/1frontcover.jpg?format=2500w" alt="Card image">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Letters To Ubin</a></h4>
                    <p href="#" class="card-text">by <a style="text-decoration:none; color: white" href="#">Inch</a></p>
                </div>
                  </a>
            </div>

            <div class="box album col-xl-3 col-md-4 col-sm-12 mt-5">
                    <a  href="#">
                    <div class="card-img">
                        <img src="https://media.pitchfork.com/photos/60f9880e4a319e50a860a52e/1:1/w_600/James-Blake.jpg" alt="Card image">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Friends</a></h4>
                        <p href="#" class="card-text">by <a style="text-decoration:none; color: white" href="#">James Blake</a></p>
                    </div>
                      </a>
                </div>

            <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://cdn.filestackcontent.com/eLeq7DuSsKWq57U1mC1t/convert?cache=true&crop=0%2C146%2C1920%2C960&crop_first=true&quality=90&w=1920">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Gentle Bones</a></h4>
                    <p href="#" class="card-text"><a style="text-decoration:none; color: white" href="#"></a></p>
                </div>
                    </a>
            </div>

            <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="http://pilerats.com/assets/Uploads/benjamin-kheng-find-me-introducing.jpg">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Benjamin Kheng</a></h4>
                    <p href="#" class="card-text"><a style="text-decoration:none; color: white" href="#"></a></p>
                </div>
                    </a>
            </div>

            <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://www.nme.com/wp-content/uploads/2021/07/linying-credit-jovian-lim@2000x1270.jpg">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Linying</a></h4>
                    <p href="#" class="card-text"><a style="text-decoration:none; color: white" href="#"></a></p>
                </div>
                    </a>
            </div>

            <div class="box artist col-xl-3 col-md-4 col-sm-12 mt-5">
                <a  href="#">
                <div class="card-img">
                    <img src="https://www.augustman.com/my/wp-content/uploads/sites/3/2021/04/Yung_Raja_Thumb-scaled.jpg">
                </div>
                <div class="card-body">
                    <h4 class="card-title"><a style="text-decoration:none;color: white" href="#">Yung Raja</a></h4>
                    <p href="#" class="card-text"><a style="text-decoration:none; color: white" href="#"></a></p>
                </div>
                    </a>
            </div>

            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "Music",
  methods: {
    filterSelection(c, x) {
      var i;
      if (c == "all") c = "";
      // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
      for (i = 0; i < x.length; i++) {
        this.RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) this.AddClass(x[i], "show");
      }
    },
    // Show filtered elements
    AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    },
    // Hide elements that are not selected
    RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }
  },
  mounted() {
    var x = document.getElementsByClassName("box");
    this.filterSelection('all', x);
    // Add active class to the current control button (highlight it)
    var btnContainer = document.getElementById("filterbuttons");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
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
}

svg {
  color: #fff;
  fill: currentColor;
  width: 24px;
  height: 24px;
  padding: 10px;
}

.container-jumbotron {
  justify-content: center;
  background-color: #1db954;
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
  justify-content: center;
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

.box {
  margin-left: auto;
  margin-left: auto;
  justify-content: center;
  display: none; /* Default state for albums/artists is invisible */
}

/* The "show" class is added to the filtered elements */
.show {
  display: block;
}

.card-title {
  color: white;
  font-weight: bold;
}
.card-text {
  color: white;
}

.card-img {
  width: 230px;
  height: 230px;
  position: relative;
  overflow: hidden;
  border: 2px solid white;
  justify-content: center;
  display: flex;
}

.card-img img {
  display: block;
  margin: auto;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  justify-content: center;
}
</style>
