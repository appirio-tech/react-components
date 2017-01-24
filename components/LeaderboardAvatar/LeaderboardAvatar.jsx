import React from 'react';
import './LeaderboardAvatar.scss';

// Constants
const VISIBLE_CHARACTERS = 3;

function LeaderboardAvatar ({member}) {
  return (
    <span className={`leaderboard-avatar ${member.position || member.isSmr ? 'dark-gray' : 'light-gray'}`}>
      {member.photoURL ? <img src={member.photoURL} className="member-icon"/> : member.handle.slice(0, VISIBLE_CHARACTERS)}
      <span className={member.position ? `placement placement-${member.position}` : 'hidden'}>
        {member.position}
      </span>
    </span>
  )
}

export default LeaderboardAvatar;
