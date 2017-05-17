import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import _ from 'lodash';
import LeaderboardAvatar from '../LeaderboardAvatar/LeaderboardAvatar';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import ProgressBarTooltip from '../ChallengeCard/Tooltips/ProgressBarTooltip';
import RegistrantsIcon from '../Icons/RegistrantsIcon';
import SubmissionsIcon from '../Icons/SubmissionsIcon';
import Tooltip from '../ChallengeCard/Tooltips/Tooltip';
import UserAvatarTooltip from '../ChallengeCard/Tooltips/UserAvatarTooltip';
import ForumIcon from '../Icons/ForumIcon';
import './ChallengeStatus.scss';

// Constants
const ID_LENGTH = 6;
const MAX_VISIBLE_WINNERS = 3;
const MOCK_PHOTO = 'https://acrobatusers.com/assets/images/template/author_generic.jpg';
const STALLED_MSG = 'Stalled';
const DRAFT_MSG = 'In Draft';
const STALLED_TIME_LEFT_MSG = 'Challenge is currently on hold';
const FF_TIME_LEFT_MSG = 'Winner is working on fixes';


const getTimeLeft = (date, currentPhase) => {
  if (!currentPhase || currentPhase === 'Stalled') {
    return {
      late: false,
      text: STALLED_TIME_LEFT_MSG,
    };
  } else if (currentPhase === 'Final Fix') {
    return {
      late: false,
      text: FF_TIME_LEFT_MSG,
    };
  }
  const duration = moment.duration(moment(date).diff(moment()));
  const h = duration.hours();
  const d = duration.days();
  const m = duration.minutes();
  const late = (d < 0 || h < 0 || m < 0);
  const suffix = h !== 0 ? 'h' : 'min';
  let text = '';
  if (d !== 0) text += `${Math.abs(d)}d `;
  if (h !== 0) text += `${Math.abs(h)}`;
  if (h !== 0 && m !== 0) text += ':';
  if (m !== 0) text += `${Math.abs(m)}`;
  text += suffix;
  if (late) {
    text = `Late by ${text}`;
  } else {
    text = `${text} to go`;
  }
  return {
    late,
    text,
  };
};

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

const getStatusPhase = (challenge) => {
  const { currentPhases } = challenge;
  const currentPhaseName = currentPhases.length > 0 ? currentPhases[currentPhases.length - 1].phaseType : '';
  switch (currentPhaseName) {
    case 'Registration': {
      if (challenge.checkpointSubmissionEndDate && !getTimeLeft(challenge.checkpointSubmissionEndDate, 'Checkpoint').late) {
        return {
          currentPhaseName: 'Checkpoint',
          currentPhaseEndDate: challenge.checkpointSubmissionEndDate,
        };
      }

      return {
        currentPhaseName: 'Submission',
        currentPhaseEndDate: challenge.submissionEndDate,
      };
    }
    case 'Submission': {
      if (challenge.checkpointSubmissionEndDate && !getTimeLeft(challenge.checkpointSubmissionEndDate, 'Checkpoint').late) {
        return {
          currentPhaseName: 'Checkpoint',
          currentPhaseEndDate: challenge.checkpointSubmissionEndDate,
        };
      }

      return {
        currentPhaseName: 'Submission',
        currentPhaseEndDate: challenge.submissionEndDate,
      };
    }
    case 'Review': {
      if (challenge.checkpointSubmissionEndDate && !getTimeLeft(challenge.checkpointSubmissionEndDate, 'Checkpoint').late) {
        return {
          currentPhaseName: 'Checkpoint',
          currentPhaseEndDate: challenge.checkpointSubmissionEndDate,
        };
      }

      return {
        currentPhaseName: 'Review',
        currentPhaseEndDate: challenge.submissionEndDate,
      };
    }
    case 'Approval': {
      if (challenge.checkpointSubmissionEndDate && !getTimeLeft(challenge.checkpointSubmissionEndDate, 'Checkpoint').late) {
        return {
          currentPhaseName: 'Checkpoint',
          currentPhaseEndDate: challenge.checkpointSubmissionEndDate,
        };
      }

      return {
        currentPhaseName: 'Approval',
        currentPhaseEndDate: challenge.submissionEndDate,
      };
    }
    default:
      return {
        currentPhaseName,
        currentPhaseEndDate: challenge.submissionEndDate,
      };
  }
};

const getTimeToGo = (start, end) => {
  const percentageComplete = (
    (moment() - moment(start)) / (moment(end) - moment(start))
  ) * 100;
  return (Math.round(percentageComplete * 100) / 100);
};


/**
 * Returns an user profile object as expected by the UserAvatarTooltip
 * @param {String} handle
 */
function getSampleProfile(user) {
  const { handle } = user;
  return {
    handle,
    country: '',
    memberSince: '',
    photoLink: `i/m/${handle}.jpeg`,
    ratingSummary: [],
  };
}


