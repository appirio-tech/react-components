require('./Carousel.scss')
import classNames from 'classnames'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import IconArrowMinimalLeft from '../Icons/IconArrowMinimalLeft'
import IconArrowMinimalRight from '../Icons/IconArrowMinimalRight'

export default class Carousel extends Component {
  componentWillMount() {
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener('resize', this.handleResize)
    this.handlePageUp = this.handlePageUp.bind(this)
    this.handlePageDown = this.handlePageDown.bind(this)
    this.setState({firstVisibleItem: this.props.firstVisibleItem || 0})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.validatePagers()
  }

  componentDidMount() {
    this.validatePagers()    
  }

  componentDidUpdate() {
    this.validatePagers()
  }

  validatePagers() {
    const pageDownClass = classNames(
      'page-down',
      { hidden: this.state.firstVisibleItem === 0 }
    )
    const pageUpClass = classNames(
      'page-up',
      { hidden: this.lastElementVisible(this.state.firstVisibleItem) }
    )
    const node = ReactDOM.findDOMNode(this)
    const pageDownNode = node.querySelector('.page-down')
    const pageUpNode = node.querySelector('.page-up')
    pageDownNode.className = pageDownClass
    pageUpNode.className = pageUpClass
  }


  lastElementVisible(firstVisibleItem) {
    const node = ReactDOM.findDOMNode(this)
    const parentNode = node.parentNode
    const maxWidth = parentNode.getBoundingClientRect().width
    const visibleAreaNode = node.querySelector('.visible-area')
    visibleAreaNode.style.width = maxWidth + 'px'
    const itemNodes = visibleAreaNode.children
    let width = 0
    if (firstVisibleItem > 0) {
      // if first item is not visible, account 20px for page-down element
      width += 20
      // account the right margin for page-down (see Carousel.scss)
      width += 15
    }
    for (let i = 0; i < itemNodes.length; i++) {
      const itemNode = itemNodes[i]
      width += itemNode.getBoundingClientRect().width
      if (i < itemNodes.length - 1) {
        // account 30px for every carousel-item (see Carousel.scss)
        width += 30
      }
      if (width > maxWidth) {
        return false
      }
    }
    return true
  }

  handlePageUp() {
    if (!this.lastElementVisible(this.state.firstVisibleItem + 1)) {
      const nextFirstVisibleItem = this.state.firstVisibleItem + 1
      this.setState({firstVisibleItem: nextFirstVisibleItem})
    }
  }

  handlePageDown() {
    if (this.state.firstVisibleItem > 0) {
      const nextFirstVisibleItem = this.state.firstVisibleItem - 1
      this.setState({firstVisibleItem: nextFirstVisibleItem})
    }
  }

  render() {
    const carouselItem = (item, idx) => {
      if (idx < this.state.firstVisibleItem) {
        return
      }

      return (
        <div key={idx} className="carousel-item">
          {item}
        </div>
      )
    }

    return (
      <div className="Carousel">
        <div className="page-down" onClick={this.handlePageDown}>
          <IconArrowMinimalLeft fill="#FFFFFF" />
        </div>
        <div className="visible-area">
          { this.props.children.map(carouselItem) }
        </div>
        <div className="page-up" onClick={this.handlePageUp}>
          <IconArrowMinimalRight fill="#FFFFFF" />
        </div>
      </div>
    )
  }
}