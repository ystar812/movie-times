// 解決同一頁面push 相同router 時chrome控制台報錯問題
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Movie from '../views/Movie.vue'
import Tv from '../views/Tv.vue'
import Celeb from '../views/Celeb.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/tv/:id',
    name: 'Tv',
    component: Tv
  },
  {
    path: '/celeb/:id',
    name: 'Celeb',
    component: Celeb
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return { x: 0, y: 0 }
  }
})

export default router
