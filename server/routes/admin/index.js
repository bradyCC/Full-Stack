/**
 * Created by brady on 2019/6/15.
 */
const express = require('express');

const jwt = require('jsonwebtoken');
const AdminUser = require('../../models/AdminUser');

// const assert = require('http-assert');

module.exports = function() {
  // let router = express.Router({
    // mergeParams: true // 合并参数，用于获取URL参数
  // });
  let router = express.Router();

  // 创建
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 获取列表
  router.get('/', async (req, res, next) => {
    // 获取token
    const token = String(req.headers.authorization || '').split(' ').pop();
    if (!token) {
      return res.status(401).send({message: '请先登录'});
    }
    // 解析token返回id
    const { id } = jwt.verify(token, global.secret);
    if (!id) {
      return res.status(401).send({message: '请先登录'});
    }
    // 查询用户表
    req.user = await AdminUser.findById(id);
    if (!req.user) {
      return res.status(401).send({message: '请先登录'});
    }
    next()
  }, async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    }
    const items = await req.Model.find().setOptions(queryOptions); // limit(10)
    res.send(items);
  });

  // 获取详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 编辑
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  return router;
}
