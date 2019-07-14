# Node-Vue 全栈项目

## 一、项目结构
1. web - 前端项目
2. admin - 管理后台
3. server - 后端项目

## 二、项目搭建
1. 初始化 - 使用前端Vue框架搭建web、admin，使用Node.js的Express框架搭建server

## 三、管理后台 
1.基于Element UI 的管理后台基础搭建

2.新建分类（多层级）

3.分类列表

4.编辑分类

5.删除分类

6.子分类关联

7.通用 CRUD 接口 - 定义接口时设置动态参数，处理请求时，优先将动态参数用于匹配对应的Model类，使用inflection 将小写转为对应大写，通过next() 传递给后续操作

8.装备管理

9.图片上传（multer）

10.英雄管理

11.编辑英雄（关联、多选el-select, multiple）

12.编辑技能

13.文章管理

14.广告位管理

15.管理员账号管理 (bcrypt) - 密码设置使用散列函数（安全性）

16.登录页面

17.登录接口（jwt, jsonwebtoken）

18.服务端登录校验（中间件封装）

19.客户端路由限制（beforeEach, meta）

20.上传文件校验（Vue.mixin, el-upload, headers）

## 四、移动端网站
1."工具样式"概念和SASS（SCSS）

2.样式重置

3.网站色彩和字体定义（colors, text）

4.通用flex布局样式定义（flex）

5.常用边距定义（margin, padding）

6.首页顶部轮播推片（vue swiper）

7.使用字体图标（iconfont）

8.使用精灵图片（sprite）

9.卡片组件（card）

10.列表卡片组件（list-card, nav, swiper）

11.首页新闻资讯 - 数据导入
+ $$('')在浏览器控制台中获取所有新闻标题
```javascript
//例：
$$('.news_list .title').map(el => el.innerHTML)
```
+ npm i require-all 引入文件夹中的所有文件
+ npm i dayjs 日期时间格式化

12.首页新闻资讯 - 获取数据接口

13.首页新闻资讯 - 前端数据渲染 

14.首页英雄列表 - 数据导入
+ $$('')在浏览器控制台中获取所有英雄分类、头像、名称
```javascript
// 例：
JSON.stringify($$('.hero-nav > li').map((li, index) => {
  return {
    name: li.innerText,
		heroes: $$('li', $$('.hero-list')[index]).map(el => {
		  return {
			name: $$('h3', el)[0].innerHTML,
			avatar: $$('img', el)[0].src,
	      }	
	    })
  }
}))
```

15.首页英雄列表 - 获取数据接口

16.首页英雄列表 - 前端数据渲染

17.新闻详情页

18.英雄详情页


## 五、发布和部署（阿里云）

1. 生产环境编译 

2. 购买域名和服务器

3. 域名解析

4. Nginx 安装和配置

5. MongoDB数据库 安装和配置

6. git 安装、配置ssh-key

7. Node.js 安装、配置淘宝镜像

8. 拉取代码、安装pm2并启动项目


## 六、项目地址
GitHub: [Full-Stack](https://github.com/bradyCC/Full-Stack)

## 七、模块
1.lodash
```javascript
// 安装
npm i lodash --save

// 引入
const _ = require('lodash')

// 用法：
const obj = {'a': [{ 'b': { 'c': '0'} }] };
_.get(obj, 'a[0].b.c')   // 0
_.get(obj, 'a[0].d.c') // undefined
_.get(obj, 'a[0].d.c', null) // null
```

2.axios
```javascript
// 安装 
npm i axios

// 引入 
const axios = require('axios')

// 用法：
const http = axios.create({ baseURL: 'https://api/github.com/' })
http.get('repos/vuejs/vue').then((res) => {}) 

// 处理token
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
```

3.inflection
```javascript
// 安装 
npm i inflection

// 引入 
const inflection = require('inflection')

// 用法：
inflection.classify('users') // User
````

4.dayjs
```javascript
// 安装 
npm i dayjs

// 引入 
const dayjs = require('dayjs')

// 用法：
dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss') // 2019-06-22 17:09:00
dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss') // 2019-06-21 00:00:00
```

## 七、相关资料
[Vue](https://cn.vuejs.org)<br/>
[VueRouter](https://router.vuejs.org/)<br/>
[ElementUi](https://element.eleme.cn/)<br/>
[Node](https://nodejs.org/)<br/>
[Express](http://www.expressjs.com.cn/)<br/>
[Mongodb](https://docs.mongodb.com/)<br/>
