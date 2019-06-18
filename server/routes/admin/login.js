/**
 * Created by brady on 2019/6/17.
 */
const express = require('express');
const AdminUser = require('../../models/AdminUser');

const createError = require('http-errors');

module.exports = function() {
  let router = express.Router();

  router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    // 1.验证用户名是否存在
    if (!username) return next(createError(422, '请输入用户名'));
    const user = await AdminUser.findOne({username}).select('+password');
    if (!user) return next(createError(422, '用户不存在'));

    // 2.校验密码
    if (!password) return next(createError(422, '请输入密码'));
    const isValid = require('bcrypt').compareSync(password, user.password);
    if (!isValid) return next(createError(422, '密码错误'));

    // 3.返回token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, global.secret);
    res.send({token})
  });

  return router;
}

