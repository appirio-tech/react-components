'use strict'

NavbarDropdown = require './NavbarDropdown.cjsx'
React    = require 'react'

items = [
	'Review',
	'Web Arena',
	'Applet Arena',
];

NavbarDropdownExamples = ->
  <div className="NavbarDropdownExamples flex column middle center">
    <NavbarDropdown pointerShadow>
    	<div className="dropdown-menu-header"></div>
    	<ul className="dropdown-menu-list">
        {
          items?.map (link, i) ->
            <li key={i}>
              <a href="javascript:;">{link}</a>
            </li>
        }
        </ul>
    </NavbarDropdown>
  </div>

module.exports = NavbarDropdownExamples
