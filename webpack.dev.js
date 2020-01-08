const path = require('path');

const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 3030,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist/'),
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    // open: true,
  },
  plugins: [new ErrorOverlayPlugin(), ProgressBarPlugin()],
});
