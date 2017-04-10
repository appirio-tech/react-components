import React from 'react'
import Abbreviation from './Abbreviation'
import './TrackIcon.scss'


function TrackIcon ({track, subTrack, tcoEligible, isDataScience, MAIN_URL}) {
  const TCO_URL = `${MAIN_URL}/tco`
  return (
    <span className="trackIcon">
      <div className={(isDataScience ? 'data_science' : track.toLowerCase()) + ' main-icon'}>{Abbreviation[track][subTrack]}</div>
      <a href={`${TCO_URL}`}>
      <div className={tcoEligible ? (isDataScience ? 'data_science' : track.toLowerCase()) + ' tco-icon' : 'hidden'}>TCO</div></a>
    </span>
  )
}
TrackIcon.defaultProps = {
  MAIN_URL: process.env.MAIN_URL
}

TrackIcon.propTypes = {
  MAIN_URL: React.PropTypes.string,
}
export default TrackIcon
