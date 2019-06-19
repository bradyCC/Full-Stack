import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

// 登录
import Login from './views/Login'
// 分类
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'
// 物品
import ItemEdit from './views/ItemEdit'
import ItemList from './views/ItemList'
// 英雄
import HeroEdit from './views/HeroEdit'
import HeroList from './views/HeroList'
// 文章
import ArticleEdit from './views/ArticleEdit'
import ArticleList from './views/ArticleList'
// 广告位
import AdEdit from './views/AdEdit'
import AdList from './views/AdList'
// 管理员
import AdminUserEdit from './views/AdminUserEdit'
import AdminUserList from './views/AdminUserList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'Login', component: Login, meta: { isPublic: true } },
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

        { path: '/articles/create', component: ArticleEdit }, // 创建文章
        { path: '/articles/edit/:id', component: ArticleEdit, props: true }, // 编辑文章
        { path: '/articles/list', component: ArticleList }, // 文章列表

        { path: '/ads/create', component: AdEdit }, // 创建广告位
        { path: '/ads/edit/:id', component: AdEdit, props: true }, // 编辑广告位
        { path: '/ads/list', component: AdList }, // 广告位列表

        { path: '/admin_users/create', component: AdminUserEdit }, // 创建管理员
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true }, // 编辑管理员
        { path: '/admin_users/list', component: AdminUserList }, // 管理员列表
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
