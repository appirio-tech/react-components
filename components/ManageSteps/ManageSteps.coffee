'use strict'

React                  = require 'react'
ManageStepsView        = require './ManageStepsView'
{ connect }            = require 'react-redux'
{ loadStepsByProject } = require 'appirio-tech-client-app-layer'

ManageSteps = React.createClass
  propTypes:
    projectId: React.PropTypes.string.isRequired

  componentWillMount: ->
    { loadStepsByProject, projectId } = this.props

    loadStepsByProject projectId

  render: ->
    { projectId, stepsByProject } = this.props

    props =
      projectId: projectId
      stepIds: stepsByProject?.items || []
      fetching: stepsByProject?.isFetching

    React.createElement ManageStepsView, props

mapStateToProps = (state, ownProps) ->
  id = ownProps.projectId

  projectId: id
  stepsByProject: state.stepsByProject[id]

actionsToBind = {
  loadStepsByProject
}

module.exports = connect(mapStateToProps, actionsToBind)(ManageSteps)
