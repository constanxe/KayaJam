import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Music from '@/views/Music.vue'
import Chat from '@/views/Chat.vue'
import ChatContainer from '@/components/chat/ChatContainer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/music*',
    name: 'Music',
    component: Music
  },
  {
    path: '/chat/:channel',
    name: 'Chat',
    component: Chat,
    children: [
      { path: '', component: ChatContainer },
    ]
  },

  /* showcase pages */
  {
    path: '/demo/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
