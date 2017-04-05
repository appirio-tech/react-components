/* global
  window
*/

import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import ChallengeStatus from '../ChallengeStatus/ChallengeStatus';
import PrizesTooltip from './Tooltips/PrizesTooltip';
import TrackAbbreviationTooltip from './Tooltips/TrackAbbreviationTooltip';
import TrackIcon from '../TrackIcon/TrackIcon';
import './ChallengeCard.scss';

// Constants
const VISIBLE_TECHNOLOGIES = 3;
const ID_LENGTH = 6;
const { func, object } = React.PropTypes;

// Get the End date of a challenge
const getEndDate = date => moment(date).format('MMM DD');

// Convert a number to string with thousands separated by comma
const numberWithCommas = n => (n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0);

function ChallengeCard({
  challenge: passedInChallenge,
  config,
  sampleWinnerProfile,
  onTechTagClicked,
}) {
  const challenge = passedInChallenge;

  challenge.technologyList = challenge.technologies;
  challenge.isDataScience = false;
  if (challenge.technologyList.length > VISIBLE_TECHNOLOGIES) {
    if (_.indexOf(challenge.technologyList, 'Data Science') > -1) {
      challenge.isDataScience = true;
    }
    const lastItem = `+${challenge.technologyList.length - VISIBLE_TECHNOLOGIES}`;
    challenge.technologyList = challenge.technologyList.slice(0, VISIBLE_TECHNOLOGIES);
    challenge.technologyList.push(lastItem);
  }
  challenge.prize = challenge.prize || [];
  // challenge.totalPrize = challenge.prize.reduce((x, y) => y + x, 0)

  const renderTechnologies = challenge.technologyList.map(c => (
    <a
      key={c} className="technology"
      onClick={() => onTechTagClicked(c)}
    >{c}
    </a>
    ));

  const challengeDetailLink = () => {
    const challengeUrl = `${config.MAIN_URL}/challenge-details/`;
    const mmDetailUrl = `${window.location.protocol}${config.COMMUNITY_URL}/tc?module=MatchDetails&rd=`; // Marathon Match details
    if (challenge.track === 'DATA_SCIENCE') {
      const id = `${challenge.challengeId}`;
      if (id.length < ID_LENGTH) {
        return `${mmDetailUrl}${challenge.challengeId}`;
      }
      return `${challengeUrl}${challenge.challengeId}/?type=develop`;
    }
    return `${challengeUrl}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}`;
  };

  return (
    <div className="challengeCard">
      <div className="left-panel">
        <div className="challenge-track">
          <TrackAbbreviationTooltip track={challenge.track} subTrack={challenge.subTrack}>
            <TrackIcon
              track={challenge.track}
              subTrack={challenge.subTrack}
              tcoEligible={challenge.eventName}
              isDataScience={challenge.isDataScience}
            />
          </TrackAbbreviationTooltip>
        </div>

        <div className={challenge.registrationOpen === 'Yes' ? 'challenge-details with-register-button' : 'challenge-details'}>
          <a className="challenge-title" href={challengeDetailLink(challenge)}>
            {challenge.challengeName}
          </a>
          <div className="details-footer">
            <span className="date">
              {challenge.status === 'Active' ? 'Ends ' : 'Ended '}
              {getEndDate(challenge.submissionEndDate)}
            </span>
            {
              challenge.technologies.length === 0 ?
                '' : renderTechnologies
            }
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className={challenge.registrationOpen === 'Yes' ? 'prizes with-register-button' : 'prizes'}>
          <PrizesTooltip challenge={challenge} config={config}>
            <div><span className="dollar">$</span>{numberWithCommas(challenge.totalPrize)}</div>
            <div className="label">Purse</div>
          </PrizesTooltip>
        </div>

        <ChallengeStatus
          challenge={challenge}
          config={config}
          detailLink={challengeDetailLink(challenge)}
          sampleWinnerProfile={sampleWinnerProfile}
        />
      </div>
    </div>
  );
}

ChallengeCard.defaultProps = {
  onTechTagClicked: _.noop,
  challenge: {},
  config: {},
  sampleWinnerProfile: undefined,
};

ChallengeCard.propTypes = {
  onTechTagClicked: func,
  challenge: object,
  config: object,
  sampleWinnerProfile: object,
};

export default ChallengeCard;
