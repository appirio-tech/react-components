import React from 'react'
import classNames from 'classnames'

require('./ProgressBar.scss')

const ProgressBar = ({completionPercentage, checkPoints}) => {
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
      'circle',
      { completed : ( checkPointPercentage <= completionPercentage)}
    )
    return checkPointClass
  }

  return (
    <div className="ProgressBar">
      <div className="progress-box">
        <div className="checkpoint-line">
          {checkPoints.map((checkPoint, index) => {
            return <div className="checkpoint-text" style={getCheckPointPositionScaledStyle(checkPoint.completionPercentage)} key={index}>{checkPoint.name}</div>
          })}
        </div>
        <div className="progress-ui">
          <div className="progress-line" />
          <div className="completion-line" style={getLengthScaledStyle(completionPercentage)} />
          <div className="progress-circles">
            {checkPoints.map((checkPoint, index) => {
              if(!checkPoint.hideCircle) {
                return <div className={checkPointStyle(checkPoint.completionPercentage)} style={getCheckPointPositionStyle(checkPoint.completionPercentage)} key={index}/>
              }
            })}
          </div>
        </div>
        <div className="time-line">
          {checkPoints.map((checkPoint, index) => {
            return  <div className="time-line-text" style={getCheckPointPositionScaledStyle(checkPoint.completionPercentage)} key={index}>{checkPoint.timeline}</div>
          })}
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  completionPercentage :  React.PropTypes.string,
  checkPoints :  React.PropTypes.array
}

export default ProgressBar
