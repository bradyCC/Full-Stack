import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit }, // 创建分类
        { path: '/categories/edit/:id', component: CategoryEdit, props: true }, // 编辑分类
        { path: '/categories/list', component: CategoryList }, // 分类列表

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
