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

const progressBarData2 = {
  completionPercentage : '56',
  checkPoints : [
    {
      name : 'Checkpoint1',
      timeline : 'Mar 23, 12:45',
      completionPercentage : '0',
      hideCircle: true
    },
    {
      name : 'Review',
      timeline : '',
      completionPercentage : '100',
      hideCircle: true
    }
  ]
}

const ProgressBarExample = () => (
  <div>
    <div className="divStyle">
      <ProgressBar completionPercentage={progressBarData.completionPercentage} checkPoints={progressBarData.checkPoints}/>
    </div>
    <br/>
    <div className="divStyle">
      <ProgressBar completionPercentage={progressBarData2.completionPercentage} checkPoints={progressBarData2.checkPoints}/>
    </div>
  </div>
)

module.exports = ProgressBarExample
