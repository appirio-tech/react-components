require('./SubTrackDetails.scss')

import React from 'react'

const SubTrackDetails = ({name,code,description,tracks}) => {
  return (
    <div className="SubTrackDetails">
    <div className="heading">
        <div className={tracks.indexOf('develop') === -1 ? 'hidden' : 'verticalLine develop' }></div>
        <div className={tracks.indexOf('design') === -1 ? 'hidden' : 'verticalLine design' }></div> 
        <div className={tracks.indexOf('data science') === -1 ? 'hidden' : 'verticalLine dataScience' }></div> 
        <div className="title">{name} ({code})</div>
        </div>
    <p className={description ? '' : 'hidden' }>{description}</p>
    </div>
  )
}

SubTrackDetails.propTypes = {
  name: React.PropTypes.string,
  code: React.PropTypes.string,
  description: React.PropTypes.string,
  tracks: React.PropTypes.array
}

export default SubTrackDetails
