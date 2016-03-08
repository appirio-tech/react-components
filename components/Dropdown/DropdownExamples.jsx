'use strict'

var Dropdown = require('./Dropdown.jsx'),
    React    = require('react'),
    items = [
      'Review',
      'Web Arena',
      'Applet Arena',
    ];

var DropdownExamples = {
  render: function() {
    var dom = 
        <div className="dropdown-example-wrap">
          <Dropdown className="Dropdown" pointerShadow>
            <a className="dropdown-menu-header">Click Here</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>
      
    return dom;
  }
}

module.exports = React.createClass(DropdownExamples);
