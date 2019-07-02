import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/Card'
Vue.component('MyCard', Card, )
import CardList from './components/CardList'
Vue.component('MyCardList', CardList)

// axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api/'
})

router.afterEach((from, to, next) => {
  window.scroll(0, 0)
  next
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
