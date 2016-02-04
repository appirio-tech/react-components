'use strict'

require './StepRow.scss'
require 'react-datetime/css/react-datetime.css'
require 'react-select/dist/react-select.css'

React      = require 'react'
PropTypes  = React.PropTypes
DateTime   = require 'react-datetime'
Select     = require 'react-select'
classNames = require 'classnames'
find       = require 'lodash/find'

types = [
  label: 'Design Concepts'
  value: 'designConcepts'
,
  label: 'Complete Designs'
  value: 'completeDesigns'
,
  label: 'Final Fixes'
  value: 'finalFixes'
,
  label: 'Development'
  value: 'code'
]

statuses = [
  label: 'Project Launched'
  value: 'PROJECT_LAUNCHED'
,
  label: 'Scheduled'
  value: 'SCHEDULED'
,
  label: 'In Progress'
  value: 'OPEN'
,
  label: 'Closed'
  value: 'CLOSED'
]

StepRow = ({ 
  fields: { name, startsAt, details, endsAt, stepType, status }
  handleSubmit
  submitting
  dirty
  isNew
}) ->
  loader = <loader />
  showPicker = null
  typeLabel = find(types, (t) -> t.value == stepType.value)?.label

  submitClassNames = classNames
    'icon'  : true
    'hollow': true
    'active': true
    'plus'  : isNew
    'checkmark' : !isNew

  if isNew
    StepType = <Select
      {...stepType}
      className   = "types"
      options     = {types}
      clearable   = false
      placeholder = "Step Type"
      onBlur      = { (event) ->
        status.onBlur(status.value) }
    />
  else
    StepType = <p className="types">{typeLabel}</p>

  <form className="StepRow flex middle" onSubmit={handleSubmit}>
    {# loader }

    <input type="text" className="name" {...name} />

    <DateTime className="DateTime" {...startsAt} />

    <DateTime className="DateTime" {...details.submissionsDueBy} />

    <DateTime className="DateTime" {...endsAt} />

    {StepType}

    <Select
      {...status}
      className   = "statuses"
      options     = {statuses}
      clearable   = false
      placeholder = "Status"
      onBlur      = { (event) ->
        status.onBlur(status.value) }
    />

    {
      if dirty || isNew
        <button className="clean" type="submit">
          <div className={submitClassNames} />
        </button>
    }
  </form>

StepRow.propTypes =
  fields       : PropTypes.object.isRequired
  handleSubmit : PropTypes.func.isRequired
  submitting   : PropTypes.bool.isRequired
  dirty        : PropTypes.bool
  isNew        : PropTypes.bool

module.exports = StepRow
