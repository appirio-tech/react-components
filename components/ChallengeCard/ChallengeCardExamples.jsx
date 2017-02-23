'use strict'

import ChallengeCard from './ChallengeCard'
import React from 'react'
import './ChallengeCardExamples.scss'
import _ from 'lodash';

const BASE_URL = 'https://api.topcoder.com/v2';
const CHALLENGES_API = `${BASE_URL}/challenges/`;

// A mock list of challenges side bar
const ChallengesSidebarMock = {
  all: {name: 'All Challenges', value: 3},
  myChallenges: {name: 'My Challenges', value: 3},
  others: [
    {name: 'Open for registration', value: 16},
    {name: 'Ongoing challenges', value: 34},
    {name: 'Past challenges', value: 580},
  ],
  myFilters: [
    {name: 'iOS Design Challenges', value: 6},
    {name: 'TCO Wireframing', value: 0},
    {name: 'My Winnings', value: 56},
  ]
}

class ChallengeCardExamples extends React.Component {
  constructor() {
    super()
    this.state = {
      activeDevelopChallenges: [],
      pastDevelopChallenges: [],
      activeDesignChallenges: [],
      pastDesignChallenges: [],
      activeMarathonMatchChallenges: []
    }
    const that = this;

    // Fetches a sample user profile to show in User Avatar Tooltips.
    // Effective loading of all winner profiles for all challenges is
    // somewhat out of the scope of the current challenge.
    this.fetchUserProfile('Sky_').then(profile => this.setState({ sampleUserProfile: profile }));

    fetch(`${CHALLENGES_API}active?type=develop`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          activeDevelopChallenges: json.data.slice(0, 15)
        });
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
     // fetch marathon match
    fetch(`${BASE_URL}/data/marathon/challenges/?listType=active`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        console.log(json.data)
        that.setState({
          activeMarathonMatchChallenges: json.data
        })
      })
    })
  }

  fetchUserProfile(handle) {
    const url = `${BASE_URL}/users/${handle}`;
    return fetch(url).then(res => res.json());
  }

  render() {
    const ActiveDevelopChallengeCards = this.state.activeDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} sampleWinnerProfile={this.state.sampleUserProfile} />)
    })

    const PastDevelopChallengeCards = this.state.pastDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} sampleWinnerProfile={this.state.sampleUserProfile} />)
    })

    const ActiveDesignChallengeCards = this.state.activeDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} sampleWinnerProfile={this.state.sampleUserProfile} />)
    })

    const PastDesignChallengeCards = this.state.pastDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} sampleWinnerProfile={this.state.sampleUserProfile} />)
    })

    // marathon match
    const ActiveMarathonMatchChallengeCards = this.state.activeMarathonMatchChallenges.map((c) => {
      c.subTrack = 'MARATHON_MATCH'
      c.track = 'DATA_SCIENCE'
      c.challengeId = c.roundId
      c.technologies = []
      c.prize = c.prizes
      c.submissionEndDate = c.endDate
      c.totalPrize = 0
      c.challengeName = c.fullName
      c.numRegistrants = c.numberOfRegistrants
      c.numSubmissions = c.numberOfSubmissions
      c.registrationStartDate = c.startDate
      c.currentPhaseEndDate = c.endDate
      return (<ChallengeCard key={c.roundId} challenge={c} sampleWinnerProfile={this.state.sampleUserProfile} />)
    })

    return (
      <div className="tc-content-wrapper">
        <div className="challenge-cards-container">
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
          </div>
          <div className="ChallengeCardExamples example-lg">
            <div className="title">Active Marathon Match Challenges</div>
            {ActiveMarathonMatchChallengeCards}
            <br/><br/><br/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ChallengeCardExamples
