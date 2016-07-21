require('./Dropdown.scss')

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = { isHidden: true }

    this.onClickOutside = this.onClickOutside.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickOtherDropdown = this.onClickOtherDropdown.bind(this)
  }

  onClickOutside(evt) {
    let currNode = evt.target
    let isDropdown = false

    do {
      if(currNode.className.indexOf('dropdown-wrap') > -1) {
        isDropdown = true
        break
      }

      currNode = currNode.parentNode

      if(!currNode)
        break
    } while(currNode.tagName)

    if(!isDropdown) {
      this.setState({ isHidden: true })
    }
  }

  onClick(evt) {
    const dropdownClicked = new Event('dropdownClicked')

    document.dispatchEvent(dropdownClicked)

    this.setState({ isHidden: !this.state.isHidden })
    evt.stopPropagation()
  }

  onClickOtherDropdown() {
    this.setState({ isHidden: true })
  }

  componentDidMount() {
    document.removeEventListener('click', this.onClickOutside)
    document.removeEventListener('dropdownClicked', this.onClickOtherDropdown)

    document.addEventListener('click', this.onClickOutside)
    document.addEventListener('dropdownClicked', this.onClickOtherDropdown)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside)
    document.removeEventListener('dropdownClicked', this.onClickOtherDropdown)
  }

  render() {
    const pointerShadow = this.props.pointerShadow
    const noPointer = this.props.noPointer
    const pointerLeft = this.props.pointerLeft
    const ddClasses = classNames('dropdown-wrap', {
      [`${ this.props.theme }`] : true
    })
    const ndClasses = classNames('Dropdown', {
      'pointer-shadow' : pointerShadow,
      'pointer-hide'   : noPointer,
      'pointer-left'   : pointerLeft,
      hide           : this.state.isHidden
    })

    return (
      <div className={ ddClasses } onClick={ this.onClick } ref="Dropdown">
        {
          this.props.children.map((child) => {
            if(child.props.className === 'dropdown-menu-header')
              return child
          })
        }

        <div className = {ndClasses}>
          {
            this.props.children.map((child) => {
              if(child.props.className === 'dropdown-menu-list')
                return child
            })
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  children: PropTypes.array.isRequired
}

export default Dropdown
