require('./SearchBar.scss')

import React, {Component} from 'react'
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'

//states: empty, filled, focused

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchState: 'empty' }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
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

  onKeyUp() {
    this.setState({ searchValue: this.refs.searchValue.value })
  }

  clearSearch() {
    this.refs.searchValue.value = null
    this.setState({ searchValue: this.refs.searchValue.value })
    this.setState({ searchState: 'empty' })
  }

  render() {
    /* Sample JSON data */
    const recentList = ['Photoshop', 'IBM Bluemix', 'Sketch', 'iOS Icon Design Challenges', 'React.js']
    const popularList = ['Java', 'Javascript', 'CoffeeScript']

    const searchState = this.state.searchState
    const searchValue = this.state.searchValue

    let classString = 'SearchBar'
    let typeaheadText = ''
    let isPartial = false
    let popularForDisplay = []

    if(searchValue) {
      for(let i=0; i<popularList.length; i++) {
        isPartial = popularList[i].toLowerCase().indexOf(searchValue.toLowerCase()) === 0

        if(!typeaheadText && isPartial) {
          typeaheadText = popularList[i]
        }

        if(isPartial) {
          popularForDisplay.push(<span><strong>{ searchValue }</strong>{ popularList[i].substring(searchValue.length) }</span>)
        }
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

    return (
      <div className={ classString }>
        <input className="search-bar__text" onFocus={ this.onFocus } onBlur={ this.onBlur } onKeyUp={ this.onKeyUp } ref="searchValue" />
        <span className="search-typeahead-text">{ typeaheadText }</span>
        <img className="search-bar__clear" src={ require('./x-mark.svg') } onClick={ this.clearSearch }/>
        <div className="search-icon-wrap">
          <img className="search-bar__icon" src={ require('./ico-mobile-search-selected.svg') } />
        </div>
        <SearchSuggestions recentSearch={ recentList } popularSearch={ popularForDisplay } />
      </div>
    )

  }
}

export default SearchBar
