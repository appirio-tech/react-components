require('./SubTrackDetailsExample.scss')

import SubTrackDetails from './SubTrackDetails'
import React from 'react'

const challengeDetails = {
  name : 'First To Finish',
  code : 'F2F',
  description : 'Specific challenge type where the first to submit a passable solution is the winner.',
  tracks : ['develop', 'design', 'data science']
}

const challengeDetails2 = {
  name : 'First To Finish',
  code : 'F2F',
  description : 'Specific challenge type where the first to submit a passable solution is the winner.',
  tracks : ['data science']
}


const challengeDetails3 = {
  name : 'First To Finish',
  code : 'F2F',
  description : 'Specific challenge type where the first to submit a passable solution is the winner.',
  tracks : ['develop', 'data science']
}

const challengeDetails4 = {
  name : 'First To Finish',
  code : 'F2F',
  tracks : ['develop', 'design', 'data science']
}


const SubTrackDetailsExample = () => (
  <div>
    <div className="divStyle">
      <SubTrackDetails name={challengeDetails.name} code={challengeDetails.code} description={challengeDetails.description} tracks={challengeDetails.tracks}/>
    </div>
    <br/>
    <div className="divStyle">
      <SubTrackDetails name={challengeDetails2.name} code={challengeDetails2.code} description={challengeDetails2.description} tracks={challengeDetails2.tracks}/>
    </div>
    <br/>
    <div className="divStyle">
      <SubTrackDetails name={challengeDetails3.name} code={challengeDetails3.code} description={challengeDetails3.description} tracks={challengeDetails3.tracks}/>
    </div>
    <br/>
    <div className="divStyle">
      <SubTrackDetails name={challengeDetails4.name} code={challengeDetails4.code} description={challengeDetails4.description} tracks={challengeDetails4.tracks}/>
    </div>
  </div>
)

module.exports = SubTrackDetailsExample
