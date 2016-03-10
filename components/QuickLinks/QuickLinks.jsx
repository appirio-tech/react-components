'use strict'

require('./QuickLinks.scss')
const Dropdown = require('../Dropdown/Dropdown.jsx')
const StandardListItem = require('../StandardListItem/StandardListItem.cjsx')
const React    = require('react')

const QuickLinks = {
  render() {
    return (
      <div className="QuickLinks">
        <Dropdown pointerShadow>
          <img src={ require('./grid.svg') } className="dropdown-menu-header" />
          <ul className="dropdown-menu-list">
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Review" hideIcon="true" />
            </li>
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Web Arena" hideIcon="true" />
            </li>
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Applet Arena" hideIcon="true" />
            </li>
          </ul>
        </Dropdown>
      </div>
    )
  }
}

module.exports = React.createClass(QuickLinks)
