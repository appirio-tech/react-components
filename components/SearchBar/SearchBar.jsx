require('./SearchBar.scss')

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'
import Loader from '../Loader/Loader'
import classNames from 'classnames'

//states: empty, filled, focused

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchState: 'empty', suggestions: [] }
    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.search = this.search.bind(this)
    this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleSuggestionsUpdate = this.handleSuggestionsUpdate.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick(evt) {
    let t = evt.target
    let i = 0
    const searchBarNode = ReactDOM.findDOMNode(this)
    let clickedInside = false
    while(t !== null && i < 10) {
      i++
      if (t === searchBarNode) {
        clickedInside = true
        break
      }
      t = t.parentNode
    }
    if (!clickedInside) {
      if(this.state.searchValue) {
        this.setState({ searchState: 'filled' })
      } else {
        this.setState({ searchState: 'empty' })
      }
    }
  }

  onFocus() {
    this.setState({ searchState: 'focused' })
  }

  handleSuggestionsUpdate(requestNo, data) {
    if (requestNo === this.state.maxRequestNo) {
      this.setState({loading: false, suggestions: data})
    }
  }

  onChange() {
    const oldTerm = this.state.searchValue
    this.setState(
      function(prevState, curProps) {
        const rc = prevState.requestNo ? prevState.requestNo + 1 : 1
        return {
          searchValue: this.refs.searchValue.value,
          requestNo: rc,
          maxRequestNo: rc,
          loading: true
        }
      },
      function() {
        this.props.onTermChange.apply(null, [
          oldTerm,
          this.state.searchValue,
          this.state.requestNo,
          this.handleSuggestionsUpdate
        ])
      }
    )
  }

  clearSearch() {
    this.refs.searchValue.value = null
    this.setState({ searchValue: this.refs.searchValue.value })
    this.setState({ searchState: 'empty' })
  }

  onKeyUp(evt) {
    const eventKey = evt.keyCode
    // if return is pressed
    if (eventKey === 13) {
      this.setState({ searchState: 'filled' }, function() {
        this.search()
      })
    }
  }

  handleSuggestionSelect(selectedTerm) {
    this.setState({ searchValue: selectedTerm, searchState: 'filled' }, function() {
      this.search()
    })
  }

  search() {
    this.props.onSearch.apply(this, [this.state.searchValue])
  }

  render() {
    const recentList = this.props.recentTerms
    const popularList = this.state.suggestions

    const searchState = this.state.searchState
    const searchValue = this.state.searchValue

    let typeaheadText = ''

    if(searchValue) {
      for(let i = 0; i < popularList.length; i++) {
        const idx = popularList[i].toLowerCase().indexOf(searchValue.toLowerCase())
        // show typeahead hint only if the search term matched at 0 index
        if(!typeaheadText && idx === 0) {
          typeaheadText = searchValue + popularList[i].substring(searchValue.length)
        }
      }
    } else {
      typeaheadText = ''
    }

    const sbClasses = classNames('SearchBar', {
      'state-empty' : searchState === 'empty',
      'state-focused': searchState === 'focused',
      'state-filled' : searchState === 'filled'
    })

    const results = this.state.loading === true
      ? <div className="loading"><Loader /></div>
      : <SearchSuggestions recentSearch={ recentList } popularSearch={ popularList } onSuggestionSelect={ this.handleSuggestionSelect } />
    return (
      <div className={ sbClasses }>
        <input className="search-bar__text" onFocus={ this.onFocus } onChange={ this.onChange } onKeyUp={ this.onKeyUp } ref="searchValue" value={this.state.searchValue} />
        <span className="search-typeahead-text">{ typeaheadText }</span>
        <img className="search-bar__clear" src={ require('./x-mark.svg') } onClick={ this.clearSearch }/>
        <div className="search-icon-wrap" onClick={ this.search }>
          <img className="search-bar__icon" src={ require('./ico-mobile-search-selected.svg') } />
        </div>
        <div className="suggestions-panel">
          {results}
        </div>
      </div>
    )

  }
}


SearchBar.propTypes = {
  onSearch     : PropTypes.func.isRequired,
  onTermChange : PropTypes.func.isRequired,
  recentTerms  : PropTypes.array
}

SearchBar.defaultProps = {
  recentTerms: []
}

export default SearchBar
