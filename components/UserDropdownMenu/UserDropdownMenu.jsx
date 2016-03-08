'use strict'

require('./UserDropdownMenu.scss')

const React = require('react')
const Dropdown = require('../Dropdown/Dropdown.jsx')
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

const UserDropdownMenu = {
  getInitialState () {
    return { isLoggedIn: true }
  },
  render() {
    let dom

    if (!this.state.isLoggedIn) {
      dom = <div><button>Log in</button><button>Join</button></div>
    } else {
      dom = <div className="UserDropdownMenu">
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
    }

    return dom
  }
}

module.exports = React.createClass(UserDropdownMenu)