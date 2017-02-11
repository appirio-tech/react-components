import React from 'react';
import './ChallengeProgressBar.scss';

function ChallengeProgressBar({color, value, isLate}) {
  return (
    <div className="challenge-progress-bar">
      <div className={`fill ${isLate ? 'red' : color}`} style={{width: (isLate ? 100 : value) + '%'}}></div>
    </div>
  )
}

export default ChallengeProgressBar;
