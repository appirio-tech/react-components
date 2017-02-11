import moment from 'moment';
/**
 * Progress Bar Tooltip.
 *
 * It renders the tooltip with detailed timeline of a specified challenge.
 * As TC API v2 does not provide all necessary information for some types of
 * challenges, this component does not work perfect yet.
 *
 * USAGE:
 * Wrap with <ProgressBarTooltip></ProgressBarTooltip> the element(s) which should
 * show the tooltip when hovered. Pass in the challenge details object via the
 * 'challenge' prop.
 */

import React, { PropTypes as PT } from 'react';
import Tooltip from '../Tooltip';
import './ProgressBarTooltip.scss';

const getDate = (date) => {
  return moment(date).format('MMM DD')
}
const getTime = (date) => {
  const duration = moment(date)
  const res = `${duration.hours()}:${duration.minutes()}`
  return res[1] === '-' ? 'Late' : `${res}`
}
/**
 * Renders a separate challenge phase element.
 * It includes: phase name, starting date, the point, representing the starting
 * date, the bar with inner-bar, representing the progress.
 * @param {Date} props.date Starting date of the phase.
 * @param {Boolean} props.last If true, the 'last' class will be added to the progress
 *  bar, allowing to hide it for the last phase element, which represent the end point
 *  of the challenge.
 * @param {String} props.phase Name of the phase.
 * @param {String} props.progress The progress of the phase. It will set the width
 *  of the colored part of the progress bar.
 * @param {Boolean} props.started When true, the 'started' class is added to the
 *  progress bar, allowing to color the point at its start.
 * @param {String} props.width The width of the phase element in the UI.
 */
function Phase(props) {
  return (
    <div className="phase" style={{ width: props.width }}>
      <div>{props.phase}</div>
      <div className={`bar ${props.last ? 'last' : ''} ${props.started ? 'started' : ''}`}>
        <div className="point" />
        <div className="inner-bar" style={{ width: props.progress }} />
      </div>
      <div className="date">{getDate(props.date)}, {getTime(props.date)}</div>
    </div>
  );
}

Phase.propTypes = {
  date: PT.shape({}).isRequired,
  last: PT.bool.isRequired,
  phase: PT.string.isRequired,
  progress: PT.string.isRequired,
  started: PT.bool.isRequired,
  width: PT.string.isRequired,
};

/**
 * Renders the tooltip's content.
 */
function Tip(props) {
  let steps = [];
  const c = props.challenge;
  if (!c) return <div />;
  // TC API v2 does not provide detailed information on challenge phases,
  // it just includes some deadlines into the challenge details. The code below,
  // sorts these deadlines by their dates, and then generates the challenge timeline.
  // The result should be fine for simple dev challenges, but will be strange for
  // such as Assembly, etc.
  steps.push({
    date: new Date(c.postingDate),
    name: 'Posting',
  });
  steps.push({
    date: new Date(c.registrationEndDate),
    name: 'Registration',
  });
  steps.push({
    date: new Date(c.submissionEndDate),
    name: 'Submission',
  });
  if (c.checkpointSubmissionEndDate) {
    steps.push({
      date: new Date(c.checkpointSubmissionEndDate),
      name: 'Checkpoint',
    });
  }
  steps.push({
    date: new Date(c.appealsEndDate),
    name: 'End',
  });
  steps = steps.sort((a, b) => a.date.getTime() - b.date.getTime());
  const duration = steps[steps.length - 1].date.getTime() - steps[0].date.getTime();
  const currentPhaseEnd = new Date(c.currentPhaseEndDate);
  steps = steps.map((step, index) => {
    let d;
    if (index === steps.length - 1) d = 10;
    else d = 90 * ((steps[1 + index].date.getTime() - step.date.getTime()) / duration);
    let progress = 0;
    if (index < steps.length - 1) {
      if (steps[1 + index].date.getTime() < currentPhaseEnd.getTime()) progress = 100;
      else if (step.date.getTime() > currentPhaseEnd.getTime()) progress = 0;
      else {
        const left = 1000 * c.currentPhaseRemainingTime;
        if (left < 0) progress = -1;
        else {
          progress = 100 * (left / (steps[1 + index].date.getTime() - steps[index].date.getTime()));
        }
      }
    }
    const phaseId = index;
    return (
      <Phase
        date={step.date}
        key={phaseId}
        last={index === steps.length - 1}
        phase={step.name}
        progress={`${progress}%`}
        started={step.date.getTime() < currentPhaseEnd.getTime()}
        width={`${d}%`}
      />
    );
  });

  return (
    <div className="tip">

      {steps}
    </div>
  );
}

Tip.propTypes = {
  challenge: PT.shape({}).isRequired,
};

/**
 * Renders the tooltip.
 */
function ProgressBarTooltip(props) {
  const tip = <Tip challenge={props.challenge} />;
  return (
    <Tooltip className="progress-bar-tooltip" content={tip}>
      {props.children}
    </Tooltip>
  );
}

ProgressBarTooltip.defaultProps = {
  challenge: {},
};

ProgressBarTooltip.propTypes = {
  challenge: PT.shape({}),
  children: PT.node.isRequired,
};

export default ProgressBarTooltip;
