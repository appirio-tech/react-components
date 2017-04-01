import React from 'react';
import './ChallengeProgressBar.scss';

function ChallengeProgressBar({color, value, isLate}) {
  let prgrWidth = value > 100 ? 100 : value
  return (
    <div className="challenge-progress-bar">
      <div className={`fill ${isLate ? 'red' : color}`} style={{width: (isLate ? 100 : prgrWidth) + '%'}}></div>
    </div>
  )
}

export default ChallengeProgressBar;
