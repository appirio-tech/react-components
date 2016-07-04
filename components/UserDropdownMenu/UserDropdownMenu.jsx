require('./UserDropdownMenu.scss')

import React, {PropTypes} from 'react'
import Avatar from '../Avatar/Avatar'
import Dropdown from '../Dropdown/Dropdown'


const UserDropdownMenu = ({username, userImage, domain, loginUrl, registerUrl}) => {

  const userDropdownLists = [
    [
      { label: 'My Profile', link: '/profile/' + username, id: 0 },
      { label: 'Dashboard', link: '/my-dashbaord', id: 1 },
      { label: 'Settings', link: '/settings/profile', id: 2 },
      { label: 'Payments', link: '//community.' + domain  + '/PactsMemberServlet?module=PaymentHistory&full_list=false', id: 3 }
    ],
    [
      { label: 'Help', link: '//help.' + domain, id: 0 }
    ],
    [
      { label: 'Log out', link: '/logout', id: 0 }
    ]
  ]

  const publicDOM = (
    <div className="UserDropdownMenu non-logged-in">
      <a className="login-button tc-btn tc-btn-primary tc-btn-sm" href={loginUrl} >Log in</a>
      <a className="join-button tc-btn tc-btn-secondary tc-btn-sm" href={registerUrl} >Join</a>
    </div>
  )
  
  const loggedInDOM = (
    <div className="UserDropdownMenu">
      <Dropdown pointerShadow>
        <div className="dropdown-menu-header">
          <span className="user-image"><Avatar avatarUrl={userImage} /></span>
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

UserDropdownMenu.propTypes = {
  username      : PropTypes.string,
  userImage     : PropTypes.string,
  domain        : PropTypes.string.isRequired,
  loginUrl      : PropTypes.string,
  registerUrl   : PropTypes.string
}

UserDropdownMenu.defaultProps = {
  loginUrl      : '/login',
  registerUrl   : '/register'
}

export default UserDropdownMenu