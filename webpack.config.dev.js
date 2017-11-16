const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/javascripts/entry'
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
