<template>
  <div class="container login">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">Spotify WebApp</div>
        <div class="col-lg-12 login-form">
          <div class="form-group">
            <label for="user">Username</label>
            <input type="text" class="form-control" id="user" v-model="user" placeholder="Enter Name">
          </div>
          <div class="form-group">
            <label for="pwd1">Password</label>
            <input type="password" class="form-control" id="pwd1" v-model="pwd1" placeholder="Password">
          </div>
          <Button @click.native="validate()" btn-class="btn-primary">Submit</Button>
          <div class="alert" v-if="show">{{error}}</div>
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
        { user: "Jack", pwd: "abc" },
        { user: "Mary", pwd: "def" },
        { user: "John", pwd: "123" },
        { user: "Cherry", pwd: "456" },
      ],
      user: "",
      pwd1: "",

      show: true,
      error: "",
    };
  },
  methods: {
    validate() {
      console.log("in validate");
      // clear previous error
      this.show = false;

      if (this.user == "" || this.pwd1 == "") {
        // check if any of the input fields are empty
        this.error = "Username and password cannot be empty";
        this.show = true;
      } else {
        // check if user exists in the data
        let userExist = false;
        let pwd = "";
        for (let a_user of this.users) {
          if (a_user.user == this.user) {
            userExist = true;
            pwd = a_user.pwd;
            break;
          }
        }
        if (!userExist) {
          this.error = "Username does not exist!";
          this.show = true;
        } else if (pwd != this.pwd1) {
          this.error = "Password incorrect!";
          this.show = true;
        }
      }
    },
    redirect() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped lang="scss">
.login-box {
  margin-top: 75px;
  height: auto;
  background: #5db871;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 50px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #000000;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }

  .login-form {
    margin-top: 25px;
    text-align: left;
  }
}

input {
  &:focus {
    outline: none;
    box-shadow: 0 0 0;
  }

  &[type=text] {
    background-color: #1a2226;
    border: none;
    border-bottom: 2px solid #0db8de;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ecf0f5;
  }

  &[type=password] {
    background-color: #1a2226;
    border: none;
    border-bottom: 2px solid #0db8de;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ecf0f5;
  }
}

.form-group {
  margin-bottom: 40px;
  outline: 0px;

  .form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0db8de;
    outline: 0;
    background-color: #1a2226;
    color: #ecf0f5;
  }

  label {
    margin-bottom: 0px;
  }
}
</style>
