/**
 * The SwitchWithLabel component extends Switch with labels before and/or after
 * it. This is a new component, valid to use in the new pages.
 */

import React, { PropTypes as PT } from 'react';
import Switch from '../Switch';
import './SwitchWithLabel.scss';

function SimpleSwitch(props) {
  return (
    <div
      className="SwitchWithLabel"
      onClick={() => props.onSwitch(!props.enabled)}
    >
      {props.labelBefore}
      <Switch enabled={props.enabled} onSwitch={props.onSwitch} />
      {props.labelAfter}
    </div>
  );
}

SimpleSwitch.defaultProps = {
  enabled: false,
  labelAfter: '',
  labelBefore: '',
};

SimpleSwitch.propTypes = {
  enabled: PT.bool,
  labelAfter: PT.string,
  labelBefore: PT.string,
  onSwitch: PT.func.isRequired,
};

export default SimpleSwitch;
