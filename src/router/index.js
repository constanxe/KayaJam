import Vue from 'vue'
import VueRouter from 'vue-router'

import Music from '@/views/Music.vue'
import Album from '@/views/Album.vue'
import Artist from '@/views/Artist.vue'
import Chat from '@/views/Chat.vue'
<<<<<<< Updated upstream
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
=======
import UserSettings from '@/views/UserSettings.vue'
import ChatContainer from '@/components/chat/ChatContainer.vue'
>>>>>>> Stashed changes

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music*',
    name: 'Music',
    component: Music
  },
  {
    path: '/album/CharlieLim',
    name: 'Album',
    component: Album
  },
  {
    path: '/artist/CharlieLim',
    name: 'Artist',
    component: Artist
  },

  {
    path: '/chat/:activeChannel?',
    name: 'Chat',
    component: Chat,
    props: true
  },
  {
    path: '/account/settings',
    name: 'Settings',
    component: UserSettings
  },

  {
    path: '/account/profile',
    name: 'Profile',
    component: Profile
  },

  /* deprecated pages */
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/demo/components',
    name: 'DemoComponents',
    component: function () {
      return import('@/views/demo/DemoComponents.vue')
    }
  },
  {
    path: '/demo/spotify/api',
    name: 'DemoSpotifyApi',
    component: function () {
      return import('@/views/demo/DemoSpotifyApi.vue')
    }
  },
  {
    path: '/demo/spotify/widgets',
    name: 'DemoSpotifyWidgets',
    component: function () {
      return import('@/views/demo/DemoSpotifyWidgets.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
