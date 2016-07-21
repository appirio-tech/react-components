import React from 'react'
import classNames from 'classnames'
import ReactSwitchButton from 'react-switch-button'

require('./SwitchButton.scss')
require('react-switch-button/dist/react-switch-button.min.css')
  
const SwitchButton = (props) => {
  const switchButtonClass = classNames(
    'SwitchButton'
  )
  return (
    <div className={switchButtonClass}>
      <ReactSwitchButton {...props} />
    </div>
  )
} 
export default SwitchButton
