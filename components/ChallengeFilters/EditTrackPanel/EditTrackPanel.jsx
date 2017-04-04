/**
 * EditTrackPanel component
 * Component that is displayed on mobile devices, to allow the user to change the tracks
 * ('Design', 'Development' or 'Data Science')
 *
 * Usage:
 *
 *     <EditTrackPanel
 *       opened={this.state.showEditTrackPanel}
 *       onClose={this.toggleEditTrackPanel.bind(this)}
 *       designEnabled={this.state.filter.tracks.has(DESIGN_TRACK)}
 *       switchDesign={enable => this.setTracks(DESIGN_TRACK, enable)}
 *       devEnabled={this.state.filter.tracks.has(DEVELOP_TRACK)}
 *       switchDev={enable => this.setTracks(DEVELOP_TRACK, enable)}
 *       dataScienceEnabled={this.state.filter.tracks.has(DATA_SCIENCE_TRACK)}
 *       switchDataScience={enable => this.setTracks(DATA_SCIENCE_TRACK, enable)}
 *    />
 */
import React, { PropTypes as PT } from 'react';
import Switch from '../../Switch';
import UiSimpleRemove from '../../Icons/UiSimpleRemove';
import './EditTrackPanel.scss';

const EditTrackPanel = props => (
  <div className={`EditTrackPanel ${props.opened === true ? 'opened' : 'closed'}`}>
    <div className="header">
      <span className="title">Tracks</span>
      <span className="close-icon" onClick={() => props.onClose()}>
        <UiSimpleRemove className="cross" />
      </span>
    </div>
    <div className="row">
      <span>Design</span>
      <Switch
        enabled={props.designEnabled}
        onSwitch={props.switchDesign}
      />
    </div>
    <div className="row">
      <span>Development</span>
      <Switch
        enabled={props.devEnabled}
        onSwitch={props.switchDev}
      />
    </div>
    <div className="row">
      <span className="track-name">Data Science</span>
      <Switch
        enabled={props.dataScienceEnabled}
        onSwitch={props.switchDataScience}
      />
    </div>
  </div>
);

EditTrackPanel.defaultProps = {
  opened: false,
};

EditTrackPanel.propTypes = {
  opened: PT.bool,
  onClose: PT.func.isRequired,
  designEnabled: PT.bool.isRequired,
  switchDesign: PT.func.isRequired,
  devEnabled: PT.bool.isRequired,
  switchDev: PT.func.isRequired,
  dataScienceEnabled: PT.bool.isRequired,
  switchDataScience: PT.func.isRequired,
};

export default EditTrackPanel;
