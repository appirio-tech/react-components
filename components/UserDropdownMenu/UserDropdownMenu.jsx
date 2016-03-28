require('./UserDropdownMenu.scss')

import React from 'react'
import Dropdown from '../Dropdown/Dropdown'

const userDropdownLists = [
  [
    { label: 'My Profile', link: 'javascript:;', id: 0 },
    { label: 'Dashboard', link: 'javascript:;', id: 1 },
    { label: 'Settings', link: 'javascript:;', id: 2 },
    { label: 'Payments', link: 'javascript:;', id: 3 }
  ],
  [
    { label: 'Help', link: 'javascript:;', id: 0 }
  ],
  [
    { label: 'Log out', link: 'javascript:;', id: 0 }
  ]
]

const UserDropdownMenu = ({username}) => {

  const publicDOM = (
    <div className="UserDropdownMenu non-logged-in">
      <button className="login-button tc-btn tc-btn-s tc-btn-ghost">Log in</button>
      <button className="join-button tc-btn tc-btn-s">Join</button>
    </div>
  )
  
  const loggedInDOM = (
    <div className="UserDropdownMenu">
      <Dropdown pointerShadow>
        <div className="dropdown-menu-header">
          <span className="user-image"></span>
          <span className="username">{ username }</span>
          <img className="dropdown-arrow" src={ require('./arrow-small-down.svg') } />
        </div>

        <div className="dropdown-menu-list">
          {
            userDropdownLists.map((list, i) => {
              return ( <ul key={ i }>
                {
                  list.map((link, j) => {
                    return <li className="user-menu-item transition" key={ j }><a href={ link.link }>{ link.label }</a></li>
                  })
                }
              </ul> )
            })
          }

        </div>
      </Dropdown>
    </div>
  )

  return username ? loggedInDOM : publicDOM
}

export default UserDropdownMenu