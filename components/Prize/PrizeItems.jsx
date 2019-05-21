import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TaggedValueList from '../TaggedValue/TaggedValueList'

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
          <TaggedValueList items={items} layout="wrap"/>   
        </div>
    </div>
  )
}

PrizeItems.propTypes = {
  type :  PropTypes.string,
  items :  PropTypes.array
}

export default PrizeItems
