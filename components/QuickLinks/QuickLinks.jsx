'use strict'

require('./QuickLinks.scss')
const Dropdown = require('../Dropdown/Dropdown.jsx')
const React    = require('react')

import StandardListItem  from '../StandardListItem/StandardListItem.jsx'

const QuickLinks = {
  render() {
    return (
      <div className="QuickLinks">
        <Dropdown pointerShadow>
          <img src={ require('./grid.svg') } className="dropdown-menu-header" />
          <ul className="dropdown-menu-list">
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Review" showIcon={false} />
            </li>
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Web Arena" showIcon={false} />
            </li>
            <li className="dropdown-menu-list-item">
              <div className="icon-placeholder"></div>
              <StandardListItem labelText="Applet Arena" showIcon={false} />
            </li>
          </ul>
        </Dropdown>
      </div>
    )
  }
}

module.exports = React.createClass(QuickLinks)
