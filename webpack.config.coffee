webpackConfig = require 'appirio-tech-webpack-config'
webpack = require('webpack')

config = webpackConfig
  dirname: __dirname
  template: './index.html'
  entry:
    example: [
      'webpack-dev-server/client?http://localhost:8080'
      './example.coffee'
    ]

module.exports = config
