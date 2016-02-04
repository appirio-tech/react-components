require './ExampleApp.scss'

React               = require 'react'
ExampleNavContainer = require '../ExampleNav/ExampleNavContainer'

component =
  render: ->
    <div className="ExampleApp">
      <main>{this.props.children}</main>

      <ExampleNavContainer />
    </div>



module.exports = React.createClass component

