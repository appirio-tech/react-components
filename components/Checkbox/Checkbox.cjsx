'use strict'

require './Checkbox.scss'

React    = require 'react'

Checkbox = ({onChange, checked, label}) ->
  if checked
    iconClassName = 'icon checkmark active'
  else
    iconClassName = 'icon plus hollow'

  <div className="Checkbox flex middle">
    <button className="clean" type="button" onClick={onChange}>
      <div className={iconClassName} />
    </button>

    {
      if label
        <label onClick={onChange}>{label}</label>
    }
  </div>

module.exports = Checkbox
