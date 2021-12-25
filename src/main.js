import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import 'normalize.css/normalize.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueCookies from 'vue-cookies-reactive'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faClock, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSearch, faClock, faChevronRight, faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)
Vue.use(VueCookies)
Vue.$cookies.config('30d')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
