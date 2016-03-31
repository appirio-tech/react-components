require('./PrizeItem.scss')

import React from 'react'
import PrizeItem from './PrizeItem'

const PrizeItems = ({type,title,items}) => {
  return (
    <div className="PrizeSection">
        <div className="title">{title}</div>
        <div className={type === 'bonus' ? 'items Bonus' : 'items Prize'}>
          {items.map((item,index) => {
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