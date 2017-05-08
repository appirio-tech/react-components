/**
 * Challenge filters cards type.
 *
 */

import React from 'react';
import './FiltersCardsType.scss';


const { bool, string, oneOfType } = React.PropTypes;

const FiltersCardsType = ({ isCardTypeSet, ARENA_URL }) => (
  <div className="cards-type-col">
    <a
      className={`challengs-tab ${isCardTypeSet === 'Challenges' ? 'active' : ''}`}
      onClick={e => e.preventDefault()}
    >
      Challenges
    </a>
    <a
      href={ARENA_URL}
      className="challenges-tab"
      target="_blank"
      rel="noopener noreferrer"
    >
      SRMs
    </a>
  </div>
);

FiltersCardsType.defaultProps = {
  isCardTypeSet: false,
  ARENA_URL: process.env.ARENA_URL,
};

FiltersCardsType.propTypes = {
  isCardTypeSet: oneOfType([bool, string]),
  ARENA_URL: React.PropTypes.string,
};

export default FiltersCardsType;
