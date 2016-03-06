'use strict'

NavbarDropdown = require './NavbarDropdown.cjsx'
React    = require 'react'

items = [
	'Link 1',
	'Link 2',
	'Link 3',
];

NavbarDropdownExamples = ->
  <div className="NavbarDropdownExamples flex column middle center">
    <NavbarDropdown links={items} pointerShadow>
    	<a href="javascript:;">Click Me</a>
    </NavbarDropdown>
  </div>

module.exports = NavbarDropdownExamples
