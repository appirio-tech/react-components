import React from 'react'
import MenuBar from '../MenuBar/MenuBar'
import Panel from '../Panel/Panel'
import moment from 'moment'

function ChallengeCard ({challenge}) {
  return (
    <div className="challengeCard">
      <p>{challenge.name}</p>
    </div>
  )
}

export default ChallengeCard
