import React from 'react'
import PropTypes from 'prop-types'
import {Toolbar as MuiToolbar } from 'material-ui/Toolbar'
import * as COLORS from '../../constants/colors'

const DEFAULT_PROPS = {
  style: {
    backgroundColor: COLORS.TC_DARK_BLUE_100,
    color: COLORS.TC_WHITE
  }
}

const Toolbar = (props) => {
  const finalProps = {
    ...DEFAULT_PROPS,
    ...props,
    style: {
      ...DEFAULT_PROPS.style,
      ...props.style
    }
  }
  return <MuiToolbar {...finalProps} />
}

Toolbar.propTypes = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Do not apply `desktopGutter` to the `Toolbar`.
   */
  noGutter: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object
}

export default Toolbar
