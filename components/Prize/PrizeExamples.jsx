import React from 'react'
import PrizeItems from './PrizeItems'

require('./PrizeExamples.scss')



const prizeItems = {
  type : 'prize',
  title : 'Prizes',
  items : [
    {
      title : '1',
      subText : '$10,000'
    },
    {
      title : '2',
      subText : '$8,000'
    },
    {
      title : '3',
      subText : '$7,000'
    },
    {
      title : '4',
      subText : '$6,500'
    },
    {
      title : '5',
      subText : '$5,500'
    },
    {
      title : '6',
      subText : '$4,500'
    }
  ]
}

const bonusItems = {
  type : 'bonus',
  title : 'Bonuses',
  items : [
    {
      title : 'Blitz',
      subText : '10% of prize'
    },
    {
      title : 'TCO points',
      subText : '18,000'
    },
    {
      title : 'Checkin',
      subText : '$50',
      count: '6'
    }
  ]
}

const PrizeExamples = () => (
    <div className="divStyle">
        <PrizeItems type={prizeItems.type} title={prizeItems.title} items={prizeItems.items}/>
        <PrizeItems type={bonusItems.type} title={bonusItems.title} items={bonusItems.items}/>
    </div>
)

module.exports = PrizeExamples
