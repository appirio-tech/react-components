require 'appirio-tech-api-schemas'

React    = require 'react'
ReactDOM = require 'react-dom'
Router   = require './components/Router/Router.cjsx'

ReactDOM.render Router(), document.getElementById('root')

