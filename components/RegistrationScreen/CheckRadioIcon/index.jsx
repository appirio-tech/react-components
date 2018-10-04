import React from 'react'
import classNames from 'classnames'

require('./style.scss')

const CheckRadioIcon = ({ active }) => {

  const checkRadioIconStyleClass = classNames(
    'CheckRadioIcon',
    { active }
  )

  return (
    <div className={checkRadioIconStyleClass}>
    </div>
  )
}

export default CheckRadioIcon
