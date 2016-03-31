require('./PrizeItem.scss')

import React from 'react'
import PrizeItem from './PrizeItem'

const PrizeItems = (props) => {
  return (
    <div className="PrizeSection">
        <div className="title">{props.title}</div>
        <div className={props.type === 'bonus' ? 'items Bonus' : 'items Prize'}>
          {props.items.map((item,index) => {
            return <PrizeItem title={item.title} subText={item.subText} key={index}/>
          })}
        </div>
    </div>
  )
}

PrizeItem.propTypes = {
  type :  React.PropTypes.string,
  items :  React.PropTypes.array
}

export default PrizeItems