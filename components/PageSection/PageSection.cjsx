'use strict'

require './PageSection.scss'
Loader = require '../Loader/Loader.cjsx'

React = require 'react'

PageSection = 
  render: ->
    <div className="PageSection">
      {
        if this.props.contentState == 'READY'
          <div className="page-section__content">
            {this.props.children}
          </div>
      }
      {
        if this.props.contentState == 'LOADING'
          <div className="page-section__progress">
            <Loader />
          </div>
      }
    </div>

module.exports = React.createClass PageSection
