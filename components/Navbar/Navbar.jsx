require('./Navbar.scss')

import React, {PropTypes, Component} from 'react'
import MenuBar from '../MenuBar/MenuBar'
import SearchBar from '../SearchBar/SearchBar'
import QuickLinks from '../QuickLinks/QuickLinks'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu'

import TopcoderLogo from '/Icons/TopcoderLogo'
import TopcoderMobileLogo from '/Icons/TopcoderMobileLogo'

import IconTcMenuBold from '../Icons/IconTcMenuBold'
import IconUIZoom from '../Icons/IconUIZoom'

const primaryNavigationItems = [
  {img: require('./nav-community.svg'), text: 'Community', link: '/community', regex: '/community?\?'},
  {img: require('./nav-compete.svg'), text: 'Compete', link: '/compete', regex: '/compete?\?'},
  {img: require('./nav-learn.svg'), text: 'Learn', link: '/learn', regex: '/learn?\?'}
]

// properties: username, userImage, domain, mobileMenuUrl, mobileSearchUrl, searchSuggestionsFunc
// searchSuggestionsFunc should return a Promise object

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleMobileClick = this.handleMobileClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { recentTerms: [] }
  }

  handleTermChange(oldTerm, searchTerm, reqNo, callback) {
    // TODO should we check for the return value of the search suggestion function to be promise?
    this.props.searchSuggestionsFunc.apply(this, [searchTerm])
    .then(data => {
      callback.apply(null, [reqNo, data])
    })
    .catch(error => {
      callback.apply(null, [reqNo, [], error])
    })
  }

  handleSearch(searchTerm) {
    this.props.onSearch.apply(this, [searchTerm])
  }

  handleMobileClick(se) {
    const mobileMenuLink = se.target.querySelector('.mobile-wrap > a')
    if (mobileMenuLink) {
      mobileMenuLink.click()
    }
  }

  render() {
    const username = this.props.username
    const userImage = this.props.userImage
    const domain = this.props.domain
    const mobileMenuUrl = this.props.mobileMenuUrl
    const mobileSearchUrl = this.props.mobileSearchUrl
    const homePageUrl = '//www.' + domain
    return (
      <div className="Navbar flex middle space-between">
        <div className="topcoder-logo non-mobile">
          <a href={homePageUrl}>
            <TopcoderLogo width={155}/>
          </a>
        </div>
        
        <div className="topcoder-logo mobile">
          <a href={homePageUrl}>
            <TopcoderMobileLogo width={40} />
          </a>
        </div>
        
        <div className="search-bar-wrap" onClick={this.handleMobileClick}>
          <div className="mobile-wrap">
            <a href={mobileSearchUrl}>
              <IconUIZoom width={25} height={25} />
            </a>
          </div>
          
          <SearchBar recentTerms={ this.state.recentTerms } onTermChange={ this.handleTermChange } onSearch={ this.handleSearch } />
        </div>
        
        <MenuBar items={primaryNavigationItems} orientation="horizontal" />
        
        <div className="menu-wrap" onClick={this.handleMobileClick}>
          <div className="mobile-wrap">
            <a href={mobileMenuUrl}>
              <IconTcMenuBold />
            </a>
          </div>
          
          <div className="quick-links-wrap">
            <QuickLinks domain={domain} />
          </div>
          
          <UserDropdownMenu username={username} userImage={userImage} domain={domain} />
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  searchSuggestionsFunc : PropTypes.func.isRequired,
  onSearch              : PropTypes.func.isRequired,
  username              : PropTypes.string,
  userImage             : PropTypes.string,
  domain                : PropTypes.string.isRequired,
  mobileMenuUrl         : PropTypes.string,
  mobileSearchUrl       : PropTypes.string
}

Navbar.defaultProps = {
  mobileMenuUrl         : '/menu',
  mobileSearchUrl       : '/search'
}

export default Navbar