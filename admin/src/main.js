import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/css/common.css'

Vue.config.productionTip = false

// axios
import http from './http'
Vue.prototype.$http = http

// 全局定义
Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + 'upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

// 前端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


