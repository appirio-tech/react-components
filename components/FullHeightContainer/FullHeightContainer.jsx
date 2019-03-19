import React from 'react'
import cn from 'classnames'

require('./FullHeightContainer.scss')

class FullHeightContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { heights : {} }
  }

  componentDidMount() {
    let page = this.refs.fullHeightContainer
    const offset = this.props.offset || 0
    while(page && page.nodeName !== '#document') {
      // backs up the previous height, if any, set on the node
      page.setAttribute('fhc-prev-height', page.style.height)
      page.style.height = 'calc(100vh - ' + offset + 'px)'
      page = page.parentNode
    }
  }

  componentWillUnmount() {
    let page = this.refs.fullHeightContainer
    while(page && page.nodeName !== '#document') {
      // restores the previous height, if any, set on the node
      page.style.height = page.getAttribute('fhc-prev-height')
      page.removeAttribute('fhc-prev-height')
      page = page.parentNode
    }
  }

  render() {
    const containerClasses = cn('FullHeightContainer', {
      [`${this.props.className}`] : true
    })
    return (
      <div className={ containerClasses } ref="fullHeightContainer">
        { this.props.children }
      </div>
    )
  }
}

export default FullHeightContainer
