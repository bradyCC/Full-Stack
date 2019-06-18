/**
 * Created by brady on 2019/6/18.
 */
const createError = require('http-errors');
// 处理token
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

module.exports = options => {

  return async (req, res, next) => {
    // 获取token
    const token = String(req.headers.authorization || '').split(' ').pop();
    if (!token) return next(createError(401, '请先登录'))

    // 解析token返回id
    const { id } = jwt.verify(token, req.app.get('secret'));
    if (!id) return next(createError(401, '请先登录'))

    // 查询用户表
    req.user = await AdminUser.findById(id);
    if (!req.user) return next(createError(401, '请先登录'))

    next()
  }
}
