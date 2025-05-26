const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

// 日志中间件
app.use(logger('dev'));

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 路由
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 404 处理
app.use((req, res, next) => {
  res.status(404);
  res.render('error', { title: '404 Not Found', message: '页面未找到', error: {} });
});

// 错误处理
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { title: '错误', message: err.message, error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务已启动：http://localhost:${PORT}`);
});

module.exports = app;