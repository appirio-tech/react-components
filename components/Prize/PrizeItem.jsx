require('./PrizeItem.scss')

import React from 'react'

const PrizeItem = ({title,subText}) => {
  return (
    <div className="PrizeItem">
        <div className="PrizeCircle">{title}</div> <span>{subText}</span>
    </div>
  )
}

PrizeItem.propTypes = {
  title :  React.PropTypes.string,
  subText :  React.PropTypes.string
}

export default PrizeItem
