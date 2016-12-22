/**
 * The switch for hiding/showing the filters panel.
 *
 * It is in the pressed state when the 'active' boolean property is true.
 * When the 'filtersCount' number property evaluates to true it shows this
 * number in a blue bubble, as the number of active filters.
 *
 * When the user clicks this component, it triggers the callback provided via
 * the 'onSwitch' property, passing in the demanded active state as a boolean
 * argument (it will be just a logical NOT of the 'active' property).
 */

import React from 'react';

import './FiltersSwitch.scss';
import filtersIcon from './ui-filters.svg';

function FiltersSwitch(props) {

  let className = 'FiltersSwitch';
  if (props.active) className += ' active';

  let filtersCount;
  if (props.filtersCount) {
    filtersCount = <span className="filtersCount">{props.filtersCount}</span>;
  }

  return (
    <div
      className={className}
      onClick={() => props.onSwitch ? props.onSwitch(!props.active) : null}
    >
      <img id="icon" src={filtersIcon} />
      Filters
      {filtersCount}
    </div>
  );
}

export default FiltersSwitch;
