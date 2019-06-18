const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const inflection = require('inflection');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/index');
const uploadRouter = require('./routes/admin/upload');
const loginRouter = require('./routes/admin/login');

const jwt = require('jsonwebtoken');
const AdminUser = require('./models/AdminUser');

const app = express();

app.use(cors());  // 处理跨域
require('./db')(app); // 链接数据库
global.secret = 'qwert' // 用于生成token

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/upload', express.static(path.join(__dirname, 'public/upload')));

app.use('/', indexRouter);
app.use('/admin/api/rest/:resourse', async (req, res, next) => {
  // 获取token
  const token = String(req.headers.authorization || '').split(' ').pop();
  if (!token) return next(createError(401, '请先登录'))

  // 解析token返回id
  const { id } = jwt.verify(token, global.secret);
  if (!id) return next(createError(401, '请先登录'))

  // 查询用户表
  req.user = await AdminUser.findById(id);
  if (!req.user) return next(createError(401, '请先登录'))
  next()
}, (req, res, next) => {
    const modelName = inflection.classify(req.params.resourse); // 获取参数大写类名
    req.Model = require(`./models/${modelName}`); // 获取Model模型
    next();
}, adminRouter());
app.use('/admin/api/upload', uploadRouter());
app.use('/admin/api/login', loginRouter());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).send({
    message: err.message
  });
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
