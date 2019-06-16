const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/index');
const uploadRouter = require('./routes/admin/upload');

const cors = require('cors');
const inflection = require('inflection');

const app = express();

app.use(cors());  // 处理跨域
require('./db')(app); // 链接数据库

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
    const modelName = inflection.classify(req.params.resourse); // 获取参数大写类名
    req.Model = require(`./models/${modelName}`); // 获取Model模型
    next();
}, adminRouter());
app.use('/admin/api/upload', uploadRouter());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
