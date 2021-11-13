import Vue from 'vue'
import VueRouter from 'vue-router'

import Music from '@/views/Music.vue'
import Album from '@/views/Album.vue'
import Artist from '@/views/Artist.vue'
import Chat from '@/views/Chat.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/music*',
    name: 'Music',
    component: Music
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album
  },
  {
    path: '/artist/:id',
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
    path: '/profile/:uuid?',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
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
