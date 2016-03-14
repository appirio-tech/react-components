import { PropTypes, Component } from 'react'

require('./MenuBar.scss')
const React = require('react')

class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = {mobile: false}
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const breakPoint = this.props.mobileBreakPoint
    if (window.innerWidth > breakPoint) {
      this.setState({mobile: false})
    } else {
      this.setState({mobile: true})
    }
  }

  render() {
    let mbClasses = 'MenuBar'
    let orientation = this.props.orientation
    if (!orientation || ['horizontal', 'vertical'].indexOf(orientation) === -1) {
      orientation = 'horizontal'
    }
    mbClasses += (' ' + orientation)
    return (
      <ul className={mbClasses}>
        {
          this.props.items.map(item => {
            let itemClass = orientation
            if (this.state.mobile) {
              itemClass += ' mobile'
            }
            if (window.location.href.indexOf(item.link) !== -1) {
              itemClass += ' selected'
            }
            if (this.state.mobile) {
              return (
                <li key={item.text} className={itemClass}><a href={item.link}><img src={item.img} /></a></li>
              )
            } else {
              return (
                <li key={item.text} className={itemClass}><a href={item.link}>{item.text}</a></li>
              )
            }
          })
        }
      </ul>
    )
  }
}

MenuBar.propTypes = {
  items             : PropTypes.array.isRequired,
  mobileBreakPoint  : PropTypes.number
}

MenuBar.defaultProps = { mobileBreakPoint: 768 }

export default MenuBar