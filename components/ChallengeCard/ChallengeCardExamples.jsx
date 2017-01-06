'use strict'

import ChallengeCard from './ChallengeCard'
import React from 'react'
import './ChallengeCardExamples.scss'

const CHALLENGES_API = 'https://api.topcoder.com/v2/challenges/'

class ChallengeCardExamples extends React.Component {
  constructor() {
    super()
    this.state = {
      activeDevelopChallenges: [],
      pastDevelopChallenges: [],
      activeDesignChallenges: [],
      pastDesignChallenges: []
    }
    const that = this
    fetch(`${CHALLENGES_API}active?type=develop`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          activeDevelopChallenges: json.data.slice(0, 15)
        })
      })
    })
    fetch(`${CHALLENGES_API}past?type=develop`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          pastDevelopChallenges: json.data.slice(0, 15)
        })
      })
    })
    fetch(`${CHALLENGES_API}active?type=design`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          activeDesignChallenges: json.data.slice(0, 15)
        })
      })
    })
    fetch(`${CHALLENGES_API}past?type=design`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          pastDesignChallenges: json.data.slice(0, 15)
        })
      })
    })
  }

  render() {
    const ActiveDevelopChallengeCards = this.state.activeDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} />)
    })

    const PastDevelopChallengeCards = this.state.pastDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} />)
    })

    const ActiveDesignChallengeCards = this.state.activeDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} />)
    })

    const PastDesignChallengeCards = this.state.pastDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} />)
    })

    return (
      <div>
        <div className="ChallengeCardExamples example-lg">
          <div className="title">Active Develop Challenges</div>
          {ActiveDevelopChallengeCards}
        </div>
        <div className="ChallengeCardExamples example-lg">
          <div className="title">Past Develop Challenges</div>
          {PastDevelopChallengeCards}
        </div>
        <div className="ChallengeCardExamples example-lg">
          <div className="title">Past Design Challenges</div>
          {ActiveDesignChallengeCards}
        </div>
        <div className="ChallengeCardExamples example-lg">
          <div className="title">Past Design Challenges</div>
          {PastDesignChallengeCards}
          <br/><br/><br/>
        </div>
      </div>
    )
  }
}

module.exports = ChallengeCardExamples
