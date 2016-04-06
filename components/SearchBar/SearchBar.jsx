require('./SearchBar.scss')

import React, {Component, PropTypes} from 'react'
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'
import Loader from '../Loader/Loader'

//states: empty, filled, focused

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchState: 'empty' }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  onFocus() {
    this.setState({ searchState: 'focused' })
  }

  onBlur() {
    if(this.state.searchValue) {
      this.setState({ searchState: 'filled' })
    } else {
      this.setState({ searchState: 'empty' })
    }
  }

  onChange() {
    const oldTerm = this.state.searchValue
    this.setState({ searchValue: this.refs.searchValue.value, loading: true }, function() {
      this.props.onTermChange.apply(this, [this, oldTerm, this.state.searchValue, function(searchBar) {
        searchBar.setState({loading: false})
      }])
    })
  }

  clearSearch() {
    this.refs.searchValue.value = null
    this.setState({ searchValue: this.refs.searchValue.value })
    this.setState({ searchState: 'empty' })
  }

  render() {
    const recentList = this.props.recentTerms
    const popularList = this.props.suggestions

    const searchState = this.state.searchState
    const searchValue = this.state.searchValue

    let classString = 'SearchBar'
    let typeaheadText = ''
    let popularForDisplay = []

    if(searchValue) {
      for(let i = 0; i < popularList.length; i++) {
        const idx = popularList[i].toLowerCase().indexOf(searchValue.toLowerCase())
        // show typeahead hint only if the search term matched at 0 index
        if(!typeaheadText && idx === 0) {
          typeaheadText = searchValue + popularList[i].substring(searchValue.length)
        }
        popularForDisplay.push(
          <span>
            { popularList[i].substring(0, idx) }
            <strong>{ searchValue }</strong>
            { popularList[i].substring(idx + searchValue.length) }
          </span>
        )
      }

    } else {
      popularForDisplay = ''
      typeaheadText = ''
    }

    if(searchState === 'empty') {
      classString += ' state-empty'
      typeaheadText = ''
    } else if(searchState === 'focused') {
      classString += ' state-focused'
    } else if(searchState === 'filled') {
      classString += ' state-filled'
    }
    const results = this.state.loading === true
      ? <div className="loading"><Loader /></div>
      : <SearchSuggestions recentSearch={ recentList } popularSearch={ popularForDisplay } />
    return (
      <div className={ classString }>
        <input className="search-bar__text" onFocus={ this.onFocus } onBlur={ this.onBlur } onChange={ this.onChange } ref="searchValue" />
        <span className="search-typeahead-text">{ typeaheadText }</span>
        <img className="search-bar__clear" src={ require('./x-mark.svg') } onClick={ this.clearSearch }/>
        <div className="search-icon-wrap">
          <img className="search-bar__icon" src={ require('./ico-mobile-search-selected.svg') } />
        </div>
        {results}
      </div>
    )

  }
}


SearchBar.propTypes = {
  onTermChange : PropTypes.func.isRequired,
  recentTerms  : PropTypes.array
}

SearchBar.defaultProps = {
  recentTerms: []
}

export default SearchBar
