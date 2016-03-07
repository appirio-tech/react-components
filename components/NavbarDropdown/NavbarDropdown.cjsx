'use strict'

require './NavbarDropdown.scss'

React    = require 'react'

NavbarDropdown = 
  getInitialState: ->
    isHidden: true

  onClick: ->
    this.setState({ isHidden: !this.state.isHidden })

  render: ->
    {pointerShadow, noPointer} = this.props

    console.log(this)

    ndClasses = 'NavbarDropdown'
    if pointerShadow
      ndClasses += ' pointer-shadow'
    if noPointer 
      ndClasses += ' pointer-hide'
    if this.state.isHidden
      ndClasses += ' hide'

    <div onClick={ this.onClick }>
      { this.props.children[0] }

      <div className = {ndClasses}>
        { this.props.children[1] }        
      </div>
    </div>

module.exports = React.createClass NavbarDropdown
