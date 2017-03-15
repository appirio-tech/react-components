/**
 * This component receives via props a single submission data object,
 * and showScreeningDetails boolean property, which should tell whether
 * the Screening Details component should be rendered or not
 * (and also to choose the proper orientation of arrow icon).
 *
 * Also, this component will receive the following callbacks to be triggered
 * when user clicks on buttons/icons/links:
 * onDelete() (to be triggered by delete icon),
 * onDownload() (to be triggered by download icon),
 * onShowDetails() (to be triggered by details arrow icon, and also by screening status component).
 */
import React, { PropTypes as PT } from 'react';
import moment from 'moment';
import _ from 'lodash';
import DownloadIcon from '../Icons/IconSquareDownload.svg';
import DeleteIcon from '../Icons/IconTrashSimple.svg';
import ExpandIcon from '../Icons/IconMinimalDown.svg';
import ScreeningStatus from '../ScreeningStatus/ScreeningStatus';

import './Submission.scss';

export default function Submission(props) {
  const {
    submissionObject,
    showScreeningDetails,
    type,
    onDelete,
    onDownload,
    onShowDetails,
  } = props;
  const date = moment(parseInt(submissionObject.submitted, 10)).format('MMM DD, YYYY hh:mm A');
  return (
    <tr className="submission-row">
      <td className="preview-col">
        <img src={submissionObject.preview} alt="preview" className={type === 'design' ? 'design-img' : 'dev-img'} />
      </td>
      <td className="id-col">{submissionObject.id}</td>
      <td className="type-col">{submissionObject.type}</td>
      <td className="date-col">{date}</td>
      {type === 'design' && <td className="status-col">
        {submissionObject.screening &&
          <ScreeningStatus
            screeningObject={submissionObject.screening}
            onShowDetails={onShowDetails}
            submissionId={submissionObject.id}
          />}
      </td>}
      <td className={`action-col ${type === 'design' ? 'design' : 'develop'}`}>
        <div className="action-col">
          <button
            className="download-icon"
            onClick={() => onDownload(submissionObject.id)}
          ><DownloadIcon /></button>
          <button
            className="delete-icon"
            onClick={() => onDelete(submissionObject.id)}
          ><DeleteIcon /></button>
          <button
            className={`expand-icon ${(showScreeningDetails ? 'expanded' : '')}`}
            onClick={() => onShowDetails(submissionObject.id)}
          ><ExpandIcon /></button>
        </div>
      </td>
    </tr>
  );
}

Submission.defaultProps = {
  submissionObject: {},
  showScreeningDetails: false,
  type: 'design',
  onDelete: _.noop,
  onDownload: _.noop,
  onShowDetails: _.noop,
};

Submission.propTypes = {
  submissionObject: PT.shape(
    {
      id: PT.string,
      warpreviewnings: PT.string,
      screening: PT.shape({
        status: PT.string,
      }),
      submitted: PT.string,
      type: PT.string,
    },
  ),
  showScreeningDetails: PT.bool,
  type: PT.string,
  onDelete: PT.func,
  onDownload: PT.func,
  onShowDetails: PT.func,
};
