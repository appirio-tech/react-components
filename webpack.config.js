require('./node_modules/coffee-script/register')
const webpackConfig = require('appirio-tech-webpack-config')

const config = webpackConfig({
  dirname: __dirname,
  template: './index.html',
  entry: {
    example: [
      'webpack-dev-server/client?http://localhost:8080',
      './example.js'
    ]
  }
})

module.exports = config
