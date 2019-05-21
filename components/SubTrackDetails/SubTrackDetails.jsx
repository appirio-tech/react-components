import React from 'react'
import PropTypes from 'prop-types'
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
    'verticalLine', 'data',
    {hidden: tracks.indexOf('data science') === -1}
  )

  return (
    <div className="SubTrackDetails">
    <div className="heading">
        <div className={developClass}></div>
        <div className={designClass}></div>
        <div className={dataScienceClass}></div>
        <div className="title">{name} ({code})</div>
        </div>
    <p className={description ? '' : 'hidden' }>{description}</p>
    </div>
  )
}

SubTrackDetails.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  description: PropTypes.string,
  tracks: PropTypes.array
}

export default SubTrackDetails
