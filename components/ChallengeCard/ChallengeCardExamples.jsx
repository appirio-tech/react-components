'use strict'
import React from 'react'
import ReactDOM from 'react-dom';
import ChallengeCard from './ChallengeCard'
import './ChallengeCardExamples.scss'

var Tooltips = require('./tooltip_lib/tooltips');


const CHALLENGES_API = 'https://api.topcoder.com/v2/challenges/'
const USERS_API = 'https://api.topcoder.com/v2/users/'


class ChallengeCardExamples extends React.Component {

  constructor() {
    super()
    this.state = {
      activeDevelopChallenges: [],
      pastDevelopChallenges: [],
      activeDesignChallenges: [],
      pastDesignChallenges: [],
      userProfile: []
    }
    let tips = {}
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
    fetch(`${USERS_API}sky_`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          userProfile: [ ...this.state.userProfile, json]
        })
      })
    })
    fetch(`${USERS_API}iRabbit`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          userProfile: [ ...this.state.userProfile, json]
        })
      })
    })
    fetch(`${USERS_API}AleaActaEst`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          userProfile: [ ...this.state.userProfile, json]
        })
      })
    })
    fetch(`${USERS_API}ShindouHikaru`, {method: 'GET', mode: 'cors'})
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          userProfile: [ ...this.state.userProfile, json]
        })
      })
    })
  }

  componentWillMount() {
    const container = ReactDOM.findDOMNode(this.refs.target);
    const options = {
      baseClass:   'tooltip',   // Base tooltip class name.
      typeClass:   'dark',      // Type tooltip class name.
      effectClass: 'fade',      // Effect tooltip class name.
      inClass:     'in',        // Class used to transition stuff in.
      place:       'top',       // Default place.
      spacing:     20,          // Gap between target and tooltip.
      auto:        1            // Whether to automatically adjust place to fit into window.
    };

    this.tips = new Tooltips(document.body, {
      tooltip:    options,      // Options for individual Tooltip instances.
      key:       'tooltip',     // Tooltips data attribute key.
      showOn:    'mouseenter',  // Show tooltip event.
      hideOn:    'mouseleave',  // Hide tooltip event.
      observe:   1              // Enable mutation observer (used only when supported).
    });

  }
  componentDidMount() {
    this.tips.reload();
  }

  render() {

    const ActiveDevelopChallengeCards = this.state.activeDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} userProfile={this.state.userProfile} />)
    })

    const PastDevelopChallengeCards = this.state.pastDevelopChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DEVELOP'
      return (<ChallengeCard key={c.challengeId} challenge={c} userProfile={this.state.userProfile}/>)
    })

    const ActiveDesignChallengeCards = this.state.activeDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} userProfile={this.state.userProfile}/>)
    })

    const PastDesignChallengeCards = this.state.pastDesignChallenges.map((c) => {
      c.subTrack = c.challengeType.toUpperCase().split(' ').join('_')
      c.track = 'DESIGN'
      return (<ChallengeCard key={c.challengeId} challenge={c} userProfile={this.state.userProfile}/>)
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
