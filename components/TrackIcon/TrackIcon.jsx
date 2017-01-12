import React from 'react'
import Abbreviation from './Abbreviation';
import './TrackIcon.scss';

import TcTooltip from '../TcTooltip';

function TrackIcon ({track, subTrack, tcoEligible}) {
  const trackName = track.toLowerCase()
  const abv = Abbreviation[track][subTrack]
  const thtml = `
    <div class="tooltip-content ${trackName}">
      <h5 class="${trackName} track-type">${subTrack.split('_').join(' ').toLowerCase()} (${abv})</h5>
      <p class="track-desc">Specific challenge type where the
      first to submit a passable solution is the winner.</p>
    </div>
  `;
  return (
    <span className="trackIcon">
      <TcTooltip tooltipContent={thtml} cName="track-tooltip">
        <div className={track.toLowerCase() + ' main-icon'}>{abv}</div>
      </TcTooltip>
      <div className={tcoEligible ? track.toLowerCase() + ' tco-icon' : 'hidden'}>TCO</div>
    </span>
  )
}

export default TrackIcon
