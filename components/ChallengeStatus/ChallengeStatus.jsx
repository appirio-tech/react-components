import React from 'react';
import LeaderboardAvatar from '../LeaderboardAvatar/LeaderboardAvatar';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import ProgressBarTooltip from '../ChallengeCard/Tooltips/ProgressBarTooltip';
import RegistrantsIcon from '../Icons/RegistrantsIcon';
import SubmissionsIcon from '../Icons/SubmissionsIcon';
import Tooltip from '../ChallengeCard/Tooltips/Tooltip';
import UserAvatarTooltip from '../ChallengeCard/Tooltips/UserAvatarTooltip';
import ForumIcon from '../Icons/ForumIcon';
import moment from 'moment';
import './ChallengeStatus.scss';

// Constants
const MM_LONGCONTEST = 'https://community.topcoder.com/longcontest/?module';
const MM_REG = `${MM_LONGCONTEST}=ViewRegistrants&rd=`;
const MM_SUB = `${MM_LONGCONTEST}=ViewStandings&rd=`;
const ID_LENGTH = 6;

// Mock winners array
let MOCK_WINNERS = [
  {
    handle: 'tc1',
    position: 1
  },
  {
    handle: 'tc2',
    position: 2,
    photoURL: 'https://acrobatusers.com/assets/images/template/author_generic.jpg'
  },
  {
    handle: 'tc3',
    position: 3
  },
  {
    handle: 'tc4',
    position: 4
  }
]
const MAX_VISIBLE_WINNERS = 3
const FORUM_URL = 'https://apps.topcoder.com/forums/?module=Category&categoryID='
const CHALLENGE_URL = 'https://www.topcoder.com/challenge-details/'
const STALLED_MSG = 'Stalled'


const getTimeLeft = (date) => {
  const duration = moment.duration(moment(date).diff(moment()))
  const hour = duration.hours()
  let hString = hour < 10 ? '0'+hour : hour;
  hString = hour < 0 ? '-'+hString : hString;
  const min = duration.minutes()
  let mString = min < 10 ? '0'+min : min;
  mString = min < 0 ? '-'+mString : mString;
  const res = `${duration.days() > 0 ? `${duration.days()}d` : ''} ${hString}:${mString} h`
  return res[1] === '-' ? 'Late' : `${res} to go`
}

const getTimeToGo = (start, end) => {
  const percentageComplete = (moment() - moment(start)) / (moment(end) - moment(start)) * 100
  return (Math.round(percentageComplete * 100) / 100)
}

function ChallengeStatus ({challenge, sampleWinnerProfile}) {

  challenge.registered = Math.random() > .5

  const lastItem = {
    handle: `+${MOCK_WINNERS.length - MAX_VISIBLE_WINNERS}`
  }
  MOCK_WINNERS = MOCK_WINNERS.slice(0, MAX_VISIBLE_WINNERS)
  MOCK_WINNERS.push(lastItem)

  const renderLeaderboard = MOCK_WINNERS.map((winner) => {
    return (
      <div className="avatar-container" key={winner.handle}>
        <UserAvatarTooltip user={sampleWinnerProfile}>
          <LeaderboardAvatar member={winner}/>
        </UserAvatarTooltip>
      </div>
    )
  })

  const renderRegisterButton = () => {
    const lng = getTimeLeft(challenge.registrationEndDate).length
    return (
      challenge.registrationOpen === 'Yes' && !challenge.registered ?
      <a href="#" className="register-button">
        {getTimeLeft(challenge.registrationEndDate).substring(0, lng-6)}
        <span className="to-register">to register</span>
      </a>
      : <span></span>
    )
  }

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
  const registrantsLink = (challenge, type) => {
    if(challenge.track === 'DATA_SCIENCE') {
      const id = challenge.challengeId + '';
      if(id.length < ID_LENGTH) {
        return `${type}${challenge.challengeId}`;
      } else {
        return `${CHALLENGE_URL}${challenge.challengeId}/?type=develop#viewRegistrant`;
      }
    } else {
      return `${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`;
    }
  }
  const activeChallenge = () => {
    return (
      <div className={challenge.registered || challenge.registrationOpen !== 'Yes' ? 'challenge-progress' : 'challenge-progress with-register-button'}>
        <span className="current-phase">{challenge.currentPhaseName ? challenge.currentPhaseName : STALLED_MSG}</span>
        <span className="challenge-stats">
          <span>
            <Tooltip content={numRegistrantsTipText(challenge.numRegistrants)} className="num-reg-tooltip">
              <a className="num-reg" href={registrantsLink(challenge, MM_REG)}>
                <RegistrantsIcon/> <span className="number">{challenge.numRegistrants}</span>
              </a>
            </Tooltip>
          </span>
          <span>
            <Tooltip content={numSubmissionsTipText(challenge.numSubmissions)}>
              <a className="num-sub" href={registrantsLink(challenge, MM_SUB)}>
                <SubmissionsIcon/> <span className="number">{challenge.numSubmissions}</span>
              </a>
            </Tooltip>
          </span>

          {
            challenge.registered === 'Active' ?
            <span className={ challenge.registered ? '' : 'hidden'}>
              <a className="link-forum" href={`${FORUM_URL}${challenge.forumId}`}><ForumIcon/></a>
            </span>
            : renderRegisterButton()
          }
        </span>
        <ProgressBarTooltip challenge={challenge}>
          {
            challenge.status === 'Active' ?
            <div>
              <ChallengeProgressBar color={challenge.status === 'Active' ? 'green' : 'gray'}
                value={getTimeToGo(challenge.registrationStartDate, challenge.currentPhaseEndDate)}
                isLate={getTimeLeft(challenge.currentPhaseEndDate) === 'Late'}
              />
              <div className="time-left">{getTimeLeft(challenge.currentPhaseEndDate)}</div>
            </div>
              :
            <ChallengeProgressBar color="gray" value="100"/>
          }
        </ProgressBarTooltip>
      </div>
    )
  }

  const completedChallenge = () => {
    return (
      <div>
        {renderLeaderboard}
        <span className="challenge-stats">
          <span>
            <Tooltip content={numRegistrantsTipText(challenge.numRegistrants)}>
              <a className="num-reg" href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
                <RegistrantsIcon/> <span className="number">{challenge.numRegistrants}</span>
              </a>
            </Tooltip>
          </span>
          <span>
            <Tooltip content={numSubmissionsTipText(challenge.numSubmissions)}>
              <a className="num-sub" href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
                <SubmissionsIcon/> <span className="number">{challenge.numSubmissions}</span>
              </a>
            </Tooltip>
          </span>
          <span className={ challenge.registered ? '' : 'hidden'}>
            <a className="link-forum" href={`${FORUM_URL}${challenge.forumId}`}><ForumIcon/></a>
          </span>
        </span>
      </div>
    )
  }

  const status = challenge.status === 'Completed' ? "completed" : "";

  return (
    <div className={"challenge-status "+status}>
      {challenge.status === 'Completed' ? completedChallenge() : activeChallenge()}
    </div>
  )
}

export default ChallengeStatus;
