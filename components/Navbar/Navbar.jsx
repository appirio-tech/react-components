'use strict'

import MenuBar from '../MenuBar/MenuBar.jsx'

require('./Navbar.scss')
const React             = require('react')
const SearchBar         = require('../SearchBar/SearchBar.jsx')
const QuickLinks        = require('../QuickLinks/QuickLinks.jsx')
const UserDropdownMenu  = require('../UserDropdownMenu/UserDropdownMenu.jsx')

const primaryNavigationItems = [
  {img: '../components/MenuBar/nav-community.svg', text: 'Community', link: 'javascript:;'},
  {img: '../components/MenuBar/nav-compete.svg', text: 'Compete', link: 'javascript:;', selected: true},
  {img: '../components/MenuBar/nav-learn.svg', text: 'Learn', link: 'javascript:;'}
]

const Navbar = {
  render() {
    const dom = (
      <div className="Navbar flex middle space-between">
        <div className="topcoder-logo"></div>
        <div className="search-bar-wrap">
          <div className="icon-placeholder"></div>
          <SearchBar />
        </div>
        <MenuBar items={primaryNavigationItems} mobileBreakPoint={767} orientation="horizontal" />
        <div className="collapse-group">
          <div className="icon-placeholder"></div>
          <div className="quick-links-wrap"><QuickLinks /></div>
          <UserDropdownMenu username="vic-tor" />
        </div>
      </div>
    )

    return dom
  }
}

module.exports = React.createClass(Navbar)
