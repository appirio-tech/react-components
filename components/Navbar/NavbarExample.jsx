import Navbar from './Navbar'
import React from 'react'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

const NavbarExample = () => {

  const suggest = (searchTerm) => {
    return fetch('https://internal-api.topcoder-dev.com/v3/tags/_suggest/?q=' + searchTerm)
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
  return (
    <div>
      <p>Logged In Example</p>
      <Navbar username="vic-tor" userImage="https://topcoder-prod-media.s3.amazonaws.com/member/profile/vic-tor-1446848838388.jpeg" domain="topcoder-dev.com" searchSuggestionsFunc={suggest} />
      <p>Non Logged In Example</p>
      <Navbar domain="topcoder-dev.com" searchSuggestionsFunc={suggest} />
    </div>
  )
}

module.exports = NavbarExample
