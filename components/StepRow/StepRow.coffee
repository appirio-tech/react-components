'use strict'

React                  = require 'react'
PropTypes              = React.PropTypes
StepRowView            = require './StepRowView'
{ reduxForm }          = require 'redux-form'
{ loadStep,
  createStep,
  updateStep }         = require 'appirio-tech-client-app-layer'

fields = [
  'name'
  'startsAt'
  'details.submissionsDueBy'
  'endsAt'
  'stepType'
  'status'
]

StepRow = React.createClass
  propTypes:
    fields       : PropTypes.object.isRequired
    handleSubmit : PropTypes.func.isRequired
    submitting   : PropTypes.bool.isRequired
    projectId    : PropTypes.string.isRequired
    stepId       : PropTypes.string
    isNew        : PropTypes.bool

  componentWillMount: ->
    { loadStep, projectId, stepId } = this.props

    if stepId && projectId
      loadStep projectId, stepId

  submit: (values) ->
    { isNew, projectId, stepId, createStep, updateStep, resetForm, initializeForm } = this.props

    if isNew
      createStep(projectId, values).then( () => resetForm() )
    else
      updateStep(projectId, stepId, values).then( () => initializeForm(values) )

  render: ->
    props = Object.assign {}, this.props,
      handleSubmit: this.props.handleSubmit(this.submit)

    React.createElement StepRowView, props

formProps =
  form: 'stepRow'
  fields: fields

mapStateToProps = (state, ownProps) ->
  initialValues: state.entities.steps[ownProps.stepId]

actionsToBind = {
  loadStep,
  createStep,
  updateStep,
}

module.exports = reduxForm(formProps, mapStateToProps, actionsToBind)(StepRow)
