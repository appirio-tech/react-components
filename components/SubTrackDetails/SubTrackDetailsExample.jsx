import SubTrackDetails from './SubTrackDetails'
import React from 'react'

/** Temporarly div Style can be replaced by tool tip componenet **/
const divStyle = {
  backgroundColor:'#47474F',
  padding:'20px',
  width:'320px'
}

const challengeDetails = {
  name : 'First To Finish',
  code : 'F2F',
  description : 'Specific challenge type where the first to submit a passable solution is the winner.',
  tracks : ['develop', 'design', 'data science']
}

const SubTrackDetailsExample = () => (
  <div style={divStyle}>
    <SubTrackDetails name={challengeDetails.name} code={challengeDetails.code} description={challengeDetails.description} tracks={challengeDetails.tracks}/>
  </div>
)

module.exports = SubTrackDetailsExample
