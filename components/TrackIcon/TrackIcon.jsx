import React from 'react';
import Abbreviation from './Abbreviation';
import './TrackIcon.scss';

const TCO_URL = 'https://www.topcoder.com/tco';

function TrackIcon ({track, subTrack, tcoEligible, isDataScience}) {
  return (
    <span className="trackIcon">
      <div className={(isDataScience ? 'data_science' : track.toLowerCase()) + ' main-icon'}>{Abbreviation[track][subTrack]}</div>
      <a href={`${TCO_URL}`}>
      <div className={tcoEligible ? track.toLowerCase() + ' tco-icon' : 'hidden'}>TCO</div></a>
    </span>
  )
}

export default TrackIcon;
