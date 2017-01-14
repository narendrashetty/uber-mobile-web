const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

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
      'react-router',
      'redux-thunk',
      'object-assign'
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
      'loader': 'file?name=static/fonts/[name].[ext]'
    }, {
      'test': /\.(jpg|png|ico)$/,
      'loader': 'file?name=static/images/[name].[ext]'
    }, {
      'test': /(\.scss)$/,
      'loader': ExtractTextPlugin.extract('style', 'css!postcss!sass?modules')
    }, {
      'test': /manifest.json$/,
      'loader': 'file?name=manifest.json'
    }]
  },
  'resolve': {
    'extensions': ['', '.js', '.sass', '.json'],
    'alias': {
      'mapbox-gl/js/geo/transform': path.join(__dirname, "/node_modules/mapbox-gl/js/geo/transform"),
      'mapbox-gl': path.join(__dirname, "/node_modules/mapbox-gl/dist/mapbox-gl.js")
    }
  },
  'output': {
    'path': __dirname + '/dist',
    'publicPath': '/',
    'filename': 'static/js/[name].[hash].js',
    'chunkFilename': 'static/js/[name].[hash].js',
  },
  'devServer': {
    'contentBase': './dist',
    'hot': true
  },
  'plugins': [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity,
      filename: 'static/js/[name].[hash].js',
    }),

    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html',
      'inject': 'body'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('static/css/[name].[hash].css'),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './src/sw.js')
    })
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
  }
};