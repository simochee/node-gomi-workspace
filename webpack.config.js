const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const config = process.env.NODE_ENV === 'production' ?
  require('./webpack.config.prod') :
  require('./webpack.config.dev');

const common = {
  entry: './src/javascripts/entry.js',
  output: {
    path: path.resolve('./public/javascripts'),
    publicPath: '/javascripts/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?|\.jsx?/,
      exclude: /node_modules/,
      include: path.resolve('src/'),
      loader: 'babel-loader'
    }, {
      enforce: 'pre',
      test: /\.js?|\.jsx?/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = merge(common, config);
