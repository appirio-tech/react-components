require('./Navbar.scss')

import MenuBar from '../MenuBar/MenuBar'
import React, {PropTypes, Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import QuickLinks from '../QuickLinks/QuickLinks'
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu'

const primaryNavigationItems = [
  {img: require('./nav-community.svg'), text: 'Community', link: '/community'},
  {img: require('./nav-compete.svg'), text: 'Compete', link: '/compete', selected: true},
  {img: require('./nav-learn.svg'), text: 'Learn', link: '/learn'}
]

// properties: username, domain, searchSuggestionsFunc
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
    return (
      <div className="Navbar flex middle space-between">
        <div className="topcoder-logo"></div>
        <div className="search-bar-wrap">
          <div className="icon-placeholder"></div>
          <SearchBar recentTerms={this.state.recentTerms} suggestions={this.state.searchSuggestions} onTermChange={this.handleTermChange} />
        </div>
        <MenuBar items={primaryNavigationItems} orientation="horizontal" />
        <div className="collapse-group">
          <div className="icon-placeholder"></div>
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
  domain                : PropTypes.string.isRequired
}

export default Navbar
