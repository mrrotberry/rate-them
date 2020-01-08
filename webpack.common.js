const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const productionMode = process.env.NODE_ENV === 'production';

const config = {
  entry: [/*'core-js/stable',*//*'@babel/polyfill',*/ path.resolve(__dirname, 'src/index.tsx')],
  output: {
    filename: 'js/bundle.[hash:16].min.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      configs: path.resolve(__dirname, 'src/configs'),
      context: path.resolve(__dirname, 'src/context'),
      shared: path.resolve(__dirname, 'src/shared'),
      storage: path.resolve(__dirname, 'src/storage'),
      types: path.resolve(__dirname, 'src/types'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
              failOnWarning: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: productionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            options: {
              [productionMode ? 'publicPath' : 'injectType']: productionMode ? '../' : 'styleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !productionMode,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: productionMode ? false : 'inline',
            },
          },
        ],
      },
      /*{
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
        exclude: [path.resolve(__dirname, 'src/assets/fonts'), path.resolve(__dirname, 'src/assets/icons')],
      },*/
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images/',
        },
        include: [path.resolve(__dirname, 'src/assets')],
      },
      {
        test: /\.eot|ttf|woff|woff2$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'Rate Them',
      description: 'Application for rating your colleagues',
      favicon: path.resolve(__dirname, 'public/favicon.png'),
      buildDatetime: new Date(Date.now()).toLocaleString(),
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};

module.exports = config;
