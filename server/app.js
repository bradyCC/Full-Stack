const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors'); // 处理跨域

// 定义路由
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/index');
const uploadRouter = require('./routes/admin/upload');
const loginRouter = require('./routes/admin/login');

const app = express();

app.use(cors());  // 处理跨域
require('./plugins/db')(app); // 链接数据库
// global.secret = 'qwert'
app.set('secret', 'qwert'); // 用于生成token

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态文件托管
app.use('/', express.static(path.join(__dirname, '/web')));
app.use('/admin', express.static(path.join(__dirname, '/admin')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/upload', express.static(path.join(__dirname, 'public/upload')));

// 登录校验中间件
const authMiddleware = require('./middleware/auth');

// 资源中间件
const resourceMiddleware = require('./middleware/resource')

// 前端路由
app.use('/web/api', indexRouter());
// 管理后台路由
app.use('/admin/api/rest/:resourse', authMiddleware(), resourceMiddleware(), adminRouter());
// 文件上传路由
app.use('/admin/api/upload', authMiddleware(), uploadRouter());
// 登录路由
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
