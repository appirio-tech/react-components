'use strict'

require('./SearchSuggestions.scss')
const StandardListItem = require('../StandardListItem/StandardListItem.cjsx')
import Panel from '../Panel/Panel'

const SearchSuggestions = {
  getInitialState() {
    return { iSEmpty: true }
  },
  render() {
    const recentList = this.props.recentSearch
    const popularList = this.props.popularSearch

    const recentSearches = !recentList ? '' : (
			<div className="recent-search-suggestions">
				<Panel>
					<div className="panel-header">
						<div className="label">Recent Search</div>
						<div className="recent-search-panel-actions">
							<div className="recent-search-panel-action">
								<a href="javascript:;">Edit</a>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<ul className="search-suggestion-result-list">
							{
								recentList.map((search, i) => {
  return <li key={ i }><StandardListItem labelText={ search } hideIcon /></li>
								}) 
							}
						</ul>
							{
								popularList ? null :  (
									<a href="javascript:;" className="footer-link">
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
  return <li key={ i }><StandardListItem labelText={ search } hideIcon /></li>
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

module.exports = React.createClass(SearchSuggestions)