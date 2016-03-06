'use strict'

require './NavbarDropdown.scss'

React    = require 'react'

NavbarDropdown = 
  getInitialState: ->
    isHidden: true

  onClick: ->
    this.setState({ isHidden: !this.state.isHidden })

  render: ->
    {links, pointerShadow, noPointer} = this.props

    ndClasses = 'NavbarDropdown'
    if pointerShadow
      ndClasses += ' pointer-shadow'
    if noPointer 
      ndClasses += ' pointer-hide'
    if this.state.isHidden
      ndClasses += ' hide'

    <div onClick={ this.onClick }>
      { this.props.children }

      <div className = {ndClasses}>
        <ul>
        {
          links?.map (link, i) ->
            <li key={i}>
              <a href="javascript:;">{link}</a>
            </li>
        }
        </ul>
      </div>
    </div>

module.exports = React.createClass NavbarDropdown
