require('./Navbar.scss')

import MenuBar from '../MenuBar/MenuBar'
import React, { Component } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import QuickLinks from '../QuickLinks/QuickLinks'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu'

const primaryNavigationItems = [
  {img: require('./nav-community.svg'), text: 'Community', link: '/community'},
  {img: require('./nav-compete.svg'), text: 'Compete', link: '/compete', selected: true},
  {img: require('./nav-learn.svg'), text: 'Learn', link: '/learn'}
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
