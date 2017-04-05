/**
 * Challenge filters cards type.
 *
 */

import React from 'react';
import './FiltersCardsType.scss';


const { bool, string, oneOfType } = React.PropTypes;

const FiltersCardsType = ({ isCardTypeSet }) => (
  <div className="cards-type-col">
    <a
      href=""
      className={`challengs-tab ${isCardTypeSet === 'Challenges' ? 'active' : ''}`}
      onClick={(e) => e.preventDefault()}
    >
      Challenges
    </a>
    <a
      href="//arena.topcoder.com"
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
};

FiltersCardsType.propTypes = {
  isCardTypeSet: oneOfType([bool, string]),
};

export default FiltersCardsType;
