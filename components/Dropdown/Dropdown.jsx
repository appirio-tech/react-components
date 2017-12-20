require('./Dropdown.scss')

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import enhanceDropdown from './enhanceDropdown'

function Dropdown(props) {
  const { className, pointerShadow, noPointer, pointerLeft, isOpen, handleClick, theme } = props
  const ddClasses = classNames('dropdown-wrap', {
    [`${className}`] : true,
    [`${ theme }`] : true
  })
  const ndClasses = classNames('Dropdown', {
    'pointer-shadow' : pointerShadow,
    'pointer-hide'   : noPointer,
    'pointer-left'   : pointerLeft,
    hide             : !isOpen
  })

  return (
    <div className={ ddClasses } onClick={ handleClick }>
      {
        props.children.map((child) => {
          if (child.props.className.indexOf('dropdown-menu-header') > -1)
            return child
        })
      }

      <div className = {ndClasses}>
        {
          props.children.map((child) => {
            if (child.props.className.indexOf('dropdown-menu-list') > -1)
              return child
          })
        }
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  children: PropTypes.array.isRequired
}

export default enhanceDropdown(Dropdown)
