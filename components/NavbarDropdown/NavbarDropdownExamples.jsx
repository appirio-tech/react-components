'use strict'

var NavbarDropdown = require('./NavbarDropdown.jsx'),
    React    = require('react'),
    items = [
    	'Review',
    	'Web Arena',
    	'Applet Arena',
    ];

var NavbarDropdownExamples = {
  render: function() {
    return 
      (
        <div className="NavbarDropdownExamples flex column middle center">
          <NavbarDropdown pointerShadow>
            <div className="dropdown-menu-header"></div>
            <ul className="dropdown-menu-list">
              if (items) 
              {
                items.map(function() {
                  return
                    (
                      <li key={i}>
                        <a href="javascript:;">{link}</a>
                      </li>   
                    );
                })
              }
              </ul>
          </NavbarDropdown>
        </div>
      )
  }
}

module.exports = React.createClass(NavbarDropdownExamples);
