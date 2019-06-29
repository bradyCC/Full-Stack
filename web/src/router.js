import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main'
import Home from './views/Home'
import Article from './views/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Main',
      component: Main,
      children: [
        { path: '/', name: 'Home', component: Home },
        { path: '/articles/:id', name:'Article', component: Article, props: true }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
