'use strict'

require('./SearchBar.scss')
const React    = require('react')
const SearchSuggestions = require('../SearchSuggestions/SearchSuggestions.jsx')

//states: empty, filled, focused

const SearchBar = {
  getInitialState() {
    return { searchState: 'empty' }
  },
  onFocus() {
    this.setState({ searchState: 'focused' })
  },
  onBlur() {
    if(this.state.searchValue) {
      this.setState({ searchState: 'filled' })
    } else {
      this.setState({ searchState: 'empty' })
    }
  },
  onKeyUp() {
    this.setState({ searchValue: this.refs.searchValue.value })
  },
  clearSearch() {
    this.refs.searchValue.value = null
    this.setState({ searchValue: this.refs.searchValue.value })
    this.setState({ searchState: 'empty' })
  },
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
      popularForDisplay = null
      typeaheadText = null
    }

    if(searchState === 'empty') {
      classString += ' state-empty'
      typeaheadText = null
    } else if(searchState === 'focused') {
      classString += ' state-focused'
    } else if(searchState === 'filled') {
      classString += ' state-filled'
    }

    const dom = (
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

    return dom
  }
}

module.exports = React.createClass(SearchBar)
