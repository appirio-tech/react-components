'use strict'

require('./UserDropdownMenu.scss')

import React, { Component } from 'react'
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

class UserDropdownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = { isLoggedIn: true }
  }

  render() {
    const publicDOM = <div><button>Log in</button><button>Join</button></div>
    const loggedInDOM = (
      <div className="UserDropdownMenu">
        <Dropdown pointerShadow>
          <div className="dropdown-menu-header">
            <span className="user-image"></span>
            <span className="username">{ this.props.username }</span>
            <img className="dropdown-arrow" src={ require('./arrow-small-down.svg') } />
          </div>
  
          <div className="user-menu-items-list">
            {
              userDropdownLists.map((list, i) => {
                return ( <ul key={ i }>
                  {
                    list.map((link, j) => {
                      return <li className="user-menu-item" key={ j }><a href={ link.link }>{ link.label }</a></li>
                    })
                  }
                </ul> )
              })
            }

          </div>
        </Dropdown>
      </div>
    )

    return this.state.isLoggedIn ? loggedInDOM : publicDOM
  }
}

export default UserDropdownMenu