require './ExampleApp.scss'

React      = require 'react'
ExampleNav = require '../ExampleNav/ExampleNav.cjsx'

component =
  render: ->
    <div className="ExampleApp">
      <main>{this.props.children}</main>

      <ExampleNav />
    </div>



module.exports = React.createClass component

