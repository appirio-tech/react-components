import React from 'react';
import Abbreviation from './Abbreviation';
import './TrackIcon.scss';

function TrackIcon ({track, subTrack, tcoEligible}) {
  return (
    <span className="trackIcon">
      <div className={track.toLowerCase() + ' main-icon'}>{Abbreviation[track][subTrack]}</div>
      <div className={tcoEligible ? track.toLowerCase() + ' tco-icon' : 'hidden'}>TCO</div>
    </span>
  )
}

export default TrackIcon;