class ChallengeStatus extends Component {
  constructor(props) {
    super(props);
    const CHALLENGE_URL = `${props.config.MAIN_URL}/challenge-details/`;
    const DS_CHALLENGE_URL = `https:${props.config.COMMUNITY_URL}/longcontest/stats/?module=ViewOverview&rd=`;
    const FORUM_URL = `https:${props.config.FORUMS_APP_URL}/?module=Category&categoryID=`;
    this.state = {
      winners: '',
      CHALLENGE_URL,
      DS_CHALLENGE_URL,
      FORUM_URL,
    };
    this.handleHover = this.handleHover.bind(this);
    this.getDevelopmentWinners = this.getDevelopmentWinners.bind(this);
    this.getDesignWinners = this.getDesignWinners.bind(this);
    this.registrantsLink = this.registrantsLink.bind(this);
  }

  renderLeaderboard() {
    const { challenge } = this.props;
    const { DS_CHALLENGE_URL, CHALLENGE_URL } = this.state;
    const { id, track } = challenge;
    const challengeURL = track.toLowerCase() === 'data' ? DS_CHALLENGE_URL : CHALLENGE_URL;
    const leaderboard = this.state.winners && this.state.winners.map(winner => (
      <div className="avatar-container" key={winner.handle}>
        <UserAvatarTooltip user={getSampleProfile(winner)}>
          <LeaderboardAvatar member={winner} />
        </UserAvatarTooltip>
      </div>
      ));
    return leaderboard || (
    <span className="winners" onMouseEnter={this.handleHover}>
      <a href={`${challengeURL}${id}`}>Winners</a>
    </span>);
  }

  renderRegisterButton() {
    const { challenge } = this.props;
    const { detailLink } = this.props;
    const lng = getTimeLeft(
      challenge.registrationEndDate || challenge.submissionEndDate,
      challenge.currentPhases[0] ? challenge.currentPhases[0].phaseType : '',
    ).text.length;
    return (
      <a
        href={detailLink}
        className="register-button"
        onClick={() => false}
      >
        <span>
          {
            getTimeLeft(
              challenge.registrationEndDate || challenge.submissionEndDate,
              challenge.currentPhases[0] ? challenge.currentPhases[0].phaseType : '',
            ).text.substring(0, lng - 6)
          }
        </span>
        <span className="to-register">to register</span>
      </a>
    );
  }

  registrantsLink(registrantsChallenge, type) {
    const { CHALLENGE_URL } = this.state;
    if (registrantsChallenge.track === 'DATA_SCIENCE') {
      const id = `${registrantsChallenge.id}`;
      if (id.length < ID_LENGTH) {
        return `${type}${registrantsChallenge.id}`;
      }
      return `${CHALLENGE_URL}${registrantsChallenge.id}/?type=develop#viewRegistrant`;
    }
    return `${CHALLENGE_URL}${registrantsChallenge.id}/?type=${registrantsChallenge.track.toLowerCase()}#viewRegistrant`;
  }

  activeChallenge() {
    const { challenge, config } = this.props;
    const { FORUM_URL } = this.state;
    const MM_LONGCONTEST = `https:${config.COMMUNITY_URL}/longcontest/?module`;
    const MM_REG = `${MM_LONGCONTEST}=ViewRegistrants&rd=`;
    const MM_SUB = `${MM_LONGCONTEST}=ViewStandings&rd=`;

    const registrationPhase = challenge.allPhases.filter(phase => phase.phaseType === 'Registration')[0];
    const isRegistrationOpen = registrationPhase ? registrationPhase.phaseStatus === 'Open' : false;
    const currentPhaseName = challenge.currentPhases && challenge.currentPhases.length > 0;

    let phaseMessage = STALLED_MSG;
    if (currentPhaseName) {
      phaseMessage = getStatusPhase(challenge).currentPhaseName;
    } else if (challenge.status === 'DRAFT') {
      phaseMessage = DRAFT_MSG;
    }

    return (
      <div className={isRegistrationOpen ? 'challenge-progress with-register-button' : 'challenge-progress'}>
        <span className="current-phase">

          { phaseMessage }
        </span>
        <span className="challenge-stats">
          <span className="num-reg">
            <Tooltip
              content={numRegistrantsTipText(challenge.numRegistrants)}
              className="num-reg-tooltip"
            >
              <a className="num-reg" href={this.registrantsLink(challenge, MM_REG)}>
                <RegistrantsIcon className="challenge-stats-icon" />
                <span className="number">{challenge.numRegistrants}</span>
              </a>
            </Tooltip>
          </span>
          <span className="num-sub">
            <Tooltip content={numSubmissionsTipText(challenge.numSubmissions)}>
              <a className="num-sub" href={this.registrantsLink(challenge, MM_SUB)}>
                <SubmissionsIcon /> <span className="number">{challenge.numSubmissions}</span>
              </a>
            </Tooltip>
          </span>
          {
            challenge.myChallenge &&
            <span>
              <a className="link-forum" href={`${FORUM_URL}${challenge.forumId}`}>
                <ForumIcon />
              </a>
            </span>
          }
        </span>
        <ProgressBarTooltip challenge={challenge} config={config}>
          {
            challenge.status === 'ACTIVE' ?
              <div>
                <ChallengeProgressBar
                  color="green"
                  value={
                    getTimeToGo(
                      challenge.registrationStartDate,
                      getStatusPhase(challenge).currentPhaseEndDate,
                    )
                  }
                  isLate={
                    getTimeLeft(
                      getStatusPhase(challenge).currentPhaseEndDate,
                      getStatusPhase(challenge).currentPhaseName,
                    ).late
                  }
                />
                <div className="time-left">
                  {
                    getTimeLeft(
                      getStatusPhase(challenge).currentPhaseEndDate,
                      getStatusPhase(challenge).currentPhaseName,
                    ).text
                  }
                </div>
              </div>
              :
              <ChallengeProgressBar color="gray" value="100" />
          }
        </ProgressBarTooltip>
        {isRegistrationOpen && this.renderRegisterButton()}
      </div>
    );
  }

