const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// React HMR
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({
  varify (req, res, buf) {
    req.rawBody = buf;
  }
}));
app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
  res.render('index');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// サーバー起動
const port = process.env.PORT || 43000;
app.listen(port, () => {
  console.log('Express listening on port', port); // eslint-disable-line
});
