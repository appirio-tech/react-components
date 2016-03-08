import { PropTypes, Component } from 'react'

require('./MenuBar.scss')

class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = {mobile: false}
  }

  componentWillMount() {
    this.handleResize(this)
    const handleResize = this.handleResize
    const thisRef = this
    this.state.handler = function() { handleResize(thisRef) }
    window.addEventListener('resize', this.state.handler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.handler)
  }

  handleResize(thisRef) {
    let breakPoint = thisRef.props.mobileBreakPoint
    if (!breakPoint) {
      breakPoint = MenuBar.MobileBreakPoint
    }
    if (window.innerWidth > breakPoint) {
      thisRef.setState({mobile: false})
    } else {
      thisRef.setState({mobile: true})
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

MenuBar.MobileBreakPoint = 768

export default MenuBar