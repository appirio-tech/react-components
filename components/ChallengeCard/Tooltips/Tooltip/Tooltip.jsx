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
import TooltipLib from './tooltip-lib';
import './Tooltip.scss';

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.tooltip = new TooltipLib('', {
      auto: true,
      typeClass: props.className,
    });
  }


  hideTooltip() {
    this.tooltip.hide();
  }

  showTooltip() {
    if(window.innerWidth < 768) {
      this.tooltip.hide()
    }
    else {
      this.tooltip.position(this.wrapper).show();
      if(this.props.onTooltipHover) {
        this.props.onTooltipHover()
      }
    }
  }

  render() {
    return (
      <span
        onMouseEnter={() => this.showTooltip()}
        onMouseLeave={() => this.hideTooltip()}
        ref={(node) => { this.wrapper = node; }}
      >
        <span className="hidden ">
          <span
            ref={(node) => {
              if (node) this.tooltip.content(node.cloneNode(true));
            }}
          >{this.props.content}</span>
        </span>
        {this.props.children}
      </span>
    );
  }
}

Tooltip.defaultProps = {
  className: '',
  content: 'TOOLTIP',
};

Tooltip.propTypes = {
  children: PT.node.isRequired,
  className: PT.string,
  content: PT.node,
};

export default Tooltip;
