require('./ProgressBar.scss')

import React from 'react'
import classNames from 'classnames'

const ProgressBar = ({completionPercentage,checkPoints}) => {
  function getCheckPointPositionStyle(percentage){
    const style = {
      left:percentage + '%'
    }
    return style
  }
  
  function getCheckPointPositionScaledStyle(percentage){
    percentage = Number.parseInt(percentage)*0.8
    const style = {
      left:percentage + '%'
    }
    return style
  }
  
  function getLengthScaledStyle(percentage){
    const style = {
      width:percentage + '%'
    }
    return style
  }
  
  function checkPointStyle(checkPointPercentage){
    checkPointPercentage = Number.parseInt(checkPointPercentage)
    completionPercentage = Number.parseInt(completionPercentage)
    const checkPointClass = classNames(
      'circle',{ completed : ( checkPointPercentage <= completionPercentage)}
    )
    return checkPointClass
  }
  
  return (
    <div className="ProgressBar">
      <div className="progress-box">
        <div className="checkpoint-line">
          {checkPoints.map((checkPoint,index) => {
            return <div className="checkpoint-text" style={getCheckPointPositionScaledStyle(checkPoint.completionPercentage)} key={index}>{checkPoint.name}</div>
          })}
        </div>
        <div className="progress-ui">
          <div className="progress-line">
          </div>
          <div className="completion-line" style={getLengthScaledStyle(completionPercentage)}>
          </div>
          <div className="progress-circles">
            <div className="circle"/>
            {checkPoints.map((checkPoint,index) => {    
              return <div className={checkPointStyle(checkPoint.completionPercentage)} style={getCheckPointPositionStyle(checkPoint.completionPercentage)} key={index}/>
            })}
          </div>
        </div>
        <div className="time-line">
          {checkPoints.map((checkPoint,index) => {
            return  <div className="time-line-text" style={getCheckPointPositionScaledStyle(checkPoint.completionPercentage)} key={index}>{checkPoint.timeline}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar