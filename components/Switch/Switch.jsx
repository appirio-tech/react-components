/**
 * The Switch component provides a simple, but stylish on/off switch.
 * This is a new component, valid for use in new pages.
 */

import React, { PropTypes as PT } from 'react';
import './Switch.scss';

export default function Switch(props) {
  return (
    <div
      className={`Switch ${props.enabled ? 'enabled' : 'disabled'}`}
      onClick={() => props.onSwitch(!props.enabled)}
    ><div className="switch-handle" />
    </div>
  );
}

Switch.defaultProps = {
  enabled: false,
};

Switch.propTypes = {
  enabled: PT.bool,
  onSwitch: PT.func.isRequired,
};
