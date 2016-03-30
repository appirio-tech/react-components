require('./SubTrackDetails.scss')

import React, { Component } from 'react'

var SubTrackDetails = (props) => {
    return (
      <div className="SubTrackDetails">
        <div className="heading">
            <div className={props.tracks.indexOf('develop') === -1 ? 'hidden' : 'verticalLine develop' }></div>
            <div className={props.tracks.indexOf('design') === -1 ? 'hidden' : 'verticalLine design' }></div> 
            <div className={props.tracks.indexOf('data science') === -1 ? 'hidden' : 'verticalLine dataScience' }></div> 
            <div className="title">{props.name}</div>
         </div>
        <p className={props.description ? '' : 'hidden' }>{props.description}</p>
      </div>
    )
};

SubTrackDetails.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  tracks: React.PropTypes.array
};

export default SubTrackDetails
