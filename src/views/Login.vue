<template>
  <div class="container login">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-box_title">Spotify WebApp</div>
        <div class="col-lg-12 login-box_form">
          <div class="form-group">
            <label for="givenUsername">Username</label>
            <input type="text" class="form-control" id="givenUsername" v-model="givenUsername" placeholder="Enter Name">
          </div>
          <div class="form-group">
            <label for="givenPwd">Password</label>
            <input type="password" class="form-control" id="givenPwd" v-model="givenPwd" placeholder="Password" @keyup.enter="validate()">
          </div>
          <Button @click.native="validate()" btn-class="btn-primary">Submit</Button>
          <div class="alert" v-if="showError">{{error}}</div>
          <div v-else>{{redirect()}}</div>
        </div>
      </div>
      <div class="col-lg-3 col-md-2"></div>
    </div>
  </div>
</template>

<script>
import Button from '../components/Btn.vue'

export default {
  name: "Login",
  components: {
    Button
  },
  data() {
    return {
      users: [
        { username: "Jack", pwd: "abc" },
        { username: "Mary", pwd: "def" },
        { username: "John", pwd: "123" },
        { username: "Cherry", pwd: "456" },
      ],
      givenUsername: "",
      givenPwd: "",

      error: "",
      showError: true,
    };
  },
  methods: {
    validate() {
      console.log("in validate");
      // clear previous error
      this.error= "";
      this.showError = false;

      if (this.givenUsername == "" || this.givenPwd == "") {
        // check if any of the input fields are empty
        this.error = "Username and password cannot be empty";
        this.showError = true;
      } else {
        // check if username exists in the data
        let userExist = false;
        let pwd = "";
        for (let a_user of this.users) {
          if (a_user.username == this.givenUsername) {
            userExist = true;
            pwd = a_user.pwd;
            break;
          }
        }
        if (!userExist) {
          this.error = "Username does not exist!";
          this.showError = true;
        } else if (pwd != this.givenPwd) {
          this.error = "Password incorrect!";
          this.showError = true;
        }
      }
    },
    redirect() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.login-box {
  margin-bottom: 75px;
  margin-top: 75px;
  text-align: center;
  background: #5db871;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &_title {
    margin-top: 15px;
    font-size: 50px;
    letter-spacing: 2px;
    font-weight: bold;
    color: map-get($colors-bg, dark);
  }

  &_form {
    margin-top: 25px;
    text-align: left;
  }
}

.form-group {
  margin-bottom: 40px;

  .form-control {
    margin-bottom: 20px;
    padding-left: 5px;
    border: none;
    font-weight: bold;
    color: map-get($colors, text);
    background-color: map-get($colors-bg, dark);

    &:focus {
      outline: none;
      box-shadow: 0 0 0;
    }
  }

  label {
    margin-bottom: 0;
  }
}
</style>
