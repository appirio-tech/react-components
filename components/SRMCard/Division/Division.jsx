import React from 'react';
import UserAvatarTooltip from '../../ChallengeCard/Tooltips/UserAvatarTooltip';
import LeaderboardAvatar from '../../LeaderboardAvatar/LeaderboardAvatar';
import Tooltip from '../../ChallengeCard/Tooltips/Tooltip';
import RegistrantsIcon from '../../Icons/RegistrantsIcon';
import SubmissionsIcon from '../../Icons/SubmissionsIcon';

require('./Division.scss');

// constants
const NUM_REGISTRANTS = 34.33;
const NUM_SUBMISSION = 99;

function numRegistrantsTipText(number) {
  switch (number) {
    case 0: return 'No registrants';
    case 1: return '1 total registrant';
    default: return `${number} total registrants`;
  }
}

function numSubmissionsTipText(number) {
  switch (number) {
    case 0: return 'No submissions';
    case 1: return '1 total submission';
    default: return `${number} total submissions`;
  }
}
// Mock WINNERS array
let MOCK_WINNERS = [
  {
    handle: 'ACRush',
    photoURL: 'https://acrobatusers.com/assets/images/template/author_generic.jpg',
    isSmr: true
  },
  {
    handle: 'tourist',
    photoURL: 'https://acrobatusers.com/assets/images/template/author_generic.jpg',
    isSmr: true
  },
  {
    handle: 'RiaDWaW',
    isSmr: true
  },
  {
    handle: 'KalininN',
    isSmr: true
  },
  {
    handle: 'Lorem',
    photoURL: 'https://acrobatusers.com/assets/images/template/author_generic.jpg',
    isSmr: true
  },
  {
    handle: 'Ipsum',
    isSmr: true
  }
]
const MAX_VISIBLE_WINNERS = 5

MOCK_WINNERS = MOCK_WINNERS.slice(0, MAX_VISIBLE_WINNERS)

const renderLeaderboard = MOCK_WINNERS.map((winner, index) => {
  return (
    <div className="avatar-container" key={winner.handle}>
      <LeaderboardAvatar member={winner}/>
      <div className="name">{winner.handle}</div>
    </div>
  )
})

// mock resultsRows
const MOCK_RESULTS = [
  {title: "The Basics Of Buying A Telescope", submission: 99, percent: 34.33},
  {title: "Shooting Stars", submission: 12, percent: 50},
  {title: "The Amazing Hubble", submission: 4, percent: 32.1},
]
const resultsRows = MOCK_RESULTS.map((row, index) => {
  return (
    <div className="results-detail-row" key={index}>
      <p className="d-title">{row.title}</p>
      <span className="challenge-stats">
        <span>
          <Tooltip content={numSubmissionsTipText(row.submission)}>
            <a className="num-sub" href="javascript:;">
              <SubmissionsIcon/> <span className="number">{row.submission}</span>
            </a>
          </Tooltip>
        </span>
        <span>
          <Tooltip content={numRegistrantsTipText(row.percent)}>
            <a className="num-reg" href="javascript:;">
              <RegistrantsIcon/> <span className="number">{row.percent}%</span>
            </a>
          </Tooltip>
        </span>
      </span>
    </div>
  )
})

/*
* Past SRMCard
*/
const Division = (props) => (
	<div className="division">
		<div className="leaderboard-row">
      <p className="stage">{props.division}</p>
      <div className="leaders">{renderLeaderboard}</div>
    </div>
    {resultsRows}
	</div>
)

module.exports = Division;
