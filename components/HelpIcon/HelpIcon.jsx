/**
 * Help icon with tooltip
 */
import React from 'react'
import _ from 'lodash'
import PT from 'prop-types'
import cn from 'classnames'

import HelpIconSvg from '../icons/round-e-help.svg'
import Tooltip from '../Tooltip/Tooltip'

import styles from './HelpIcon.scss'

const HELP_TOOLTIP_SHOW_DELAY = 300

const HelpIcon = ({
  className,
  showTooltipDelay,
  tooltip
}) => {
  const delay = !_.isNumber(showTooltipDelay) ? showTooltipDelay : HELP_TOOLTIP_SHOW_DELAY

  return (
    <Tooltip
      theme={cn('light', styles['label-help-icon'], className)}
      tooltipDelay={delay}
    >
      <div className="tooltip-target"><HelpIconSvg /></div>
      <div className="tooltip-body">{tooltip}</div>
    </Tooltip>
  )
}

HelpIcon.propTypes = {
  className: PT.string,
  showTooltipDelay: PT.number,
  tooltip: PT.node
}

export default HelpIcon