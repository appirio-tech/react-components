import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import { NavLink as RNavLink, matchPath} from 'react-router-dom'

class NavLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { to, content, target } = this.props
    const { router } = this.context
    let classes = this.props.classes
    const attrs = { to }
    if (to && router) {
      const pathname = _.get(router, 'route.location.pathname', '')
      const active = matchPath(pathname, { path: to }) !== null
      if (active) {
        classes += ' selected'
      }
    }
    if (target || target !== '_self') {
      attrs.target = target
      if (attrs.target === '_blank') {
        attrs.rel = 'noopener noreferrer'
      }
    }
    return (
      <li className={classes}>
        <RNavLink activeClassName="active" {...attrs}>{content}</RNavLink>
      </li>
    )
  }
}

NavLink.contextTypes ={ 
  router: PropTypes.object
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  content: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired
}

export default NavLink