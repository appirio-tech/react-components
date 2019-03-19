require('./Dropdown.scss')

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import enhanceDropdown from './enhanceDropdown'

class Dropdown  extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    const { children, className, pointerShadow, noPointer, pointerLeft, isOpen, handleClick, theme, noAutoclose, handleKeyboardNavigation } = props
    const ddClasses = classNames('dropdown-wrap', {
      [`${className}`] : true,
      [`${ theme }`] : true
    })
    const ndClasses = classNames('Dropdown', {
      'pointer-shadow' : pointerShadow,
      'pointer-hide'   : noPointer,
      'pointer-left'   : pointerLeft,
      'no-autoclose'   : noAutoclose,
      hide             : !isOpen
    })
  
    let childSelectionIndex = -1
    const focusOnNextChild = () => {
      const listChild = this.listRef.getElementsByTagName('li')
      if (listChild.length === 0) {
        return
      }
      childSelectionIndex += 1
      if (childSelectionIndex >= listChild.length) {
        childSelectionIndex -= 1
      } else {
        listChild[childSelectionIndex].focus()
      }
    }
    const focusOnPreviousChild = () => {
      const listChild = this.listRef.getElementsByTagName('li')
      if (listChild.length === 0) {
        return
      }
      childSelectionIndex -= 1
      if (childSelectionIndex < 0) {
        childSelectionIndex = 0
      } else {
        listChild[childSelectionIndex].focus()
      }
    }
    let searchKey = ''
    let timer
    const focusOnCharacter = (value) => {
      searchKey += value
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => { searchKey = '' }, 500)
      const listChild = this.listRef.getElementsByTagName('li')
      if (listChild.length === 0) {
        return
      }
      const length = listChild.length
      for (let i = 0; i < length; i++) {
        let textContent = listChild[i].textContent
        if (textContent && textContent.length > 0) {
          textContent = textContent.toLowerCase()
          const search = searchKey.toLowerCase()
          if (textContent.startsWith(search)) {
            childSelectionIndex = i
            listChild[i].focus()
            return true
          }
        }
      }
      return false
    }
    const onFocus = () => {
      this.containerRef.classList.add('focused')
    }
    const onBlur = () => {
      this.containerRef.classList.remove('focused')
    }
    const onKeydown = (e) => {
      if (!handleKeyboardNavigation) {
        return
      }
      const keyCode = e.keyCode
      if (keyCode === 32 || keyCode === 38 || keyCode === 40) { // space or Up/Down
        // open dropdown menu
        if (!noAutoclose && !isOpen) {
          e.preventDefault()
          handleClick(event)
        } else {
          if (keyCode === 40) {
            focusOnNextChild()
          } else if (keyCode === 38) {
            focusOnPreviousChild()
          }
          e.preventDefault()
        }
      } else if (isOpen) {
        const value = String.fromCharCode(e.keyCode)
        if (focusOnCharacter(value)) {
          e.preventDefault()
        }
      }
    }
    const onChildKeydown = (e) => {
      if (!handleKeyboardNavigation) {
        return
      }
      const keyCode = e.keyCode
      if (keyCode === 38 || keyCode === 40 || keyCode === 13) { // Up/Down or enter
        if (keyCode === 40) {
          focusOnNextChild()
        } else if (keyCode === 38) {
          focusOnPreviousChild()
        } else if (keyCode === 13) { // enter
          const listChild = this.listRef.getElementsByTagName('li')
          if (listChild.length === 0) {
            return
          }
          listChild[childSelectionIndex].click()
          this.handleKeyboardRef.focus()
        }
        e.preventDefault()
      } else {
        const value = String.fromCharCode(e.keyCode)
        if (focusOnCharacter(value)) {
          e.preventDefault()
        }
      }
    }
  
    const setListRef = (c) => this.listRef = c
    const setContainerRef = (c) => this.containerRef = c
    const setHandleKeyboardRef = (c) => this.handleKeyboardRef = c

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {onKeyDown: onChildKeydown})
    )
    return (
      <div ref={setContainerRef} className={ddClasses} onClick={noAutoclose ? () => { } : handleClick}>
        {handleKeyboardNavigation && (<a ref={setHandleKeyboardRef} tabIndex="0" onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeydown} className="handle-keyboard" href="javascript:;"></a>)}
        {
          childrenWithProps.map((child, index) => {
            if (child.props.className.indexOf('dropdown-menu-header') > -1)
              return noAutoclose ? React.cloneElement(child, {
                onClick: handleClick,
                key: child.props.key || index
              }) : child
          })
        }
        <div ref={setListRef} className = {ndClasses}>
          {
            childrenWithProps.map((child) => {
              if (child.props.className.indexOf('dropdown-menu-list') > -1)
                return child
            })
          }
        </div>
      </div>
    )

  }
}

Dropdown.propTypes = {
  children: PropTypes.array.isRequired,
  /*
    If true, prevents dropdown closing when clicked inside dropdown
  */
  noAutoclose: PropTypes.bool,
  /*
    If true, prevents handle keyboard event
  */
  handleKeyboardNavigation: PropTypes.bool
}

Dropdown.defaultProps = {
  handleKeyboardNavigation: false
}

export default enhanceDropdown(Dropdown)
