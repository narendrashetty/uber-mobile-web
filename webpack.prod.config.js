const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  'devtool': 'source-map',
  'entry': {
    'app': './src/index.js',
    'vendor': [
      'react',
      'react-redux',
      'redux',
      'react-router',
      'redux-thunk'
    ]
  },
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot!babel'
    }, {
      'test': /\.css$/,
      'loader': ExtractTextPlugin.extract({'fallbackLoader': 'style', 'loader': 'css?modules!postcss!sass'})
    }, {
      'test': /\.(eot|svg|ttf|woff)$/,
      'loader': 'file-loader'
    }, {
      'test': /(\.scss)$/,
      'loader': ExtractTextPlugin.extract({'fallbackLoader': 'style', 'loader': 'css!postcss!sass?modules'})
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
    'path': path.resolve(__dirname, './dist'),
    'publicPath': '/',
    'filename': '[name].[hash].js',
    'chunkFilename': '[name].[hash].js'
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

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.DedupePlugin(),

    new ExtractTextPlugin('[name].css'),

    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'screw_ie8': true,
        'warnings': false,
        'unused': true,
        'dead_code': true
      },
      'output': {
        'comments': false
      },
      'sourceMap': false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  postcss() {
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