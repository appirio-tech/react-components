import React, { PropTypes } from 'react'
import { ToolbarTitle as MuiToolbarTitle } from 'material-ui/Toolbar'

const ToolbarTitle = (props) => {
  return <MuiToolbarTitle {...props} />
}

ToolbarTitle.propTypes = {
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The text to be displayed.
   */
  text: PropTypes.node
}

export default ToolbarTitle