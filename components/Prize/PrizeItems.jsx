import React from 'react'
import classNames from 'classnames'
import TaggedValue from '../TaggedValue/TaggedValue'

require('./PrizeItem.scss')

const PrizeItems = ({type, title, items}) => {
  const itemsClass = classNames({
    items : true,
    bonus : type === 'bonus',
    prize : type === 'prize'
  })
  return (
    <div className="PrizeItems">
        <div className="title">{title}</div>
        <div className={itemsClass}>
          {items.map((item, index) => {
            return <TaggedValue title={item.title} subText={item.subText} count={item.count} style="PrizeItem" key={index}/>
          })}
        </div>
    </div>
  )
}

PrizeItems.propTypes = {
  type :  React.PropTypes.string,
  items :  React.PropTypes.array
}

export default PrizeItems
