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
import { toastedOptions, defaultUser } from '@/utils'

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
      // console.log(this.users)
      var isInUsers = false
			for (var obj of this.users){
        if (obj.username == this.username){
          isInUsers = true
        }
      }
      if (!isInUsers){
        const res = await axios.post(usersDB, {
          ...defaultUser,
          "username": this.username,
        })
        this.users = [...this.users, res.data]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.addUser()
    }, 3000);
    document.documentElement.setAttribute('data-theme', this.$store.getters.getTheme)
    this.$toasted.success(`Login successful. Welcome and have fun discovering new music & people!`, toastedOptions)
    this.$toasted.info(`Feel free to contact us for any inquiries at ${process.env.VUE_APP_EMAIL} `, toastedOptions)
  }
}
</script>
