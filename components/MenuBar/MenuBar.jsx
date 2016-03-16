import React, { PropTypes, Component } from 'react'
import classNames from 'classNames'

require('./MenuBar.scss')

export default class MenuBar extends Component {
  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
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
        mobile: this.state.mobile,
        selected: window.location.href.indexOf(item.link) !== -1
      })

      const linkTarget = item.target || '_self'
      const linkContent = this.state.mobile ? <img src={item.img} /> : item.text

      return (
        <li key={item.text} className={itemClass}>
          <a href={item.link} target={linkTarget}>{linkContent}</a>
        </li>
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
