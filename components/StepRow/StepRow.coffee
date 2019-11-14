'use strict'

React                  = require 'react'
PropTypes              = require 'prop-types'
StepRowView            = require './StepRowView'
{ connect }            = require 'react-redux'
{ reduxForm }          = require 'redux-form'
{ loadStep,
  createStep,
  updateStep }         = require 'appirio-tech-client-app-layer'


class StepRow extends React.Component
  @propTypes =
    permissions  : PropTypes.array.isRequired
    handleSubmit : PropTypes.func.isRequired
    submitting   : PropTypes.bool.isRequired
    projectId    : PropTypes.string.isRequired
    stepId       : PropTypes.string
    isNew        : PropTypes.bool

  constructor: (props) ->
    super(props)
    this.submit = this.submit.bind this

  componentWillMount: ->
    { loadStep, projectId, stepId } = this.props

    if stepId && projectId
      loadStep projectId, stepId

  submit: (values) ->
    { isNew, projectId, stepId, createStep, updateStep, resetForm, initializeForm } = this.props
    if values.status
      values.status = values.status.value
    if values.stepType
      values.stepType = values.stepType.value

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

mapStateToProps = (state, ownProps) ->
  initialValues: state.entities.steps[ownProps.stepId]

actionsToBind = {
  loadStep,
  createStep,
  updateStep,
}

module.exports = connect(mapStateToProps, actionsToBind)(reduxForm(formProps )(StepRow))
