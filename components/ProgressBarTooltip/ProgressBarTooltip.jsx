import React from 'react'
import TcTooltip from '../TcTooltip'
import moment from 'moment'

require('./ProgressBarTooltip.scss')

const STALLED_MSG = 'Stalled'

const getTimeToGo = (start, end) => {
  const percentageComplete = (moment() - moment(start)) / (moment(end) - moment(start)) * 100
  return (Math.round(percentageComplete * 100) / 100)
}
const getTime = (date) => {
  const duration = moment(date)
  const res = `${duration.hours()}:${duration.minutes()}`
  return res[1] === '-' ? 'Late' : `${res}`
}
const getDate = (date) => {
  return moment(date).format('MMM DD')
}

// Convert a number to string with thousands separated by comma
const numberWithCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const ProgressBarTooltip = ({challenge}) => {

  const timeToGo = getTimeToGo(challenge.registrationStartDate, challenge.currentPhaseEndDate)
  const timeLeft = getTime(challenge.currentPhaseEndDate)
  const startDate = getDate(challenge.currentPhaseEndDate)

  const tooltipProgressHtml = `
    <div class="tooltip-content progress-content">
      <div class="progress-steps">
        <div class="phase">
          <div class="phase-name">${challenge.currentPhaseName}</div>
          <div class="progress-bar"><div class="current-progress active"></div></div>
          <div class="date"><span class="month">${startDate}</span>, <span class="time">${timeLeft}</span></div>
        </div>
        <div class="phase">
          <div class="phase-name">Review</div>
          <div class="progress-bar"><div class="current-progress"></div></div>
          <div class="date"><span class="month">Mar 23</span>, <span class="time">12:45</span></div>
        </div>
        <div class="phase">
          <div class="phase-name">Winners</div>
          <div class="progress-bar"><div class="current-progress"></div></div>
          <div class="date"><span class="month">Mar 23</span>, <span class="time">12:45</span></div>
        </div>
        <div class="phase">
          <div class="phase-name">End</div>
          <div class="progress-bar"></div>
          <div class="date"><span class="month">Mar 23</span>, <span class="time">12:45</span></div>
        </div>
      </div>
    </div>
  `;

  return (
    <TcTooltip tooltipContent={tooltipProgressHtml} cName="progress-tooltip">
      {challenge.currentPhaseName ? challenge.currentPhaseName : STALLED_MSG}
    </TcTooltip>
  )
}

export default ProgressBarTooltip
