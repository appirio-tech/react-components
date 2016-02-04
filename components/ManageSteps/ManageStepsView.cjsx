'use strict'

require './ManageSteps.scss'

React      = require 'react'
classNames = require 'classnames'
StepRow    = require '../StepRow/StepRow.coffee'

component = ({projectId, stepIds, fetching}) ->
  <div className="ManageSteps">
    <div className="add-a-Step">
      <h5>add a Step</h5>

      <hr  />

      <StepRow projectId={projectId} formKey="new" isNew={true} />
    </div>

    <div className="project-Steps">
      <header className="flex space-between middle">
        <h5>project Steps</h5>
      </header>

      <hr  />

      {
        headers = ['Step Name', 'Start Date', 'Due Date', 'End Date', 'Step Type', 'Step Status']

        if stepIds.length
          <div>
            <ul className="column-headers flex center">
              {
                headers.map (item, index) ->
                  <li key={index}>{item}</li>
              }
            </ul>

            <ul className="Steps">
              {
                stepIds.map (stepId, index) ->
                  <li key={index}>
                    <StepRow
                      formKey={stepId.toString()}
                      projectId={projectId}
                      stepId={stepId} />
                  </li>
              }
            </ul>
          </div>

        else if fetching
          <p>Getting steps</p>

        else
          <p>Add Steps above to layout your project schedule.</p>
      }
    </div>
  </div>

component.propTypes =
  projectId: React.PropTypes.string.isRequired
  stepIds: React.PropTypes.array.isRequired
  fetching: React.PropTypes.bool

module.exports = component