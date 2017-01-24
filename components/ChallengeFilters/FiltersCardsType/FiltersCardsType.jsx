/**
 * Challenge filters cards type.
 *
 */

import React from 'react';

import './FiltersCardsType.scss';

const FiltersCardsType = ({setCardType, isCardTypeSet}) => {
    return (
      <div className="cards-type-col">
        <a href="javascript:;" className={"challengs-tab " + (isCardTypeSet === 'Challenges' ? 'active' : '')}
        onClick={() => setCardType('Challenges')}>Challenges</a>
        <a href="javascript:;" className={"challengs-tab " +
        (isCardTypeSet === 'SRMs' ? 'active' : '')}

        onClick={() => setCardType('SRMs')}>SRMs</a>
      </div>
    );
};

export default FiltersCardsType;
