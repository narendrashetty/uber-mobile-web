const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css',
  'postcss-loader',
  'sass'
];

module.exports = {
  'devtool': 'inline-source-map',
  'entry': {
    'app': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    'vendor': [
      'react',
      'react-redux',
      'redux',
      'react-router'
    ]
  },
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot!babel'
    }, {
      'test': /\.css$/,
      'loader': ExtractTextPlugin.extract('style', 'css?modules!postcss!sass')
    }, {
      'test': /\.(eot|svg|ttf|woff)$/,
      'loader': 'file-loader'
    }, {
      'test': /(\.scss)$/,
      'loader': ExtractTextPlugin.extract('style', 'css!postcss!sass?modules')
    }, {
      'test': /(\.json)$/,
      'loader': 'json-loader'
    }]
  },
  'resolve': {
    'extensions': ['', '.js', '.sass'],
    'alias': {
      'mapbox-gl/js/geo/transform': path.join(__dirname, "/node_modules/mapbox-gl/js/geo/transform"),
      'mapbox-gl': path.join(__dirname, "/node_modules/mapbox-gl/dist/mapbox-gl.js")
    }
  },
  'output': {
    'path': __dirname + '/dist',
    'publicPath': '/',
    'filename': '[name].[hash].js'
  },
  'devServer': {
    'contentBase': './dist',
    'hot': true
  },
  'plugins': [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity,
      filename: '[name].[hash].js',
    }),

    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html',
      'inject': 'body'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: function () {
    return [autoprefixer({
      'browsers': [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    })];
  },
  'node': {
    'fs': 'empty'
  }
};