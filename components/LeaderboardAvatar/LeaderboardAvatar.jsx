import React from 'react'
import './LeaderboardAvatar.scss'

// Constants
const VISIBLE_CHARACTERS = 3

function LeaderboardAvatar ({member, domain}) {
  return (
    <a href={`//${domain}/members/${member.handle}`} className={`leaderboard-avatar ${member.position || member.isSmr ? 'dark-gray' : 'light-gray'}`}>
      {member.photoURL ? <img src={member.photoURL} className="member-icon"/> : member.handle.slice(0, VISIBLE_CHARACTERS)}
      <span className={member.position ? `placement placement-${member.position}` : 'hidden'}>
        {member.position}
      </span>
    </a>
  )
}

LeaderboardAvatar.propTypes = {
  member: React.PropTypes.object,
  domain: React.PropTypes.string,
}

LeaderboardAvatar.defaultProps = {
  member: {},
  domain: process.env.domain,
}

export default LeaderboardAvatar
