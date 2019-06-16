/**
 * Created by brady on 2019/6/15.
 */
const express = require('express');

module.exports = function() {
  // let router = express.Router({
    // mergeParams: true // 合并参数，用于获取URL参数
  // });
  let router = express.Router();

  // 创建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 获取分类列表
  router.get('/', async (req, res) => {
    const items = await req.Model.find().populate('parent').limit(10);   // populate 返回关联查询数据
    res.send(items);
  });

  // 获取分类详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 编辑分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  return router;
}
