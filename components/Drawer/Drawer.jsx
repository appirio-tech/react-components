import React from 'react'
import PropTypes from 'prop-types'
import MuiDrawer from 'material-ui/Drawer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const DEFAULT_PROPS = {
  width: 800,
  openSecondary: true,
  containerStyle: {
    boxShadow: '0 0 30px 0 rgba(42, 42, 42, 0.3), 0 0 5px 0 rgba(170, 170, 170, 0.5)'
  },
  overlayStyle: {
    backgroundColor: 'rgba(244, 244, 244, 0.5)'
  },
  docked: false
}
const Drawer = (props) => {
  const finalProps = {
    ...DEFAULT_PROPS,
    ...props,
    containerStyle: {
      ...DEFAULT_PROPS.containerStyle,
      ...props.containerStyle
    },
    overlayStyle: {
      ...DEFAULT_PROPS.overlayStyle,
      ...props.overlayStyle
    }
  }
  return (
    <MuiThemeProvider>
      <MuiDrawer {...finalProps} />
    </MuiThemeProvider>
  )
}

Drawer.propTypes = {
  /**
   * The contents of the `Drawer`
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The CSS class name of the container element.
   */
  containerClassName: PropTypes.string,
  /**
   * Override the inline-styles of the container element.
   */
  containerStyle: PropTypes.object,
  /**
   * If true, swiping sideways when the `Drawer` is closed will not open it.
   */
  disableSwipeToOpen: PropTypes.bool,
  /**
   * If true, the `Drawer` will be docked. In this state, the overlay won't show and
   * clicking on a menu item will not close the `Drawer`.
   */
  docked: PropTypes.bool,
  /**
   * Callback function fired when the `open` state of the `Drawer` is requested to be changed.
   *
   * @param {boolean} open If true, the `Drawer` was requested to be opened.
   * @param {string} reason The reason for the open or close request. Possible values are
   * 'swipe' for open requests; 'clickaway' (on overlay clicks),
   * 'escape' (on escape key press), and 'swipe' for close requests.
   */
  onRequestChange: PropTypes.func,
  /**
   * If true, the `Drawer` is opened.  Providing a value will turn the `Drawer`
   * into a controlled component.
   */
  open: PropTypes.bool,
  /**
   * If true, the `Drawer` is positioned to open from the opposite side.
   */
  openSecondary: PropTypes.bool,
  /**
   * The CSS class name to add to the `Overlay` component that is rendered behind the `Drawer`.
   */
  overlayClassName: PropTypes.string,
  /**
   * Override the inline-styles of the `Overlay` component that is rendered behind the `Drawer`.
   */
  overlayStyle: PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The width of the left most (or right most) area in pixels where the `Drawer` can be
   * swiped open from. Setting this to `null` spans that area to the entire page
   * (**CAUTION!** Setting this property to `null` might cause issues with sliders and
   * swipeable `Tabs`: use at your own risk).
   */
  swipeAreaWidth: PropTypes.number,
  /**
   * The width of the `Drawer` in pixels or percentage in string format ex. `50%` to fill
   * half of the window or `100%` and so on. Defaults to using the values from theme.
   */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * The zDepth of the `Drawer`.
   */
  zDepth: PropTypes.number
}

export default Drawer
