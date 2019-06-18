import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/css/style.scss'

new Vue({
  render: h => h(App),
}).$mount('#app')
