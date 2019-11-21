import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarGroup as MuiToolbarGroup } from 'material-ui/Toolbar'

const ToolbarGroup = (props) => {
  return <MuiToolbarGroup {...props} />
}

ToolbarGroup.propTypes = {
  /**
   * Can be any node or number of nodes.
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Set this to true for if the `ToolbarGroup` is the first child of `Toolbar`
   * to prevent setting the left gap.
   */
  firstChild: PropTypes.bool,
  /**
   * Set this to true for if the `ToolbarGroup` is the last child of `Toolbar`
   * to prevent setting the right gap.
   */
  lastChild: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object
}

export default ToolbarGroup
