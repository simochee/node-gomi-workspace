const webpack = require('webpack');
const uglifySaveLicense = require('uglify-save-license');

module.exports = {
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: uglifySaveLicense,
      drop_console: true
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
