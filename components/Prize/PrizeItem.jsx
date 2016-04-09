import React from 'react'

require('./PrizeItem.scss')

const PrizeItem = ({title, subText}) => {
  return (
    <div className="PrizeItem">
        <div className="prize-circle">{title}</div> <span>{subText}</span>
    </div>
  )
}

PrizeItem.propTypes = {
  title :  React.PropTypes.string,
  subText :  React.PropTypes.string
}

export default PrizeItem
