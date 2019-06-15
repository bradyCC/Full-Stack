/**
 * Created by brady on 2019/6/15.
 */
const express = require('express');
const Category = require('../models/Category');

module.exports = function() {
  let router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  // 创建分类
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  // 获取分类列表
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10);
    res.send(items);
  });

  // 获取分类详情
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });

  // 编辑分类
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  return router;
}
