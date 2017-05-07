import React from 'react';
import './ChallengeProgressBar.scss';

const { number, string, oneOfType, bool } = React.PropTypes;

function ChallengeProgressBar({ color, value, isLate }) {
  const prgrWidth = value > 100 ? 100 : value;
  return (
    <div className="challenge-progress-bar">
      <div className={`fill ${isLate ? 'red' : color}`} style={{ width: `${isLate ? 100 : prgrWidth}%` }} />
    </div>
  );
}

ChallengeProgressBar.defaultProps = {
  color: '',
  value: 150,
  isLate: false,
};

ChallengeProgressBar.propTypes = {
  color: string,
  value: oneOfType([string, number]),
  isLate: oneOfType([bool, string]),
};

export default ChallengeProgressBar;
