import React from 'react';
import _ from 'lodash'
import TrackIcon from '../TrackIcon/TrackIcon';
import ChallengeStatus from '../ChallengeStatus/ChallengeStatus';
import './ChallengeCard.scss';
import moment from 'moment';

import Tooltip from './Tooltips/Tooltip';
import PrizesTooltip from './Tooltips/PrizesTooltip';
import TrackAbbreviationTooltip from './Tooltips/TrackAbbreviationTooltip';

// Constants
const VISIBLE_TECHNOLOGIES = 3;
const CHALLENGE_URL = 'https://www.topcoder.com/challenge-details/';

// Get the End date of a challenge
const getEndDate = (date) => {
  return moment(date).format('MMM DD');
}

// Convert a number to string with thousands separated by comma
const numberWithCommas = (n) => {

  return n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
}

function ChallengeCard ({challenge, sampleWinnerProfile}) {
  challenge.technologyList = challenge.technologies;
  if (challenge.technologyList.length > VISIBLE_TECHNOLOGIES) {
    if(_.indexOf(challenge.technologyList, 'Data Science') > -1) {
      challenge.track = 'DATA_SCIENCE'
      challenge.subTrack = 'MARATHON_MATCH'
    }
    const lastItem = '+' + (challenge.technologyList.length - VISIBLE_TECHNOLOGIES);
    challenge.technologyList = challenge.technologyList.slice(0, VISIBLE_TECHNOLOGIES);
    challenge.technologyList.push(lastItem);
  }
  challenge.prize = challenge.prize || [];
  // challenge.totalPrize = challenge.prize.reduce((x, y) => y + x, 0)

  const renderTechnologies = challenge.technologyList.map((c) => {
    return (<a href="#" key={c} className="technology">{c}</a>);
  })
  return (
    <div className="challengeCard">
      <div className="left-panel">
        <div className="challenge-track">
          <TrackAbbreviationTooltip track={challenge.track} subTrack={challenge.subTrack}>
            <TrackIcon track={challenge.track} subTrack={challenge.subTrack} tcoEligible={challenge.eventName} />
          </TrackAbbreviationTooltip>
        </div>

        <div className="challenge-details">
          <a className="challenge-title" href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}`}>
            {challenge.challengeName}
          </a>
          <div className="details-footer">
            <span className="date">{challenge.status === 'Active' ? 'Ends' : 'Ended'} {getEndDate(challenge.submissionEndDate)}</span>
            {challenge.technologies.length === 0 ? <a className="technology">N/A</a> : renderTechnologies}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="prizes">
          <PrizesTooltip challenge={challenge}>
            <div><span className="dollar">$</span>{numberWithCommas(challenge.totalPrize)}</div>
            <div className="label">1 prize</div>
          </PrizesTooltip>
        </div>

        <ChallengeStatus challenge={challenge} sampleWinnerProfile={sampleWinnerProfile} />
      </div>
    </div>
  )
}

export default ChallengeCard
