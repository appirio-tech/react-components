import React from 'react'
import SearchSuggestions from './SearchSuggestions'

const recentList = ['Photoshop', 'IBM Bluemix', 'Sketch', 'iOS Icon Design Challenges', 'React.js']
const popularList = ['Java', 'Javascript', 'CoffeeScript']

const SearchSuggestionsExamples = () => {
  return (
		<section>
			<SearchSuggestions recentSearch={ recentList } popularSearch={ popularList } />
			<SearchSuggestions recentSearch={ recentList } />
			<SearchSuggestions popularSearch={ popularList } />
		</section>
	)
}

module.exports = SearchSuggestionsExamples