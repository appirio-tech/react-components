import React, { PropTypes, Component } from 'react'
import NavLink from '../NavLink/NavLink'
import classNames from 'classnames'

require('./MenuBar.scss')

export default class MenuBar extends Component {
  componentWillMount() {
    this.handleResize = this.handleResize.bind(this)
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({ mobile: window.innerWidth <= this.props.mobileBreakPoint })
  }

  render() {
    const { orientation, items } = this.props

    const mbClasses = classNames({
      MenuBar: true,
      [orientation]: true
    })

    const menuItem = item => {
      const itemClass = classNames({
        [orientation]: true,
        mobile: this.state.mobile
      })

      const linkTarget = item.target || null
      const linkContent = this.state.mobile ? <img src={item.img} /> : item.text
      return (
        <NavLink key={item.text} to={item.link} target={linkTarget} content={linkContent} classes={itemClass} />
      )
    }

    return (
      <ul className={mbClasses}>
        { items.map(menuItem) }
      </ul>
    )
  }
}

MenuBar.propTypes = {
  items: PropTypes.array.isRequired,
  mobileBreakPoint: PropTypes.number,
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
}

MenuBar.defaultProps = {
  mobileBreakPoint: 768,
  orientation: 'horizontal'
}
