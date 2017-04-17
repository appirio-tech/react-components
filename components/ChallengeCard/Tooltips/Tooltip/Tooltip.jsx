/* global
  window
*/

/**
 * Tooltip component.
 *
 * This is a ReactJS wrapper around the https://github.com/darsain/tooltip
 * library.
 *
 * USAGE:
 * Wrap with <Tooltip></Tooltip> tags the element(s) which should show a tooltip
 * when hovered by mouse cursor. Pass in the tooltip content via the 'content'
 * prop. Use the 'className' property to set the base class of the tooltip container.
 */

import React, { PropTypes as PT } from 'react';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import _ from 'lodash';

// import TooltipLib from './tooltip-lib';
import './Tooltip.scss';


function Tooltip({ position, content, className, onTooltipHover, children, placeArrow, align }) {
  return (
    <RCTooltip
      placement={position}
      overlay={content}
      overlayClassName={className}
      onPopupAlign={placeArrow}
      align={align}
      onVisibleChange={_.once(onTooltipHover)}
    >
      <div>
        { children }
      </div>
    </RCTooltip>
  );
}

Tooltip.defaultProps = {
  align: {},
  position: 'top',
  className: '',
  content: 'TOOLTIP',
  defaultVisible: false,
  onTooltipHover: _.noop,
  placeArrow: _.noop,
};

Tooltip.propTypes = {
  align: PT.any,
  position: PT.string,
  children: PT.node.isRequired,
  className: PT.string,
  content: PT.node,
  onTooltipHover: PT.func,
  placeArrow: PT.func,
};

export default Tooltip;
