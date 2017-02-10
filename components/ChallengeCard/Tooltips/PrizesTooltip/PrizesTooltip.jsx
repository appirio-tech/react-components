/**
 * Prizes Tooltip Component.
 *
 * USAGE:
 * Wrap with <PrizesTooltip></PrizesTooltip> tags the element(s) which should
 * show the tooltip when hovered. Pass in the challenge details object via the
 * 'challenge' prop.
 */

import React, { PropTypes as PT } from 'react'
import Tooltip from '../Tooltip';
import './PrizesTooltip.scss';

/**
 * A single bonus componenent.
 * It renders the bonus name inside a colored rectangle,
 * and the bonus number, formatted as currency, next to it.
 */
function Bonus(props) {
  return (
    <div className="bonus">
      <span className="bonus-name">{props.bonusName}</span>
      ${props.bonus.toLocaleString()}
    </div>
  );
}

Bonus.propTypes = {
  bonusName: PT.string.isRequired,
  bonus: PT.number.isRequired,
};

/**
 * A single prise component.
 * It renders a round-shaped medal with the specified place number inside it,
 * and the prize, formatted as currency, next to it.
 */
function Prize(props) {
  return (
    <div className="prize">
      <span className={`medal place-${props.place}`}>{props.place}</span>
      ${props.prize.toLocaleString()}
    </div>
  );
}

Prize.propTypes = {
  place: PT.number.isRequired,
  prize: PT.number.isRequired,
};

/**
 * Tooltip content.
 * It renders the list of prizes (using the Prize component), and, if reliability
 * bonus is associated with the challenge, it also renders it (using the Bonus component).
 */
function Tip(props) {
  let prizes;
  if (props.challenge.prize) {
    prizes = props.challenge.prize.map((prize, index) => {
      const place = 1 + index;
      return <Prize key={place} place={place} prize={prize} />;
    });
  }
  let bonuses;
  if (props.challenge && props.challenge.reliabilityBonus) {
    bonuses = (
      <div className="bonuses">
        <h1>Bonuses</h1>
        <Bonus bonus={props.challenge.reliabilityBonus} bonusName="Reliability" />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Prizes</h1>
        {prizes}
      </div>
      {bonuses}
    </div>
  );
}

Tip.propTypes = {
  challenge: PT.shape({
    prize: PT.array,
    reliabilityBonus: PT.number,
  }).isRequired,
};

/**
 * Renders the tooltip.
 */
function PrizesTooltip(props) {
  const tip = <Tip challenge={props.challenge} />;
  return (
    <Tooltip className="prizes-tooltip" content={tip}>
      {props.children}
    </Tooltip>
  );
}

PrizesTooltip.defaultProps = {
  challenge: {
    prize: [],
  },
};

PrizesTooltip.propTypes = {
  challenge: PT.shape({
    prize: PT.array,
    reliabilityBonus: PT.number,
  }),
  children: PT.node.isRequired,
};

export default PrizesTooltip;
