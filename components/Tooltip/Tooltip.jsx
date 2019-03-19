/**
 * Tooltip
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Manager, Target, Popper, Arrow } from 'react-popper'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import cn from 'classnames'
import _ from 'lodash'
import './Tooltip.scss'

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPopoverOpen: false
    }

    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnClickOutside = this.handleOnClickOutside.bind(this)
    this.popperMounted = this.popperMounted.bind(this)

    this.tooltipShowTimeout = null
    this.tooltipHideTimeout = null
    this.elementRefs = {}
  }

  popperMounted(ref) {
    this.elementRefs.popper = ref
  }

  handleOnMouseEnter() {
    const { tooltipDelay } = this.props

    if (this.tooltipShowTimeout) {
      clearTimeout(this.tooltipShowTimeout)
    }

    if (this.tooltipHideTimeout) {
      clearTimeout(this.tooltipHideTimeout)
    }

    if (!tooltipDelay) {
      this.setState({ isPopoverOpen: true })
      document.addEventListener('touchstart', this.handleOnClickOutside)
    } else {
      this.tooltipShowTimeout = setTimeout(() => {
        this.setState({ isPopoverOpen: true })
        document.addEventListener('touchstart', this.handleOnClickOutside)
      }, tooltipDelay)
    }
  }

  handleOnMouseLeave() {
    const { tooltipHideDelay } = this.props

    if (this.tooltipShowTimeout) {
      clearTimeout(this.tooltipShowTimeout)
    }

    if (this.tooltipHideTimeout) {
      clearTimeout(this.tooltipHideTimeout)
    }

    if (!tooltipHideDelay) {
      this.setState({ isPopoverOpen: false })
      document.removeEventListener('touchstart', this.handleOnClickOutside)
    } else {
      this.tooltipHideTimeout = setTimeout(() => {
        this.setState({ isPopoverOpen: false })
        document.removeEventListener('touchstart', this.handleOnClickOutside)
      }, tooltipHideDelay)
    }
  }

  handleOnClickOutside(evt) {
    const targetElement = evt.target
    const popperElement = ReactDOM.findDOMNode(this.elementRefs.popper)

    if (!popperElement || !popperElement.contains(targetElement)) {
      document.removeEventListener('click', this.handleOnClickOutside)
      document.removeEventListener('touchstart', this.handleOnClickOutside)
      this.setState({ isPopoverOpen: false })
    }
  }

  handleOnClick() {
    if (this.state.isPopoverOpen) {
      document.removeEventListener('click', this.handleOnClickOutside)
      document.removeEventListener('touchstart', this.handleOnClickOutside)
    } else {
      document.addEventListener('click', this.handleOnClickOutside)
      document.addEventListener('touchstart', this.handleOnClickOutside)
    }

    this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
  }

  render() {
    const { isPopoverOpen } = this.state
    const { popMethod, pointerWidth, tooltipShowDuration, tooltipHideDuration } = this.props

    // pointer height is adjacent of the triangle with angle 45 degrees
    // cosinus(45)=sqrt(2)/2
    const pointerHeight = Math.ceil(pointerWidth * Math.sqrt(2) / 2)

    const ttClassName = cn('Tooltip', this.props.theme, this.props.className)

    // handlers to handle pop method 'hover' | 'click'
    const popMethodHandler = (
      popMethod === 'hover' ?
      {
        onMouseEnter: this.handleOnMouseEnter,
        onMouseLeave: this.handleOnMouseLeave,
        // add on click handle to show tooltip on mobile devices on tap
        onClick: this.handleOnMouseEnter
      } : {
        onClick: this.handleOnClick
      }
    )

    // tooltip body
    const body = (
      <div className="tooltip-container">
        <div className="tooltip-content-container">
          <Arrow
            className="tooltip-pointer"
            style={{
              height: pointerWidth,
              width: pointerWidth
            }}
          />
          <div className="tooltip-body">
            {React.Children.map(this.props.children, (child) => {
              if (child.props.className === 'tooltip-body')
                return child.props.children
            })}
          </div>
        </div>
      </div>
    )

    // tooltip target
    const target = (
      React.Children.map(this.props.children, (child) => {
        if (child.props.className === 'tooltip-target')
          return (
            <Target
              {...child.props}
              {...popMethodHandler}
              className={cn(child.props.className, { active: isPopoverOpen })}
            >
              {child.props.children}
            </Target>
          )
      })
    )

    return (
      <Manager className={ttClassName}>
        {target}
        <TransitionGroup>
          {isPopoverOpen && (
            <CSSTransition
              timeout={{
                enter: tooltipShowDuration,
                exit: tooltipHideDuration
              }}
              classNames="fade"
            >
              <Popper
                key="popper"
                placement="top"
                ref={this.popperMounted}
                className="tooltip-popper"
                modifiers={{
                  offset: {
                    offset: `0, ${pointerHeight}`
                  }
                }}
                {..._.pick(popMethodHandler, [
                  'onMouseEnter',
                  'onMouseLeave']
                )}
              >
                {body}
              </Popper>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Manager>
    )
  }
}

Tooltip.propTypes = {
  children: PropTypes.array.isRequired,
  pointerWidth: PropTypes.number,
  // TODO rename to tooltipShowDelay
  tooltipDelay: PropTypes.number,
  tooltipHideDelay: PropTypes.number,
  tooltipShowDuration: PropTypes.number,
  tooltipHideDuration: PropTypes.number,
  theme: PropTypes.string,
  popMethod: PropTypes.oneOf(['hover', 'click'])
}

Tooltip.defaultProps = {
  pointerWidth: 10,
  tooltipDelay: 150,
  tooltipHideDelay: 250,
  tooltipShowDuration: 200,
  tooltipHideDuration: 0,
  theme: 'default',
  popMethod: 'hover'
}

export default Tooltip
