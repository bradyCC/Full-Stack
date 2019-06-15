/**
 * Created by brady on 2019/6/15.
 */
const express = require('express');
const Categroy = require('../models/Category');

module.exports = function() {
  let router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  // 创建分类
  router.post('/categories', async (req, res) => {
    const model = await Categroy.create(req.body);
    res.send(model);
  });

  // 分类列表
  router.get('/categories', async (req, res) => {
    const items = await Categroy.find().limit(10);
    res.send(items);
  });

  return router;
}
