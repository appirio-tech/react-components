import React, { PropTypes, Component } from 'react'
import { NavLink as RNavLink} from 'react-router-dom'

class NavLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { to, content, target } = this.props
    let classes = this.props.classes
    const attrs = { to }
    if (target || target !== '_self') {
      attrs.target = target
      if (attrs.target === '_blank') {
        attrs.rel = 'noopener noreferrer'
      }
    }
    return (
      <li className={classes}>
        <RNavLink activeClassName="selected" {...attrs}>{content}</RNavLink>
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

export default NavLink
