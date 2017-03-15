/**
 * This container component load data into its state, and pass them to children via props.
 * Its should have in its state, and properly manage the showDetails set
 * (thus allowing to show/hide detail panels for different submissions),
 * and it should define all necessary handlers to pass to the children.
 */
import React from 'react';
import _ from 'lodash';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import SubmissionManagement from './SubmissionManagement/SubmissionManagement';

require('./SubmissionManagementPageContainer.scss');

// The container component itself.
class SubmissionManagementPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mockObject: {},
      showDetails: new Set(),
      showModal: false,
      toBeDeletedId: 0,
      test: '', // temporally to pass 'Expected 'this' to be used by class method' lint error
    };
    const that = this;

    fetch('components/SubmissionManagement/MockData/submissions-data-design-mock.json')
      .then(resp => resp.json())
      .then(data => that.setState({ mockObject: data }));

    this.onShowDetails = this.onShowDetails.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOpenOnlineReview = this.onOpenOnlineReview.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onHelp = this.onHelp.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }
  /**
   * Hanle Back to previous page.
   */
  onBack() {
    console.log(`onBack() : back btn clicked ${this.state.test}`);
  }
  /**
   * Trigger when delete button clicked and show the modal.
   */
  onDelete(submissionId) {
    this.setState({ showModal: true, toBeDeletedId: submissionId });
    console.log(`onDelete(id) :  id = ${submissionId}`);
  }
  /**
   * Remove submission from the table.
   */
  onRemove(submissionId) {
    this.setState({ showModal: false, toBeDeletedId: 0 });
    console.log(`id = ${submissionId} deleted`);
  }
  /**
   * Triggered when modal cancle button clicked and hide the modal.
   */
  onCancel() {
    this.setState({ showModal: false, toBeDeletedId: 0 });
  }
  /**
   * Triggered when open online review button clicked.
   */
  onOpenOnlineReview(submissionId) {
    console.log(`onOpenOnlineReview(id) : id = ${submissionId}${this.state.test}`);
  }
  /**
   * Triggered when help button clicked
   */
  onHelp(submissionId) {
    console.log(`onHelp(id) : id = ${submissionId}${this.state.test}`);
  }
  /**
   * Triggered when download button clicked.
   */
  onDownload(submissionId) {
    console.log(`onDownload(id) : id = ${submissionId}${this.state.test}`);
  }
  /**
   * Triggered when the Screening Status clicked and the down arrow.
   * Add or delete the submissionId to showDetails Set which help to toggle the screening details.
   */
  onShowDetails(submissionId) {
    const temp = this.state.showDetails;
    if (temp.has(submissionId)) {
      temp.delete(submissionId);
    } else {
      temp.add(submissionId);
    }
    this.setState({ showDetails: temp });
  }
  /**
   * Triggered when add submission button clicked.
   */
  onSubmit() {
    console.log(`onSubmit() : called ${this.state.test}`);
  }

  render() {
    const isEmpty = _.isEmpty(this.state.mockObject);
    const config = {
      onShowDetails: this.onShowDetails,
      onDelete: this.onDelete,
      onHelp: this.onHelp,
      onDownload: this.onDownload,
      onOpenOnlineReview: this.onOpenOnlineReview,
      onBack: this.onBack,
      onSubmit: this.onSubmit,
    };
    return (
      <div className="submission-management-container">
        {!isEmpty &&
          <SubmissionManagement
            mockObject={this.state.mockObject}
            showDetails={this.state.showDetails}
            {...config}
          />}
        {this.state.showModal && <Modal onCancel={this.onCancel}>
          <div className="modal-content">
            <p className="are-you-sure">
              Are you sure you want to delete
               submission <span className="id">{this.state.toBeDeletedId}</span>?</p>
            <p className="remove-warn">
              This will permanently remove all
               files from our servers and can’t be undone.
               You’ll have to upload all the files again in order to restore it.</p>
            <div className="action-btns">
              <Button
                className="tc-outline-btn"
                onClick={() => this.onCancel()}
              >Cancel</Button>
              <Button
                className="red tc-blue-btn"
                onClick={() => this.onRemove(this.state.toBeDeletedId)}
              >Delete Submission</Button>
            </div>
          </div>
        </Modal>}
      </div>
    );
  }
}

module.exports = SubmissionManagementPageContainer;
