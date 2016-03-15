require('./Navbar.scss')

import MenuBar from '../MenuBar/MenuBar'
import React, { Component } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import QuickLinks from '../QuickLinks/QuickLinks'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu'

const primaryNavigationItems = [
  {img: '../components/MenuBar/nav-community.svg', text: 'Community', link: 'javascript:;'},
  {img: '../components/MenuBar/nav-compete.svg', text: 'Compete', link: 'javascript:;', selected: true},
  {img: '../components/MenuBar/nav-learn.svg', text: 'Learn', link: 'javascript:;'}
]

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar flex middle space-between">
        <div className="topcoder-logo"></div>
        <div className="search-bar-wrap">
          <div className="icon-placeholder"></div>
          <SearchBar />
        </div>
        <MenuBar items={primaryNavigationItems} orientation="horizontal" />
        <div className="collapse-group">
          <div className="icon-placeholder"></div>
          <div className="quick-links-wrap"><QuickLinks /></div>
          <UserDropdownMenu username="vic-tor" />
        </div>
      </div>
    )
  }
}

export default Navbar
