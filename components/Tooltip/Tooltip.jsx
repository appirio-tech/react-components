require('./Tooltip.scss')

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  showTooltip(evt) {
    const pointerWidth = this.props.pointerWidth
    const tooltipMargin = this.props.tooltipMargin
    const pointerGap = this.props.pointerGap
    const tooltipPadding = this.props.tooltipPadding
    const tooltipDelay = this.props.tooltipDelay
    const tooltip = ReactDOM.findDOMNode(this).querySelector('.tooltip-container')
    const ttContainer = tooltip.querySelector('.tooltip-content-container')
    const tooltipPointer = ttContainer.querySelector('.tooltip-pointer')
    const targetRect = evt.currentTarget.getBoundingClientRect()
    const targetRectCenterX = (targetRect.width / 2) + targetRect.left + window.scrollX
    const targetRectCenterY = (targetRect.height / 2) + targetRect.top + window.scrollY
    ttContainer.style.padding = tooltipPadding + 'px'
    tooltipPointer.style.width = pointerWidth + 'px'
    tooltipPointer.style.height = pointerWidth + 'px'
    const ttBorderRadius = getComputedStyle(ttContainer).getPropertyValue('border-top-left-radius').replace(/[^-\d\.]/g, '')
    //if right side of tooltip will fit above/below target on screen when centered to target
    if (targetRectCenterX + (tooltip.clientWidth / 2) + tooltipMargin < document.body.clientWidth) {
      //if left side of tooltip will not fit in available screen space when centered to target
      if (targetRectCenterX < (tooltip.clientWidth / 2) + tooltipMargin) {
        //push tooltip to left side of screen plus margin
        tooltip.style.left = tooltipMargin + 'px'
        //else, center tooltip to target
      } else {
        tooltip.style.left = targetRectCenterX - (tooltip.clientWidth / 2) + 'px'
      }
    //else, push tooltip to right edge of screen plus margin
    } else {
      tooltip.style.left = document.body.clientWidth - tooltip.clientWidth - tooltipMargin + 'px'
    }
    let tooltipRect = tooltip.getBoundingClientRect()
    let tooltipPointerLeft = 0
    if (targetRectCenterX + tooltipMargin + (pointerWidth/2) >= document.body.clientWidth) {
      tooltipPointerLeft = tooltip.clientWidth - (pointerWidth * Math.sqrt(2)) - ttBorderRadius + 'px'
    } else if (targetRectCenterX < tooltipMargin + (pointerWidth/2)) {
      tooltipPointerLeft = ttBorderRadius + 'px'
    } else {
      tooltipPointerLeft = targetRectCenterX - tooltipRect.left - (pointerWidth/2) + 'px'
    }
    //if target is too close to top of page to fit default tooltip bubble
    if (targetRect.top < tooltip.clientHeight + tooltipMargin + (pointerWidth/2) + pointerGap) {
      //if tooltip is wider than tooltip target plus available screen space when centered above/below target,
      //and screen has not been scrolled down past the top of the tooltip,
      //and there is enough space to put tooltip to the right of target on screen
      if (targetRectCenterX < (tooltip.clientWidth / 2) + tooltipMargin && window.scrollY < (targetRectCenterY - (tooltip.clientHeight / 2)) && targetRect.right + tooltip.clientWidth + tooltipMargin + (pointerWidth/2) + pointerGap < document.body.clientWidth) {
        tooltip.style.left = targetRect.right + pointerGap + (pointerWidth/2) + 'px'
        tooltip.style.top = Math.max((targetRectCenterY - (tooltip.clientHeight/2)), tooltipMargin) + 'px'
        tooltipRect = tooltip.getBoundingClientRect()
        tooltipPointer.style.bottom = 'auto'
        tooltipPointer.style.top = Math.max((((pointerWidth * Math.sqrt(2))/2) - (pointerWidth/2)), (targetRectCenterY - tooltipRect.top - window.scrollY - (pointerWidth/2))) + 'px'
        tooltipPointerLeft = - (pointerWidth/2) + 'px'
      } else {
        tooltip.style.top = targetRect.bottom + pointerGap + (pointerWidth/2) + window.scrollY + 'px'
        tooltipPointer.style.top = 'auto'
        tooltipPointer.style.bottom = tooltip.clientHeight - (pointerWidth/2) + 'px'
      }
    } else {
      tooltip.style.top = targetRect.top - tooltip.clientHeight + window.scrollY - pointerGap - (pointerWidth/2) + 'px'
      tooltipPointer.style.bottom = - (pointerWidth/2) + 'px'
      tooltipPointer.style.top = 'auto'
    }
    tooltipPointer.style.left = tooltipPointerLeft

    if (tooltip.classList.contains('tooltip-hide')) {
      tooltip.classList.remove('tooltip-hide')
      tooltip.style.transition = 'opacity ' + tooltipDelay + 'ms linear'
      tooltip.style.opacity = '1'
    }
  }

  hideTooltip() {
    const tooltip = ReactDOM.findDOMNode(this).querySelector('.tooltip-container')
    if (!tooltip.classList.contains('tooltip-hide')) {
      tooltip.classList.add('tooltip-hide')
      tooltip.style.transition = 'opacity 0s linear'
      tooltip.style.opacity = '0'
    }
  }

  onClick(evt) {
    if (this.state.isActive) {
      this.hideTooltip()
    } else {
      this.showTooltip(evt)
    }

    this.setState({ isActive: !this.state.isActive })
  }

  componentDidMount() {
    const target = ReactDOM.findDOMNode(this).querySelector('.tooltip-target')
    if (this.props.popMethod === 'hover') {
      target.addEventListener('mouseenter', this.showTooltip)
      target.addEventListener('mouseleave', this.hideTooltip)
    } else if (this.props.popMethod === 'click') {
      target.classList.add('click-pointer')
      target.addEventListener('click', this.onClick)
    }
  }

  componentWillUnmount() {
    const target = ReactDOM.findDOMNode(this).querySelector('.tooltip-target')
    target.removeEventListener('mouseenter', this.showTooltip)
    target.removeEventListener('mouseleave', this.hideTooltip)

    target.removeEventListener('click', this.onClick)

  }

  render() {

    const body = (
      <div className="tooltip-body">
          {React.Children.map(this.props.children, (child) => {
            if(child.props.className === 'tooltip-body')
              return child.props.children
          })}
      </div>
    )
    const ttClasses = classNames(
      'Tooltip', this.props.theme, this.props.className
    )
    return (
      <div className={ttClasses}>
        {
          React.Children.map(this.props.children, (child) => {
            if(child.props.className === 'tooltip-target')
              return child
          })
        }
        <div className="tooltip-container tooltip-hide">
          <div className="tooltip-content-container">
            <div className="tooltip-pointer">
            </div>
            {body}
          </div>
        </div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  children       : PropTypes.array.isRequired,
  pointerWidth   : PropTypes.number,
  tooltipMargin  : PropTypes.number,
  pointerGap     : PropTypes.number,
  tooltipPadding : PropTypes.number,
  tooltipDelay   : PropTypes.number,
  theme          : PropTypes.string,
  popMethod      : PropTypes.string
}

Tooltip.defaultProps = {
  pointerWidth   : 10,
  tooltipMargin  : 10,
  pointerGap     : 5,
  tooltipPadding : 15,
  tooltipDelay   : 0,
  theme          : 'default',
  popMethod      : 'hover'
}

export default Tooltip
