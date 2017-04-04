import React from 'react'
import classNames from 'classnames'

require('./SubTrackDetails.scss')

const SubTrackDetails = ({name, code, description, tracks}) => {
  const developClass = classNames(
    'verticalLine', 'develop',
    {hidden: tracks.indexOf('develop') === -1 }
  )
  const designClass = classNames(
    'verticalLine', 'design',
    {hidden: tracks.indexOf('design') === -1}
  )
  const dataScienceClass = classNames(
    'verticalLine', 'dataScience',
    {hidden: tracks.indexOf('data science') === -1}
  )

  return (
    <div className="SubTrackDetails">
    <div className="heading">
        <div className={developClass} />
        <div className={designClass} />
        <div className={dataScienceClass} />
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
