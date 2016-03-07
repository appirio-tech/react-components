'use strict'

require('./UserDropdownMenu.scss');

var React = require('react'),
    NavbarDropdown = require('../NavbarDropdown/NavbarDropdown.jsx'),
    userDropdownLists = [
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
    ];

var UserDropdownMenu = {
  getInitialState: function () {
    return { isLoggedIn: true };
  },
  render: function() {
    var dom;

    if (!this.state.isLoggedIn) {
      dom = <span>Not Logged In</span>;
    } else {
      dom = <div className="UserDropdownMenu">
          <NavbarDropdown pointerShadow>
            <div className="dropdown-menu-header">
              <span className="user-image"></span>
              <span className="username">vic-tor</span>
              <img className="dropdown-arrow" src={ require('./arrow-small-down.svg') } />
            </div>
    
            <div className="user-menu-items-list">
              {
                userDropdownLists.map(function(list, i) {
                  return ( <ul key={ i }>
                    {
                      list.map(function(link, j) {
                        return <li className="user-menu-item" key={ j }><a href={ link.link }>{ link.label }</a></li>
                      })
                    }
                  </ul> )
                })
              }

            </div>
          </NavbarDropdown>
        </div>
    }

    return dom;
    }
  }

module.exports = React.createClass(UserDropdownMenu);
