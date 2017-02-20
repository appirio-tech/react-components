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

  let className = 'FiltersSwitch tc-outline-btn';
  if (props.active) className += ' active';

  /* We subtract 1 because filtering by the track is always counted, but we don't
   * want to account for it in the filters panel switch. */
  let filtersCount;
  if (props.filtersCount > 1) {
    filtersCount = <span className="filtersCount">{props.filtersCount - 1}</span>;
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
