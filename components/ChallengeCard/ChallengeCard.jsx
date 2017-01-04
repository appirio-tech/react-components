import React from 'react'
import moment from 'moment'

function ChallengeCard ({challenge}) {
  return (
    <div className="challengeCard">
      <p>{challenge.name}</p>
    </div>
  )
}

export default ChallengeCard
