import React from 'react'
import LeaderboardAvatar from '../LeaderboardAvatar/LeaderboardAvatar'
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar'
import RegistrantsIcon from '../Icons/RegistrantsIcon'
import SubmissionsIcon from '../Icons/SubmissionsIcon'
import ForumIcon from '../Icons/ForumIcon'
import moment from 'moment'
import './ChallengeStatus.scss'

// Constants

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
  const res = `${duration.days() > 0 ? `${duration.days()}d` : ''} ${duration.hours()}:${duration.minutes()} h`
  return res[1] === '-' ? 'Late' : `${res} to go`
}

const getTimeToGo = (start, end) => {
  const percentageComplete = (moment() - moment(start)) / (moment(end) - moment(start)) * 100
  return (Math.round(percentageComplete * 100) / 100)
}

function ChallengeStatus ({challenge}) {

  challenge.registered = Math.random() > .5

  const lastItem = {
    handle: `+${MOCK_WINNERS.length - MAX_VISIBLE_WINNERS}`
  }
  MOCK_WINNERS = MOCK_WINNERS.slice(0, MAX_VISIBLE_WINNERS)
  MOCK_WINNERS.push(lastItem)

  const renderLeaderboard = MOCK_WINNERS.map((winner) => {
    return (<LeaderboardAvatar key={winner.handle} member={winner}/>)
  })

  const renderRegisterButton = () => {
    return (
      challenge.registrationOpen === 'Yes' && !challenge.registered ?
      <a href="#" className="register-button">
        {getTimeLeft(challenge.registrationEndDate)}
        <span>to register</span>
      </a>
      : <span></span>
    )
  }

  const activeChallenge = () => {
    return (
      <div className={challenge.registered || challenge.registrationOpen !== 'Yes' ? 'challenge-progress' : 'challenge-progress with-register-button'}>
        <span className="current-phase">{challenge.currentPhaseName ? challenge.currentPhaseName : STALLED_MSG}</span>
        <span className="challenge-stats">
          <span>
            <a href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
              <RegistrantsIcon/> {challenge.numRegistrants}
            </a>
          </span>
          <span>
            <a href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
              <SubmissionsIcon/> {challenge.numSubmissions}
            </a>
          </span>
          {
            challenge.registered === 'Active' ?
            <span>
              <a href={`${FORUM_URL}${challenge.forumId}`}><ForumIcon/></a>
            </span>
            : renderRegisterButton()
          }
        </span>
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
      </div>
    )
  }

  const completedChallenge = () => {
    return (
      <div>
        {renderLeaderboard}
        <span className="challenge-stats">
          <span>
            <a href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
              <RegistrantsIcon/> {challenge.numRegistrants}
            </a>
          </span>
          <span>
            <a href={`${CHALLENGE_URL}${challenge.challengeId}/?type=${challenge.track.toLowerCase()}#viewRegistrant`}>
              <SubmissionsIcon/> {challenge.numSubmissions}
            </a>
          </span>
          <span className={ challenge.registered ? '' : 'hidden'}>
            <a href={`${FORUM_URL}${challenge.forumId}`}><ForumIcon/></a>
          </span>
        </span>
      </div>
    )
  }

  return (
    <div className="challenge-status">
      {challenge.status === 'Completed' ? completedChallenge() : activeChallenge()}
    </div>
  )
}

export default ChallengeStatus
