'use strict'

React                  = require 'react'
PropTypes              = require 'prop-types'
ManageStepsView        = require './ManageStepsView'
{ connect }            = require 'react-redux'
{ loadStepsByProject } = require 'appirio-tech-client-app-layer'

ManageSteps = React.createClass
  propTypes:
    projectId: PropTypes.string.isRequired
    permissions: PropTypes.array

  componentWillMount: ->
    { loadStepsByProject, projectId } = this.props

    loadStepsByProject projectId

  render: ->
    { projectId, stepsByProject, permissions } = this.props

    props =
      projectId: projectId
      stepIds: stepsByProject?.items || []
      fetching: stepsByProject?.isFetching
      permissions: permissions || ['CREATE', 'UPDATE', 'DELETE']

    React.createElement ManageStepsView, props

mapStateToProps = (state, ownProps) ->
  id = ownProps.projectId

  projectId: id
  stepsByProject: state.stepsByProject[id]

actionsToBind = {
  loadStepsByProject
}

module.exports = connect(mapStateToProps, actionsToBind)(ManageSteps)
