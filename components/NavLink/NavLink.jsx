import React, { PropTypes, Component } from 'react'
import {withRouter, Link} from "react-router"

class NavLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { to, content, classes, target } = this.props,
      isActive = this.props.router.isActive(this.props.to, true)
    if (isActive) {
      classes += ' selected'
    }
    let attrs = {
      to: to
    }
    if (target || target !== '_self') {
      attrs.target = target
    }
    return (
      <li className={classes}>
        <Link {...attrs}>{content}</Link>
      </li>
    )
  }
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  content: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired
}

export default withRouter(NavLink)
