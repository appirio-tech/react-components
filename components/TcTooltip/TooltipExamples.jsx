import React from 'react';
import TcTooltip from './TcTooltip';

require('./TooltipExamples.scss');

const thtml = `
    This is a tooltip!
    <h4>This is a tooltip! This is a tooltip! This is a tooltip! This is a tooltip!</h4>
    <a href="#"></a>
    <img src="components/Avatar/place-holder.svg" alt=""/>
  `;
const TooltipExamples = () => (
  <div className="TooltipExamples">
    <TcTooltip tooltipContent={thtml}>hover here</TcTooltip>
  </div>
)

module.exports = TooltipExamples
