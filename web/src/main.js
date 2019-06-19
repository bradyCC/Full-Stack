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
Vue.component('MyCard', Card)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
