require('./Navbar.scss')

import MenuBar from '../MenuBar/MenuBar'
import React, {PropTypes, Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import QuickLinks from '../QuickLinks/QuickLinks'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu'
import TopcoderLogo from '../Icons/TopcoderLogo'
import TopcoderMobileLogo from '../Icons/TopcoderMobileLogo'
import HamburgerIcon from '../Icons/HamburgerIcon'

const primaryNavigationItems = [
  {img: require('./nav-community.svg'), text: 'Community', link: '/community'},
  {img: require('./nav-compete.svg'), text: 'Compete', link: '/compete', selected: true},
  {img: require('./nav-learn.svg'), text: 'Learn', link: '/learn'}
]

// properties: username, domain, mobileMenuUrl, searchSuggestionsFunc
// searchSuggestionsFunc should return a Promise object

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.updateSearchSuggestions = this.updateSearchSuggestions.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.state = {searchSuggestions: [], recentTerms: []}
  }

  handleTermChange(searchBar, oldTerm, searchTerm, callback) {
    // TODO should we check for the return value of the search suggestion function to be promise?
    this.props.searchSuggestionsFunc.apply(searchBar, [searchTerm])
    .then(this.updateSearchSuggestions)
    .then(data => {
      callback.apply(searchBar, [searchBar, data])
    })
  }

  updateSearchSuggestions(data) {
    this.setState({searchSuggestions: data})
    return data
  }

  render() {
    const username = this.props.username
    const domain = this.props.domain
    const mobileMenuUrl = this.props.mobileMenuUrl
    return (
      <div className="Navbar flex middle space-between">
        <div className="topcoder-logo non-mobile">
          <TopcoderLogo width={155}/>
        </div>
        <div className="topcoder-logo mobile">
          <TopcoderMobileLogo width={40} />
        </div>
        <div className="search-bar-wrap">
          <div className="icon-placeholder"></div>
          <SearchBar recentTerms={this.state.recentTerms} suggestions={this.state.searchSuggestions} onTermChange={this.handleTermChange} />
        </div>
        <MenuBar items={primaryNavigationItems} orientation="horizontal" />
        <div className="menu-wrap">
          <div className="mobile-menu"><a href={mobileMenuUrl}><HamburgerIcon /></a></div>
          <div className="quick-links-wrap"><QuickLinks domain={domain} /></div>
          <UserDropdownMenu username={username} domain={domain} />
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  searchSuggestionsFunc : PropTypes.func.isRequired,
  username              : PropTypes.string,
  domain                : PropTypes.string.isRequired,
  mobileMenuUrl         : PropTypes.string
}

Navbar.defaultProps = {
  mobileMenuUrl         : '/menu'
}

export default Navbar
