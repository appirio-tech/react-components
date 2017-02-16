import moment from 'moment';
import _ from 'lodash';
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
import LoaderIcon from '../../../Loader/Loader';
import './ProgressBarTooltip.scss';

const ID_LENGTH = 6
const BASE_URL = 'https://api.topcoder.com/v2';
const CHALLENGES_API = `${BASE_URL}/challenges/`;
const MM_API = `${BASE_URL}/data/marathon/challenges/`; // MM - marathon match


const getDate = (date) => {
  return moment(date).format('MMM DD')
}
const getTime = (date) => {
  const duration = moment(date)
  const hour = duration.hours()
  let hString = hour < 10 ? '0'+hour : hour;
  const min = duration.minutes()
  let mString = min < 10 ? '0'+min : min;
  const res = `${hString}:${mString}`
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
  var progress = props.progress
  var limitProgress = parseFloat(_.replace(progress, '%', ''))
  var limitWidth = limitProgress <= 100 ? limitProgress : 100;
  return (
    <div className="phase">
      <div>{props.phase}</div>
      <div className={`bar ${props.last ? 'last' : ''} ${props.started ? 'started' : ''}`}>
        <div className="point" />
        <div className="inner-bar" style={{ width: limitWidth+'%'}} />
      </div>
      <div className="date">
        {props.isLoaded ? getDate(props.date)+', '+getTime(props.date) : <span className="loading"><LoaderIcon/></span>}
      </div>
    </div>
  );
}

Phase.propTypes = {
  date: PT.shape({}).isRequired,
  last: PT.bool.isRequired,
  phase: PT.string.isRequired,
  progress: PT.string.isRequired,
  started: PT.bool.isRequired,
};

/**
 * Renders the tooltip's content.
 */
function Tip(props) {
  let steps = [];
  const c = props.challenge;
  const isLoaded = props.isLoaded;
  if (!c) return <div />;
  // TC API v2 does not provide detailed information on challenge phases,
  // it just includes some deadlines into the challenge details. The code below,
  // sorts these deadlines by their dates, and then generates the challenge timeline.
  // The result should be fine for simple dev challenges, but will be strange for
  // such as Assembly, etc.
  steps.push({
    date: c.postingDate ? new Date(c.postingDate) : new Date(0),
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
        isLoaded={isLoaded}
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
class ProgressBarTooltip extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    this.state = {
      chDetails: {},
      isLoaded: false
    }
    this.onTooltipHover = this.onTooltipHover.bind(this)
  }
  onTooltipHover() {
    const that = this;
    let chClone = _.clone(this.props.challenge);
    this.fetchChallengeDetails(chClone.challengeId).then(details => {
      let chId = chClone.challengeId + ''
      if(chId.length < ID_LENGTH) {
          details.postingDate = chClone.startDate
          details.registrationEndDate = chClone.endDate
          details.submissionEndDate = chClone.endDate
          details.appealsEndDate = chClone.endDate
        }
      that.setState({
        chDetails: details,
        isLoaded: true
      })
    });
  }
  // It fetches detailed challenge data and attaches them to the 'details'
  // field of each challenge object.
  fetchChallengeDetails = (id) => {
    const challengeId = '' + id // change to string
    if(challengeId.length < ID_LENGTH) {
      return fetch(`${MM_API}${id}`).then(res => res.json());
    } else {
      return fetch(`${CHALLENGES_API}${id}`).then(res => res.json());
    }
  }
  render() {

    const tip = <Tip challenge={this.state.chDetails} isLoaded={this.state.isLoaded}/>;
    return (
      <Tooltip className="progress-bar-tooltip" content={tip} onTooltipHover={this.onTooltipHover}>
        {this.props.children}
      </Tooltip>
    );
  }
}
ProgressBarTooltip.defaultProps = {
  challenge: {},
};

ProgressBarTooltip.propTypes = {
  challenge: PT.shape({}),
  children: PT.node.isRequired,
};

export default ProgressBarTooltip;
