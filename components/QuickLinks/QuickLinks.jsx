require('./QuickLinks.scss')

import React from 'react'
import Dropdown from '../Dropdown/Dropdown'

import StandardListItem  from '../StandardListItem/StandardListItem'

const QuickLinks = ({domain}) => {
  const orLink = '//software.' + domain
  const arenaLink = '//arena.' + domain
  const arenaAppletLink = '//' + domain + '/contest/arena/ContestAppletProd.jnlp'
  return (
    <div className="QuickLinks">
      <Dropdown pointerShadow>
        <img src={ require('./grid.svg') } className="dropdown-menu-header" />
        <ul className="dropdown-menu-list">
          <li className="dropdown-menu-list-item">
            <StandardListItem labelText="Review" imgSrc={require('./placeholder.svg')} linkUrl={orLink} linkTarget="_blank" />
          </li>
          <li className="dropdown-menu-list-item">
            <StandardListItem labelText="Web Arena" imgSrc={require('./placeholder.svg')} linkUrl={arenaLink} linkTarget="_blank" />
          </li>
          <li className="dropdown-menu-list-item">
            <StandardListItem labelText="Applet Arena" imgSrc={require('./placeholder.svg')} linkUrl={arenaAppletLink} linkTarget="_blank" />
          </li>
        </ul>
      </Dropdown>
    </div>
  )
}

export default QuickLinks