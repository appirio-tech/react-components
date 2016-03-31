require('./PrizeItem.scss')

import React from 'react'

const PrizeItem = (props) => {
  return (
    <div className="PrizeItem">
        <div className="PrizeCircle">{props.title}</div> <span>{props.subText}</span>
    </div>
  )
}

PrizeItem.propTypes = {
  title :  React.PropTypes.string,
  subText :  React.PropTypes.string
}

export default PrizeItem
