webpackConfig = require 'appirio-tech-webpack-config'
webpack = require('webpack')

config = webpackConfig
  dirname: __dirname
  template: './index.html'
  entry:
    TCNavComponents: [
      './index.coffee'
    ]

config.output.filename = 'TCNavComponents.[name].js';
config.output.publicPath = 'http://local.topcoder.com/mf/js/app/header/partials/'
config.output.libraryTarget = 'var'
console.log config.output


config.externals = {"react" : "React"}

module.exports = config
