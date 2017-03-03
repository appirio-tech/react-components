/**
 * Challenge filters cards type.
 *
 */

import React from 'react';

import './FiltersCardsType.scss';

const FiltersCardsType = ({setCardType, isCardTypeSet}) => {
    return (
      <div className="cards-type-col">
        <img className="alphaBadge" src={require('-!file!./alpha-badge.svg')} />
        <a href="javascript:;" className={"challengs-tab " + (isCardTypeSet === 'Challenges' ? 'active' : '')}
        onClick={() => setCardType('Challenges')}>Challenges</a>
        <a href="javascript:;" className={"challengs-tab " +
        (isCardTypeSet === 'SRMs' ? 'active' : '')}

        onClick={() => setCardType('SRMs')}>SRMs</a>
      </div>
    );
};

export default FiltersCardsType;
