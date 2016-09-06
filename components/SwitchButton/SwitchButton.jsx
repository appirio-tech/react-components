import React from 'react'
require('./SwitchButton.scss')
const SwitchButton = ({label, ...props}) => {
  return (
    <div className="SwitchButton clearfix">
      <span className="label">{label}</span>
      <label>
        <input type="checkbox" {...props} />
        <i/>
      </label>
    </div>
  )
}

export default SwitchButton
