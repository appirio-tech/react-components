import SearchBar from './SearchBar'
import React from 'react'

const recentTerms = ['Photoshop', 'IBM Bluemix', 'Sketch', 'iOS Icon Design Challenges', 'React.js']
const suggestions = []

const handleTermChange = (searchBar, oldTerm, searchTerm, callback) => {
  suggestions.splice(0, suggestions.length)
  setTimeout(() => {
    if (searchTerm && 'java'.indexOf(searchTerm.toLowerCase()) !== -1) {
      suggestions.push('Java')
      suggestions.push('JavaScript')
    } else if (searchTerm && 'javascript'.indexOf(searchTerm.toLowerCase()) !== -1) {
      suggestions.push('JavaScript')
    } else if (searchTerm && 'coffee'.indexOf(searchTerm.toLowerCase()) !== -1) {
      suggestions.push('Coffee')
      suggestions.push('CoffeeScript')
    } else if (searchTerm && 'coffeescript'.indexOf(searchTerm.toLowerCase()) !== -1) {
      suggestions.push('CoffeeScript')
    }
    callback.apply(searchBar, [searchBar])
  }, 3000)
}

const search = (term) => {
  console.log('Searched for term: ' + term)
}

const SearchBarExamples = () => (
  <SearchBar recentTerms={recentTerms} suggestions={suggestions} onTermChange={handleTermChange} onSearch={ search } />
)

module.exports = SearchBarExamples
