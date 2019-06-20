var express = require('express');

module.exports = () => {
  const router = express.Router();

  /* GET home page. */
  // router.get('/', (req, res, next) => {
  //   res.render('index', { title: 'Express' });
  // });

  router.get('/', async (req, res, next) => {
    res.send();
  });

  // 获取所有模型
  const mongoose = require('mongoose');
  const Category = mongoose.model('Category');
  const Article = mongoose.model('Article');
  // const Article = require('../../models/Article');

  // 新闻资讯初始化
  router.get('/news/init', async (req, res) => {
    // 获取指定上级分类
    const parent = await Category.findOne({
      name: '新闻资讯',
    });

    // 获取指定上级分类下所有小分类
    const cats = await Category.find().where({
      parent: parent,
    }).lean();

    // 使用 $$('.news_list .title').map(el => el.innerHTML).slice(5) 获取数组数据
    const newsTitles = ["新版本爆料② | 鲁班钟馗喜提新皮，荣耀战令奖励更新！", "新版本爆料①丨S16赛季王者峡谷最新调整，盾山赛季皮肤现身！", "匹配机制优化 | 想玩英雄不重位，阵容搭配新体验！", "夏日新版本“稷下星之队”即将6月上线", "王者荣耀携手两大博物馆 走进稷下学宫", "6月19日全服不停机更新公告", "6月18日全服不停机修复公告", "6月18日全服不停机更新公告", "6月14日安卓建议更新公告", "【已修复】王者大陆的端午宝藏活动页面异常问题说明", "恭喜eStarPro捧起银龙杯 赛末冲刺惊喜礼不断", "【稷下的邀约】活动公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "后半段赛程持续发力，城市赛第十二周将有哪些精彩赛事？", "SRET表演赛快讯：KZ2：0EMC锋芒不减，刻苦训练备战世冠选拔赛"];
    const newsList = newsTitles.map(title => {
      // 生成随机分类
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - .5);
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    });

    // 清空文章表数据
    await Article.deleteMany({});
    // 批量插入数据
    await Article.insertMany(newsList);
    res.send(newsList)
  });

  // 获取新闻资讯列表
  router.get('/news/list', async (req, res) => {
    // 获取列表 populate关联查询
    // const list = await Category.findOne({
    //   name: '新闻资讯',
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList',
    //   }
    // }).lean();
    // res.send(list);

    // 获取指定上级分类
    const parent = await Category.findOne({
        name: '新闻资讯',
    });
    // 聚合查询
    const cats = await Category.aggregate([
      // 设置查询条件
      { $match: { parent: parent._id } }, // match查询
      {
        $lookup: {
          from: 'articles', // 集合名称，模型中未设置默认是模型名复数小写
          localField: '_id', // 键
          foreignField: 'categories', // 关联键
          as: 'newsList', // 命名
        }
      }, // lookup查询
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] } // 每个newsList返回5条数据
        }
      }, // addFields添加/修改字段
    ]);

    // 获取子分类id
    const subCats = cats.map(category => category._id);
    // 添加热门分类
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean(),
    });

    // 处理categoryName
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name == '热门'? news.categories[0].name :cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  return router;
}




