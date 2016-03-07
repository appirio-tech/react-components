var path          = require('path')
var karma = require('./node_modules/appirio-tech-webpack-config/karma.conf.js')

module.exports = function(config) {
  config.testsrc = 'components';
  config.dirname = __dirname;
  karma(config);
}