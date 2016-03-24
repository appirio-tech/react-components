webpackConfig = require 'appirio-tech-webpack-config'
webpack = require('webpack')
ExtractTextPlugin = require('extract-text-webpack-plugin')

config = webpackConfig
  dirname: __dirname
  template: './index.html'
  entry:
    TCNavComponents: [
      './index.coffee'
    ]

# exports javascript as library
config.output.filename = '[name].js';
config.output.publicPath = 'https://s3.amazonaws.com/components.topcoder-dev.com/'
config.output.library = '[name]';
config.output.libraryTarget = 'var'

# CSS file without hash name
config.plugins.push new ExtractTextPlugin '[name].css'

# React would be provided externally by the application using the components
config.externals =
  "react"       : "React"
  "react-dom"   : "ReactDOM"
  "moment"      : "moment"

module.exports = config
