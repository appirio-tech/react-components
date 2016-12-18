'use strict'


import ChallengeCard from './ChallengeCard'
import React from 'react'

class ChallengeCardExamples extends React.Component {
  constructor() {
    super();
    this.state = {challenges: [], challenge: {}};
    var that = this;

    fetch('https://api.topcoder-dev.com/v3/challenges/', {method: 'GET', mode: 'cors'})
    .then(function(response) {
      response.json().then(function(json) {
        that.setState({
          challenges: json.result.content,
          challenge: json.result.content[0],
        });
      });
    });

  }

  render() {
    return (
      <div className="ChallengeCardExamples">
        <ChallengeCard challenge={this.state.challenge} />
      </div>
    )
  }
}

module.exports = ChallengeCardExamples
