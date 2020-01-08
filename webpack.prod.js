const path = require('path');

const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[hash:16].min.css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'public/favicon.png'),
      favicons: {
        appName: 'Rate Them',
        appShortName: 'Rate Them',
        orientation: 'portrait',
        display: 'standalone',
        lang: 'en-US',
        start_url: '/index.html',
        background: '#2d3436',
        theme_color: '#2d3436',
        loadManifestWithCredentials: true,
        appleStatusBarStyle: 'black-translucent',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new RobotstxtPlugin({
      filePath: '/robots.txt',
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(css|js|html)$/,
      minRatio: 0.4,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
    }),
  ],
});
