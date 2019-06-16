import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'
import ItemEdit from './views/ItemEdit'
import ItemList from './views/ItemList'
import HeroEdit from './views/HeroEdit'
import HeroList from './views/HeroList'

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
        { path: '/items/create', component: ItemEdit }, // 创建物品
        { path: '/items/edit/:id', component: ItemEdit, props: true }, // 编辑物品
        { path: '/items/list', component: ItemList }, // 物品列表
        { path: '/heros/create', component: HeroEdit }, // 创建英雄
        { path: '/heros/edit/:id', component: HeroEdit, props: true }, // 编辑英雄
        { path: '/heros/list', component: HeroList }, // 英雄列表
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
