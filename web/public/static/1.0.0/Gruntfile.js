define('Gruntfile', function(require, exports, module) {

  'use strict';
  
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require("extract-text-webpack-plugin");
  
  module.exports = function (grunt) {
      grunt.initConfig({
          webpack: {
              someName: {
                  // webpack options
                  entry: "./index.js",
                  output: {
                      path: "../public/static/",
                      filename: "index-bundle.js"
                  },
  
                  stats: {
                      // Configure the console output
                      colors: false,
                      modules: true,
                      reasons: true
                  },
                  // stats: false disables the stats output
  
                  storeStatsTo: "xyz", // writes the status to a variable named xyz
                  // you may use it later in grunt i.e. <%= xyz.hash %>
  
                  progress: false, // Don't show progress
                  // Defaults to true
  
                  failOnError: false, // don't report error to grunt if webpack find errors
                  // Use this if webpack errors are tolerable and grunt should continue
  
                  watch: true, // use webpacks watcher
                  // You need to keep the grunt process alive
  
                  watchOptions: {
                      aggregateTimeout: 500,
                      poll: true
                  },
                  // Use this when you need to fallback to poll based watching (webpack 1.9.1+ only)
  
                  keepalive: true, // don't finish the grunt task
                  // Use this in combination with the watch option
  
                  inline: true, // embed the webpack-dev-server runtime into the bundle
                  // Defaults to false
  
                  hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode
                  // Use this in combination with the inline option
  
                  module: {
                      loaders: [{
                          test: /\.css$/,
                          loader: ExtractTextPlugin.extract('css-loader?sourceMap')
                      }, {
                          test: /\.less$/,
                          loader: ExtractTextPlugin.extract('css-loader?sourceMap!' + 'less-loader?sourceMap')
                          // loader: 'style!css!less'
                      }, {
                          test: /\.js$/,
                          loader: 'babel-loader',
                          query: {
                              presets: ['es2015']
                          }
                      }, {
                          test: /\.jsx?$/,
                          loader: 'babel-loader',
                          query: {
                              presets: ['react', 'es2015']
                          }
                      }]
                  },
                  resolve: {
                      // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
                      extensions: ['', '.js', '.json', '.coffee', '.jsx']
                  },
                  plugins: [
                  // 脚本压缩
                  // new webpack.optimize.UglifyJsPlugin({
                  //     compress: {
                  //         warnings: false
                  //     }
                  // }),
                  new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurenceOrderPlugin(), new webpack.DefinePlugin({
                      // 定义环境
                      ''development'': JSON.stringify('production')
                  }), new HtmlWebpackPlugin({
                      // title: 'your title',
                      template: './index.html',
                      // favicon: './static/images/logo.png'
  
                      files: {
                          chunks: {
                              head: {
                                  entry: "assets/head_bundle.js",
                                  css: ""
                              },
                              main: {
                                  entry: "index-bundle.js"
                              }
                          }
                      }
                  }), new ExtractTextPlugin("styles.css")]
              }
          }
      });
  
      // anotherName: {...}
      grunt.loadNpmTasks('grunt-webpack');
      grunt.loadNpmTasks('grunt-contrib-watch');
  
      grunt.registerTask('default', ['webpack', 'watch']);
  };

});
