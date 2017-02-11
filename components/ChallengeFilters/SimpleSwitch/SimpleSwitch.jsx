/**
 * A simple on/off switch with label.
 *
 * To set the label pass in the 'label' string property. The callback provided
 * via the 'onSwitch' property, if any, will be called each time the user clicks
 * the switch, and the new state is passed into the callback as a boolean argument.
 */

import React from 'react';
import './SimpleSwitch.scss';

function SimpleSwitch(props) {

  function onSwitch(event) {
    if (props.onSwitch) props.onSwitch(event.target.checked);
  }

  return (
    <label className="SimpleSwitch">
      {props.label}
      <input onChange={onSwitch} type="checkbox" />
    </label>
  );
}

export default SimpleSwitch;
