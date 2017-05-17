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

  challenge.isDataScience = false;
  if (_.indexOf(challenge.technologies, 'Data Science') > -1) {
    challenge.isDataScience = true;
  }
  challenge.prize = challenge.prizes || [];
  // challenge.totalPrize = challenge.prize.reduce((x, y) => y + x, 0)

  const challengeDetailLink = () => {
    const challengeUrl = `${config.MAIN_URL}/challenge-details/`;
    const mmDetailUrl = `${window.location.protocol}${config.COMMUNITY_URL}/tc?module=MatchDetails&rd=`; // Marathon Match details
    if (challenge.track === 'DATA_SCIENCE') {
      const id = `${challenge.id}`;
      if (id.length < ID_LENGTH) {
        return `${mmDetailUrl}${challenge.id}`;
      }
      return `${challengeUrl}${challenge.id}/?type=develop`;
    }
    return `${challengeUrl}${challenge.id}/?type=${challenge.track.toLowerCase()}`;
  };
  const registrationPhase = challenge.allPhases.filter(phase => phase.phaseType === 'Registration')[0];
  const isRegistrationOpen = registrationPhase ? registrationPhase.phaseStatus === 'Open' : false;
  return (
    <div className="challengeCard">
      <div className="left-panel">
        <div className="challenge-track">
          <TrackAbbreviationTooltip track={challenge.track} subTrack={challenge.subTrack}>
            <TrackIcon
              track={challenge.track}
              subTrack={challenge.subTrack}
              tcoEligible={challenge.events ? challenge.events[0].eventName : ''}
              isDataScience={challenge.isDataScience}
            />
          </TrackAbbreviationTooltip>
        </div>

        <div className={isRegistrationOpen ? 'challenge-details with-register-button' : 'challenge-details'}>
          <a className="challenge-title" href={challengeDetailLink(challenge)}>
            {challenge.name}
          </a>
          <div className="details-footer">
            <span className="date">
              {challenge.status === 'ACTIVE' ? 'Ends ' : 'Ended '}
              {getEndDate(challenge.submissionEndDate)}
            </span>
            <Tags technologies={challenge.technologies} onTechTagClicked={onTechTagClicked} />
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className={isRegistrationOpen ? 'prizes with-register-button' : 'prizes'}>
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
  config: process.env,
  sampleWinnerProfile: undefined,
};

ChallengeCard.propTypes = {
  onTechTagClicked: func,
  challenge: object,
  config: object,
  sampleWinnerProfile: object,
};

/**
 * Renders the Tags
 */

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  renderTechnologies() {
    const technologies = this.props.technologies ? this.props.technologies.split(',') : [];
    if (technologies.length) {
      let technologyList = technologies;
      if (technologies.length > VISIBLE_TECHNOLOGIES && !this.state.expanded) {
        const lastItem = `+${technologyList.length - VISIBLE_TECHNOLOGIES}`;
        technologyList = technologies.slice(0, VISIBLE_TECHNOLOGIES);
        technologyList.push(lastItem);
      }
      return technologyList.map(c => (
        <a
          key={c} className="technology"
          onClick={() => this.onClick(c)}
        >{c}
        </a>
      ));
    }
    return '';
  }
  onClick(c) {
    // resolved conflict with c++ tag
    if (c.indexOf('+') === 0) {
      this.setState({ expanded: true });
    } else {
      this.props.onTechTagClicked(c);
    }
  }

  render() {
    const technologies = this.renderTechnologies();
    return (
      <span>
        { technologies }
      </span>
    );
  }
}
Tags.defaultProps = {
  technologies: '',
  onTechTagClicked: _.noop,
};

Tags.propTypes = {
  technologies: React.PropTypes.string,
  onTechTagClicked: React.PropTypes.func,
};

export default ChallengeCard;
