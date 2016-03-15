require('./QuickLinks.scss')

import React, { Component } from 'react'
import Dropdown from '../Dropdown/Dropdown'

import StandardListItem  from '../StandardListItem/StandardListItem'

class QuickLinks extends Component {
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

export default QuickLinks