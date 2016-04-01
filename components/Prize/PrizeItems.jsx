require('./PrizeItem.scss')

import React from 'react'
import classNames from 'classnames'
import PrizeItem from './PrizeItem'

const PrizeItems = ({type,title,items}) => {
  const itemsClass = classNames({
    items : true,
    bonus : type === 'bonus',
    prize : type === 'prize'
  })
  return (
    <div className="PrizeItems">
        <div className="title">{title}</div>
        <div className={itemsClass}>
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