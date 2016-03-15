require('./SearchSuggestions.scss')

import React, { Component } from 'react'
import StandardListItem from '../StandardListItem/StandardListItem'
import Panel from '../Panel/Panel'

class SearchSuggestions extends Component {
   constructor(props) {
   	super(props)

   	this.state = { iSEmpty: true }
  }

  render() {
    const recentList = this.props.recentSearch
    const popularList = this.props.popularSearch

    const recentSearches = !recentList ? '' : (
			<div className="recent-search-suggestions">
				<Panel>
					<div className="panel-header">
						<div className="label">Recent Search</div>
						<div className="recent-search-panel-actions transition">
							<div className="recent-search-panel-action">
								<a href="javascript:;">Edit</a>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<ul className="search-suggestion-result-list">
							{
								!recentList ? '' : recentList.map((search, i) => {
  return <li key={ i }><StandardListItem labelText={ search } showIcon={ false } /></li>
								}) 
							}
						</ul>
							{
								popularList ? '' :  (
									<a href="javascript:;" className="footer-link transition">
										Learn more about the new Search here
									</a>
								)
							}
					</div>
				</Panel>
			</div>
		)

    const popularSearch = !popularList ? '' :(
			<div className="popular-search-suggestions">
				<Panel>
					<div className="panel-header">
						<div className="label">Popular</div>
					</div>
					<div className="panel-body">
						<ul className="search-suggestion-result-list">
							{
								popularList.map((search, i) => {
  return <li key={ i }><StandardListItem labelText={ search } showIcon={ false } /></li>
								}) 
							}
						</ul>
					</div>
				</Panel>
			</div>
		)

    return (
			<div className={ ((recentList && !popularList) ? 'empty-state' : null) + ' SearchSuggestions'}>
				{ popularSearch }
				{ recentSearches }
			</div>
		)
  }
}

export default SearchSuggestions