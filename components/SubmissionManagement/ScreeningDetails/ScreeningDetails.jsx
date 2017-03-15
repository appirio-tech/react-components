/**
 * This compnent receives via props the screening object and nicely renders them.
 * Note that this component both has the text coming directly from the screening object,
 * and the text generated based on the screening status
 *
 */
import React, { PropTypes as PT } from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import Button from '../../Button/Button';

import './ScreeningDetails.scss';


export default function ScreeningDetails(props) {
  const {
    screeningObject,
    onHelp,
    onOpenOnlineReview,
    submissionId,
  } = props;

  const checkScreeningObject = () => {
    if (screeningObject) {
      return screeningObject;
    }
    return {};
  };
  const hasWarnings = checkScreeningObject(screeningObject).warnings;
  const hasStatus = checkScreeningObject(screeningObject).status;
  const hasStatusPassed = hasStatus === 'passed';
  const hasStatusFailed = hasStatus === 'failed';
  const hasPending = checkScreeningObject(screeningObject).status === 'pending';
  const warnLength = checkScreeningObject(screeningObject).warnings && hasWarnings.length;

  const setStatusInfo = () => {
    if (hasPending) {
      return {
        title: 'Pending',
        classname: 'pending',
        message: 'Your submission has been received, and will be screened after the end of the phase',
      };
    } else if (hasStatusPassed && !hasWarnings) {
      return {
        title: 'Passed Screening',
        classname: 'passed',
        message: 'You have passed screening.',
      };
    } else if (hasStatusFailed && !hasWarnings) {
      return {
        title: 'Failed Screening',
        classname: 'failed',
        message: 'You have failed screening',
      };
    } else if (hasStatusPassed && hasWarnings) {
      return {
        title: 'Passed Screening with Warnings',
        classname: 'passed',
        message: `You have passed screening, but the screener has given you ${warnLength} warnings that you must fix in round 2.`,
      };
    } else if (hasStatusFailed && hasWarnings) {
      return {
        title: 'Failed Screening with Warnings',
        classname: 'failed',
        message: 'You have failed screening and the screener has given you the following warning.',
      };
    }
    return {
      title: '',
      classname: '',
      message: 'Your submission has been received, and will be evaluated during Review phase.',
    };
  };

  let warnings = [];
  if (checkScreeningObject(screeningObject).warnings) {
    warnings = screeningObject.warnings.map((warning, i) =>
      <div className="screening-warning" key={shortid.generate()}>
        <div className="warning-bold"><span>Warning</span> {`${1 + i} : ${warning.brief}`}</div>
        <p>{warning.details}</p>
      </div>,
    );
  }
  return (
    <div className="screening-details" >
      <div className="screening-details-head">
        <p className={`status-title ${setStatusInfo().classname}`}>{setStatusInfo().title}</p>
        <button
          className="online-review"
          onClick={() => onOpenOnlineReview(submissionId)}
        >Online Review</button>
      </div>
      <p>{setStatusInfo().message}</p>
      <div className="screening-warnings">
        {warnings}
        {((hasStatusFailed) || (hasStatusPassed && hasWarnings)) &&
          <p className="more-info">Need more info on how to pass screening?
             Go to help to read Rules & Policies.</p>}
        <div className="help-btn">
          <Button className="tc-outline-btn" onClick={() => onHelp(submissionId)}>Help</Button>
        </div>
      </div>
    </div>
  );
}

ScreeningDetails.defaultProps = {
  screeningObject: {},
  onHelp: _.noop,
  onOpenOnlineReview: _.noop,
  submissionId: _.noop,
};

ScreeningDetails.propTypes = {
  screeningObject: PT.shape(
    {
      status: PT.string,
      warnings: PT.array,
    },
  ),
  onHelp: PT.func,
  onOpenOnlineReview: PT.func,
  submissionId: PT.string,
};
