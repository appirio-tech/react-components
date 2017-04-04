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
      onClick={() => false}
    >
      Challenges
    </a>
    <a href="//arena.topcoder.com" className="challenges-tab" target="_blank">
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
