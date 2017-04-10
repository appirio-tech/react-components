require('./NavbarExample.scss')

import Navbar from './Navbar'
import React, {Component, PropTypes} from 'react'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

const suggest = (searchTerm, INTERNAL_API_URL) => {
  return fetch(`${INTERNAL_API_URL}/tags/_suggest/?q=${searchTerm}`)
  .then(response => {
    if (response.status >= 200 && response.status < 400) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    const tags = _.get(data, 'result.content')
    return tags.map(tag => {
      return tag.text
    })
  })
}

class SearchResults extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const memberRender = (member) => {
      const style = {color : member.color}
      return (
        <div className="member" key={member.handle}>
          <p>Handle: <span style={style}>{member.handle}</span></p>
          <p>Rank: <span>{member.rank}</span></p>
        </div>
      )
    }
    const challengeRender = (challenge) => {
      return (
        <div className="challenge" key={challenge.name}>
          <p>Name: <span>{challenge.name}</span></p>
          <p>Starte Date: <span>{challenge.startDate}</span></p>
          <p>End Date: <span>{challenge.endDate}</span></p>
        </div>
      )
    }
    const searchResults = this.props.results
    let exactMatch = null
    if (searchResults.member) {
      exactMatch = <div className="exact-match"><h2>Member</h2>{ memberRender(searchResults.member) }</div>
    }
    let matchedMembers = null
    if (searchResults.members) {
      matchedMembers = <div className="members"><h2>Members</h2>{ searchResults.members.map(memberRender) }</div>
    }
    let matchedChallenges = null
    if (searchResults.challenges) {
      matchedChallenges = <div className="challenges"><h2>Challenges</h2>{ searchResults.challenges.map(challengeRender) }</div>
    }

    return (
      <div className="SearchResults">
        { exactMatch }
        { matchedMembers }
        { matchedChallenges }
      </div>
    )
  }
}

SearchResults.propTypes = {
  memberMatch : PropTypes.object,
  membersMatch : PropTypes.array,
  challengesMatch : PropTypes.array
}

class NavbarExample extends Component {
  constructor(props) {
    super(props)
    this.state = {searchResults: {}}
    this.search = this.search.bind(this)
  }

  search(searchTerm) {
    let results = {}
    if (searchTerm === 'Java') {
      results = {
        hasResults: true,
        member: {
          handle : 'Java',
          color  : 'blue',
          rank   : 1423
        },
        members: [{
          handle : 'Javaone',
          color  : 'red',
          rank   : 2045
        }, {
          handle : 'ExpertJava',
          color  : 'yellow',
          rank   : 1608
        }],
        challenges: [{
          name       : 'Tags Lambda Service',
          startDate  : 'April 4, 2016',
          endDate    : 'April 20, 2016'
        }, {
          name       : 'Member Search Service',
          startDate  : 'March 14, 2016',
          endDate    : 'March 27, 2016'
        }]
      }
    }
    this.setState({searchResults: results})
  }

  render() {
    return (
      <div>
        <p>Logged In Example</p>
        <Navbar username="vic-tor" userImage="https://topcoder-prod-media.s3.amazonaws.com/member/profile/vic-tor-1446848838388.jpeg" domain={`${this.props.domain}`} searchSuggestionsFunc={ suggest } onSearch={ this.search } />
        <p>Non Logged In Example</p>
        <Navbar domain={`${this.props.domain}`} searchSuggestionsFunc={ suggest } onSearch={ this.search } />
        <div className="search-results">
          <SearchResults results={ this.state.searchResults } />
        </div>
      </div>
    )
  }
}
NavbarExample.defaultProps = {
  INTERNAL_API_URL: process.env.INTERNAL_API_URL,
  domain: process.env.domain
}

NavbarExample.propTypes = {
  INTERNAL_API_URL: React.PropTypes.string,
  domain: React.PropTypes.string
}
module.exports = NavbarExample
