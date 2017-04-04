/* global
  Math
*/

/**
 *  The component displays a challenge card without any data.
 *  The empty data is replaced with grey background.
 */

import React from 'react';
import '../../ChallengeCard/ChallengeCard.scss';
import './ChallengeCardPlaceholder.scss';
import '../ComponentPlaceholder.scss';

const { string, number, oneOfType } = React.PropTypes;

const ChallengeCardPlaceholder = ({ id }) => (
  <div className="challengeCard placeholder" key={id}>
    <div className="left-panel">
      <div className="challenge-track placeholder-template" />

      <div className="challenge-details">
        <div className="challenge-title placeholder-template" />
        <div className="details-footer placeholder-template" />
      </div>
    </div>

    <div className="right-panel">
      <div className="prizes placeholder-template" />

      <div className="challenge-status">
        <div className="progress-container placeholder-template" />

        <div className="challenge-stats-container">
          <div className="challenge-stats placeholder-template" />
        </div>
      </div>
    </div>
  </div>
);

ChallengeCardPlaceholder.defaultProps = {
  id: Math.random(),
};

ChallengeCardPlaceholder.propTypes = {
  id: oneOfType([string, number]),
};

export default ChallengeCardPlaceholder;
