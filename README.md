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

11.首页新闻资讯
+ $$('')在控制台中获取所有新闻标题，例：$$('.news_list .title').map(el => el.innerHTML)
+ npm i require-all 引入文件夹中的所有文件
+ npm i dayjs 日期时间格式化

12.首页英雄列表

13.新闻详情页

14.英雄详情页

## 五、项目地址
GitHub: [Full-Stack](https://github.com/bradyCC/Full-Stack)

## 六、相关资料
[Vue](https://cn.vuejs.org)<br/>
[VueRouter](https://router.vuejs.org/)<br/>
[ElementUi](https://element.eleme.cn/)<br/>
[Node](https://nodejs.org/)<br/>
[Express](http://www.expressjs.com.cn/)<br/>
[Mongodb](https://docs.mongodb.com/)<br/>