  completedChallenge() {
    const { challenge, config } = this.props;
    const { FORUM_URL } = this.state;
    const MM_LONGCONTEST = `https:${config.COMMUNITY_URL}/longcontest/?module`;
    const MM_REG = `${MM_LONGCONTEST}=ViewRegistrants&rd=`;
    const MM_SUB = `${MM_LONGCONTEST}=ViewStandings&rd=`;
    return (
      <div>
        {this.renderLeaderboard()}
        <span className="challenge-stats">
          <span>
            <Tooltip content={numRegistrantsTipText(challenge.numRegistrants)}>
              <a className="num-reg past" href={this.registrantsLink(challenge, MM_REG)}>
                <RegistrantsIcon /> <span className="number">{challenge.numRegistrants}</span>
              </a>
            </Tooltip>
          </span>
          <span>
            <Tooltip content={numSubmissionsTipText(challenge.numSubmissions)}>

              <a className="num-sub past" href={this.registrantsLink(challenge, MM_SUB)}>
                <SubmissionsIcon /> <span className="number">{challenge.numSubmissions}</span>
              </a>
            </Tooltip>
          </span>
          {
            challenge.myChallenge &&
            <span>
              <a className="link-forum past" href={`${FORUM_URL}${challenge.forumId}`}><ForumIcon /></a>
            </span>
          }
        </span>
      </div>
    );
  }

  getDevelopmentWinners(challengeId) {
    return new Promise((resolve, reject) => {
      fetch(`${this.props.config.API_URL_V2}/develop/challenges/${challengeId}`)
        .then(res => res.json())
        .then((data) => {
          let winners = data.submissions.filter(sub => sub.placement)
            .map(winner => ({
              handle: winner.handle,
              position: winner.placement,
              photoURL: MOCK_PHOTO,
            }));
          winners = _.uniqWith(winners, _.isEqual);
          if (winners.length > MAX_VISIBLE_WINNERS) {
            const lastItem = {
              handle: `+${winners.length - MAX_VISIBLE_WINNERS}`,
            };
            winners = winners.slice(0, MAX_VISIBLE_WINNERS);
            winners.push(lastItem);
          }
          resolve(winners);
        })
        .catch(err => reject(err));
    });
  }

  getDesignWinners(challengeId) {
    return new Promise((resolve, reject) => {
      fetch(`${this.props.config.API_URL_V2}/design/challenges/result/${challengeId}`)
        .then(res => res.json())
        .then((data) => {
          let winners = data.results.filter(sub => sub.placement)
          .map(winner => ({
            handle: winner.handle,
            position: winner.placement,
            photoURL: MOCK_PHOTO,
          }));
          winners = _.uniqWith(winners, _.isEqual);
          if (winners.length > MAX_VISIBLE_WINNERS) {
            const lastItem = {
              handle: `+${winners.length - MAX_VISIBLE_WINNERS}`,
            };
            winners = winners.slice(0, MAX_VISIBLE_WINNERS);
            winners.push(lastItem);
          }
          resolve(winners);
        })
        .catch(err => reject(err));
    });
  }


  getWinners(challengeType, challengeId) {
    switch (challengeType) {
      case 'develop':
        return this.getDevelopmentWinners(challengeId);
      case 'design':
        return this.getDesignWinners(challengeId);
      default:
        return this.getDevelopmentWinners(challengeId);
    }
  }

    /**
   * Get the list of winners when the user hovers
   * over the status
   */
  handleHover() {
    if (!this.state.winners) {
      const { challenge } = this.props;
      const { id, track } = challenge;

      // We don't have the API for data science challenge
      if (track.toLowerCase() === 'data') {
        return;
      }
      const results = this.getWinners(track.toLowerCase(), id);
      results.then(winners => this.setState({ winners }));
    }
  }

  render() {
    const { challenge } = this.props;
    const status = challenge.status === 'COMPLETED' ? 'completed' : '';
    return (
      <div className={`challenge-status ${status}`}>
        {challenge.status === 'COMPLETED' ? this.completedChallenge() : this.activeChallenge()}
      </div>
    );
  }
}

ChallengeStatus.defaultProps = {
  challenge: {},
  config: {},
  detailLink: '',
  sampleWinnerProfile: undefined,
};

ChallengeStatus.propTypes = {
  challenge: PropTypes.object,
  config: PropTypes.object,
  detailLink: PropTypes.string,
};

export default ChallengeStatus;
