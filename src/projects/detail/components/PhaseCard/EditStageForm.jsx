import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// import { unflatten } from 'flat'

import styles from './EditStageForm.scss'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import FormsyForm from 'appirio-tech-react-components/components/Formsy'
const Formsy = FormsyForm.Formsy
const TCFormFields = FormsyForm.Fields
// import enhanceDropdown from 'appirio-tech-react-components/components/Dropdown/enhanceDropdown'
import { updatePhase as updatePhaseAction, syncPhases as syncPhasesAction, firePhaseDirty,
  firePhaseDirtyUndo } from '../../../actions/project'
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import SelectDropdown from '../../../../components/SelectDropdown/SelectDropdown'
import { PHASE_STATUS_COMPLETED, PHASE_STATUS, PHASE_STATUS_ACTIVE } from '../../../../config/constants'
import Tooltip from 'appirio-tech-react-components/components/Tooltip/Tooltip'
import { TOOLTIP_DEFAULT_DELAY } from '../../../../config/constants'

const moment = extendMoment(Moment)
const phaseStatuses = PHASE_STATUS.map(ps => ({ title: ps.name, value: ps.value }))

class EditStageForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isUpdating: false,
      isEdittable: _.get(props, 'phase.status') !== PHASE_STATUS_COMPLETED,
      disableActiveStatusFields: _.get(props, 'phase.status') !== PHASE_STATUS_ACTIVE,
      showPhaseOverlapWarning: false,
      phaseIsdirty: false
    }
    this.submitValue = this.submitValue.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isUpdating: nextProps.isUpdating,
      isEdittable: nextProps.phase.status !== PHASE_STATUS_COMPLETED,
      disableActiveStatusFields: nextProps.phase.status !== PHASE_STATUS_ACTIVE,
    })
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onLeave)
  }

  componentWillUnmount() {
    this.props.firePhaseDirtyUndo()
    window.removeEventListener('beforeunload', this.onLeave)
  }

  submitValue(model) {
    const { phase, phaseIndex, updatePhaseAction } = this.props
    const updatedStartDate = moment.utc(new Date(model.startDate))
    const duration = model.duration ? model.duration : 1
    const endDate = model.status === PHASE_STATUS_COMPLETED ? moment.utc(new Date()) : moment.utc(updatedStartDate).add(duration - 1, 'days')
    const updateParam = _.assign({}, model, {
      startDate: updatedStartDate,
      endDate: endDate || '',
      duration
    })
    this.setState({isUpdating: true})
    updatePhaseAction(phase.projectId, phase.id, updateParam, phaseIndex)
  }

  enableButton() {
    this.setState( { canSubmit: true })
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  isChanged() {
    // We check if this.refs.form exists because this may be called before the
    // first render, in which case it will be undefined.
    return (this.refs.form && this.refs.form.isChanged())
  }

  // Notify user if they navigate away while the form is modified.
  onLeave(e = {}) {
    if (this.isChanged()) {
      return e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
    }
  }

  onCancel() {
    this.refs.form.reset()
    this.props.firePhaseDirtyUndo()
    this.setState({
      showPhaseOverlapWarning: false,
      phaseIsdirty: false
    })
    this.props.cancel()
  }

  /**
   * Handles the change event of the form.
   *
   * @param change changed form model in flattened form
   * @param isChanged flag that indicates if form actually changed from initial model values
   */
  handleChange(change) {
    const { phases, phase, phaseIndex } = this.props
    let showPhaseOverlapWarning = false
    // if start date's day or duration is updated for a phase, we need to update other phases dates accordingly
    const phaseDay = moment.utc(new Date(phase.startDate)).format('DD')
    const changedDay = moment.utc(new Date(change.startDate)).format('DD')
    if (phaseDay !== changedDay || phase.duration !== change.duration) {
      // console.log('Need to sync phases')
      const reqChanges = this.checkOverlappingPhases(phases, phase, phaseIndex, change)
      //console.log('reqChanges : ', reqChanges)
      if (reqChanges && reqChanges.length > 0) {
        showPhaseOverlapWarning = true
      }
      //console.log('showPhaseOverlapWarning  : ', showPhaseOverlapWarning)
    } else {
      // No need to sync phases
      // console.log('No need to sync phases')
    }
    this.setState({
      disableActiveStatusFields: change.status !== PHASE_STATUS_ACTIVE,
      showPhaseOverlapWarning
    })
    if (this.isChanged()) {
      // TODO fire dirty event for phase
      this.setState({
        phaseIsdirty: true
      })
      // this.props.firePhaseDirty(unflatten(change), this.props.phase.id)
    } else {
      // this.props.firePhaseDirtyUndo()
    }
  }

  checkOverlappingPhases(phases, refPhase, refPhaseIndex, updatedPhase) {
    // if startDate or duration is not set in the current update, we don't need to do anything
    if (!updatedPhase.startDate || !updatedPhase.duration) return false
    //Possible mutations
    //!date,!duration //both changed
    //!date,duration //date changed
    //date,!duration //duration changed
    const phasesToBeUpdated = []
    let overLapping = false
    const updatedPhaseStartDate = updatedPhase ? moment(new Date(updatedPhase.startDate)) : null
    const updatedPhaseEndDate = updatedPhase ? moment(new Date(updatedPhase.startDate)).add(updatedPhase.duration - 1, 'days') : null
    const updatedPhaseRange = moment().range(updatedPhaseStartDate, updatedPhaseEndDate)
    for(let i =0; i < phases.length; i++) {
      overLapping = false
      if(i !== refPhaseIndex) {
        const currentStartDate = moment(new Date(phases[i].startDate))
        const currentEndDate = moment(new Date(phases[i].startDate)).add(phases[i].duration - 1, 'days')
        const currentPhaseRange = moment().range(currentStartDate, currentEndDate)
        if(currentPhaseRange.contains(updatedPhaseStartDate)) {
          overLapping = true
        } else if(currentPhaseRange.contains(updatedPhaseEndDate)) {
          overLapping = true
        } else if(updatedPhaseRange.contains(currentStartDate) && updatedPhaseRange.contains(currentEndDate)) {
          overLapping = true
        }
      }
      //pushing the phase if its overlapping with any
      if(overLapping) {
        phasesToBeUpdated.push({
          id: phases[i].id, 
          startDate: moment(new Date(phases[i].startDate)), 
          conflictingPhaseName: phases[i].name,
          conflictingPhaseIndex: i,
          updatedPhase: refPhase.name
        })
      }
    }
    return phasesToBeUpdated
  }

  render() {
    const { phase, isUpdating } = this.props
    const { isEdittable, showPhaseOverlapWarning } = this.state
    let startDate = phase.startDate ? new Date(phase.startDate) : new Date()
    startDate = moment.utc(startDate).format('YYYY-MM-DD')
    const durationDisabled = this.props.productsTimelines[phase.products[0].id].timeline && !this.props.productsTimelines[phase.products[0].id].error
    return (
      <div styleName="container">
        <Prompt
          when={this.state.phaseIsdirty}
          message="You have unsaved changes. Are you sure you want to leave? "
        />
        {this.state.isUpdating && (<LoadingIndicator />)}
        {!this.state.isUpdating && (<div>
          <Formsy.Form
            ref="form"
            disabled={!isEdittable}
            onInvalid={this.disableButton}
            onValid={this.enableButton}
            onValidSubmit={this.submitValue}
            onChange={ this.handleChange }
          >
            <div styleName="form">
              { showPhaseOverlapWarning && <div className="error-message">
                Warning: You are about to manually change the start/end date of this phase, Please ensure the start and end dates of all subsequent phases (where applicable) are updated in line with this change.
              </div> }
              <div styleName="title-label-layer">
                <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} label="Title" type="text" name="name" value={phase.name} maxLength={48} />
              </div>
              <div styleName="label-layer">
                <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} label="Start Date" type="date" name="startDate" value={startDate} />
                {durationDisabled ? (
                  <Tooltip theme="light" tooltipDelay={TOOLTIP_DEFAULT_DELAY}>
                    <div className="tooltip-target"> 
                      <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} disabled={durationDisabled} label="Duration (days)" type="number" name="duration" value={phase.duration} minValue={1} />
                    </div>
                    <div className="tooltip-body">
                        Phase duration is controlled by duration of individual milestones
                    </div>
                  </Tooltip>) : (
                  <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} disabled={durationDisabled} label="Duration (days)" type="number" name="duration" value={phase.duration} minValue={1} />
                ) 
                }
              </div>
              <div styleName="label-layer">
                <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} label="Paid to date (US$)" type="number" name="spentBudget" value={phase.spentBudget} disabled={this.state.disableActiveStatusFields} minValue={0}/>
                <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} label="Price (US$)" type="number" name="budget" value={phase.budget} minValue={0}/>
              </div>
              <div styleName="label-layer">
                <div styleName="input-row">
                  <label className="tc-label">Status</label>
                  <SelectDropdown name="status" value={phase.status} theme="default" options={phaseStatuses} />
                </div>
                <TCFormFields.TextInput wrapperClass={`${styles['input-row']}`} label="Progress (%)" type="number" name="progress" value={phase.progress} disabled={this.state.disableActiveStatusFields} minValue={0} />
              </div>
              <div styleName="group-bottom">
                <button onClick={this.onCancel} type="button" className="tc-btn tc-btn-default"><strong>{'Cancel'}</strong></button>
                <button className="tc-btn tc-btn-primary tc-btn-sm"
                  type="submit" disabled={(!this.isChanged() || isUpdating) || !this.state.canSubmit}
                >Update Phase</button>
              </div>
            </div>
          </Formsy.Form>
        </div>)}
      </div>
    )
  }
}

EditStageForm.defaultProps = {
  cancel: () => {}
}

EditStageForm.propTypes = {
  cancel: PT.func,
  phase: PT.object,
  phaseIndex: PT.number
}

const mapStateToProps = ({projectState, productsTimelines}) => ({
  isUpdating: projectState.processing,
  phases: projectState.phases,
  productsTimelines
})

const actionCreators = {
  updatePhaseAction, 
  syncPhasesAction,
  firePhaseDirty,
  firePhaseDirtyUndo 
}

export default withRouter(connect(mapStateToProps, actionCreators)(EditStageForm))