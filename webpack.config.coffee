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

# import X from Y added to files when using these globals
config.plugins.push(new webpack.ProvidePlugin({
  React: 'react'
}))

<<<<<<< HEAD
module.exports = config
=======
module.exports = config
>>>>>>> dev
