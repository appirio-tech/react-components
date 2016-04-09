import Tooltip from './Tooltip'
import React from 'react'

require('./TooltipExamples.scss')

const TooltipExamples = () => (
  <div className="tooltip-examples-container">
    <Tooltip>
      <div className="tooltip-target" id="tooltip-1">Default Mouseover Tooltip Example</div>
      <div className="tooltip-body">
        <p>This is a tooltip using the default theme.</p>
      </div>
    </Tooltip>

    <Tooltip popMethod="click" className="TestClassOne CustomClass2 AnotherCustomClass">
      <div className="tooltip-target" id="tooltip-2">Click Tooltip with Custom Classes Example</div>
      <div className="tooltip-body">
        <p>This is a tooltip activated with a mouse click.</p>
        <p>This tooltip also contains custom classes passed through the tooltip component render.</p>
        <p>Click Target again to close tooltip.</p>
      </div>
    </Tooltip>

    <Tooltip theme="blue-round">
      <div className="tooltip-target" id="tooltip-3">Themed Tooltip Example</div>
      <div className="tooltip-body">
        <p>This is a tooltip using a custom theme.</p>
      </div>
    </Tooltip>

    <Tooltip tooltipDelay={3000}>
      <div className="tooltip-target" id="tooltip-4">Delayed Tooltip Example</div>
      <div className="tooltip-body">
        <p>This is a tooltip with a 3 second popup delay and a transition effect.</p>
      </div>
    </Tooltip>

    <Tooltip pointerWidth={20} tooltipMargin={25} tooltipPadding={5} pointerGap={1}>
      <div className="tooltip-target" id="tooltip-5">Alternative Spacing Tooltip Example</div>
      <div className="tooltip-body">
        <p>This is a tooltip with alternative padding, margin, pointer size and gap size configured through tooltip custom attributes.</p>
      </div>
    </Tooltip>

    <Tooltip>
      <img src="http://placekitten.com/200/200" className="tooltip-target" id="tooltip-6" alt="tooltip on image target example" />
      <div className="tooltip-body">
        <p>This is a tooltip on an image and also containing an image.</p>
        <p>Tooltips can be applied to any HTML tag, and contain any content.</p>
        <img src="http://placekitten.com/100/100" alt="kittens" />
        <p>More text.</p>
      </div>
    </Tooltip>
  </div>
)

module.exports = TooltipExamples
