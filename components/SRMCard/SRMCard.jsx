import React from 'react';
import UserAvatarTooltip from '../ChallengeCard/Tooltips/UserAvatarTooltip';
import LeaderboardAvatar from '../LeaderboardAvatar/LeaderboardAvatar';
import TrackAbbreviationTooltip from '../ChallengeCard/Tooltips/TrackAbbreviationTooltip';
import ProgressBarTooltip from '../ChallengeCard/Tooltips/ProgressBarTooltip';
import TrackIcon from '../TrackIcon/TrackIcon';
import Tooltip from '../ChallengeCard/Tooltips/Tooltip';
import PastSRMCard from './PastSRMCard';

require('./SRMCard.scss');

// Mock REGISTRANTS array
let MOCK_REGISTRANTS = [
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
    handle: 'KalininN',
    isSmr: true
  },
  {
    handle: 'KalininN',
    isSmr: true
  }
];
const MAX_VISIBLE_REGISTRANTS = 4;

const lastItem = {
  handle: `+${MOCK_REGISTRANTS.length - MAX_VISIBLE_REGISTRANTS}`
}
MOCK_REGISTRANTS = MOCK_REGISTRANTS.slice(0, MAX_VISIBLE_REGISTRANTS);
MOCK_REGISTRANTS.push(lastItem);

const renderLeaderboard = MOCK_REGISTRANTS.map((winner, index) => {
  return (
    <div className="avatar-container" key={winner.handle}>
        <LeaderboardAvatar member={winner}/>
        {index < MOCK_REGISTRANTS.length - 1 ? <div className="name">{winner.handle}</div> : ''}
    </div>
  )
})

// Happening now
const happeningNow = () => {
  return (
    <div className="SRMCard">
      <div className="left-panel">
        <div className="SRM-track">
          <TrackAbbreviationTooltip track={'DATA_SCIENCE'} subTrack={'SRM'}>
            <TrackIcon track={'DATA_SCIENCE'} subTrack={'SRM'} tcoEligible={'TCO'} />
          </TrackAbbreviationTooltip>
        </div>
        <div className="SRM-details">
          <p className="open-title">Happening now: SRM 678</p>
          <div className="SRM-open-info">
            <p className="registered">156 registered members</p>
            <p className="registeration-ends">Registration ends in 24 min.</p>
          </div>
        </div>
      </div>
      <div className="right-panel now">
        <div className="SRM-registrants">
          {renderLeaderboard}
        </div>
      </div>
      <a href="javascript:;" className="register-button">
        <span className="to-register">+ Register</span>
      </a>
    </div>
  )
}
// upcoming SRMs
const upcomingSRMs = () => {
  return (
    <div className="SRMCard">
      <div className="left-panel upcoming">
        <div className="SRM-track">
          <TrackAbbreviationTooltip track={'DATA_SCIENCE'} subTrack={'SRM'}>
            <TrackIcon track={'DATA_SCIENCE'} subTrack={'SRM'} />
          </TrackAbbreviationTooltip>
        </div>
        <div className="SRM-details">
          <p className="upcoming-title">Competitive Programming - Single Round Match 679</p>
        </div>
      </div>
      <div className="right-panel upcoming">
        <div className="SRM-date">Aug 31, 2015 12:30 pm</div>
        <a href="javascript:;" className="notify-me">Notify me</a>
      </div>
    </div>
  )
}

// past SRMs
const pastSRMs = () => {
  return (
    <div>
      <PastSRMCard></PastSRMCard>
      <PastSRMCard></PastSRMCard>
      <PastSRMCard></PastSRMCard>
    </div>
  )
}

/*
* SRM card
*/
const SRMCard = ({category}) => {
  return (
    <div className="SRMCard-container">
      {category === 'now' ? happeningNow() : ''}
      {category === 'upcoming' ? upcomingSRMs() : ''}
      {category === 'past' ? pastSRMs() : ''}
    </div>
  )
}

export default SRMCard;
