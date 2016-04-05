import React from 'react'
import ProgressBar from './ProgressBar'

require('./ProgressBarExample.scss')

const progressBarData = {
  completionPercentage : '56',
  checkPoints : [
    {
      name : 'Checkpoint1',
      timeline : 'Mar 23, 12:45',
      completionPercentage : '0'
    },
    {
      name : 'Review',
      timeline : 'Apr 2, 16:30',
      completionPercentage : '35'
    },
    {
      name : 'Winners',
      timeline : 'Apr 12, 18:00',
      completionPercentage : '75'
    },
    {
      name : 'End',
      timeline : 'Apr 13, 18:00',
      completionPercentage : '100'
    }
  ]
}

const ProgressBarExample = () => (
  <div>
    <div className="divStyle">
      <ProgressBar completionPercentage={progressBarData.completionPercentage} checkPoints={progressBarData.checkPoints}/>
    </div>
  </div>
)

module.exports = ProgressBarExample
