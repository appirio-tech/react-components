require('./SubTrackDetails.scss')

import React, { Component } from 'react'

class SubTrackDetails extends Component {
  render() {
    return (
      <div className="SubTrackDetails">
        <div className="heading">
            <div className={this.props.tracks.indexOf('develop') === -1 ? 'hidden' : 'verticalLine develop' }></div>
            <div className={this.props.tracks.indexOf('design') === -1 ? 'hidden' : 'verticalLine design' }></div> 
            <div className={this.props.tracks.indexOf('data science') === -1 ? 'hidden' : 'verticalLine dataScience' }></div> 
            <div className="title">{this.props.name}</div>
         </div>
        <p className={this.props.description ? '' : 'hidden' }>{this.props.description}</p>
      </div>
    )
  }
}
export default SubTrackDetails
