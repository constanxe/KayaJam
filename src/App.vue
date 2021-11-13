<template>
  <div id="app">
    <!-- <Login v-if="$route.name == 'Login'"/>
    <TheNav v-else/> -->
    <TheNav/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import TheNav from '@/layouts/TheNav.vue'
// import Login from '@/views/Login.vue'
import { toastedOptions } from '@/utils'
const usersDB = `${process.env.VUE_APP_JSONSERVER_URL}/users`

export default {
  name: 'App',
	data() {
		return {
			users: []
		};
	},
  components: {
    TheNav,
    // Login
  },
	async created(){
		try {
			const res = await axios.get(usersDB)
			this.users = res.data
		} catch(e){
			console.error(e)
		}
	},
	computed: {
		...mapGetters({
			username: 'getUserUuid'
		}),
	},
  methods:{
    async addUser(){
      console.log("wadawdwa hello")
      console.log(this.users)
      var isInUsers = false
			for (var obj of this.users){
        if (obj.username === this.username){
          isInUsers = true
        }
      }
      if (!isInUsers){
        const res = await axios.post(usersDB, {
            "first_name": "",
            "last_name": "",
            "username": this.username,
            "fav_albums": [],
            "feat_albums": [],
            "fav_artists": [],
            "feat_artists": [],
            "location": [0, 0],
            "available_pics": [
                "https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
                "https://freefoodphotos.com/imagelibrary/fruit/slides/ripe_orange.jpg",
                "https://freefoodphotos.com/imagelibrary/fruit/slides/green_grapes.jpg"
            ],
            "profile_pic":
                "https://freefoodphotos.com/imagelibrary/fruit/slides/red_apple.jpg",
            "saved_chats": []
        })
        this.users = [...this.users, res.data]
      }
      
    }
  },
  mounted() {
    this.addUser()
    document.documentElement.setAttribute('data-theme', this.$store.getters.getTheme)
    this.$toasted.success(`Login successful. Welcome and have fun discovering new music & people!`, toastedOptions)
    this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
  }
}
</script>
