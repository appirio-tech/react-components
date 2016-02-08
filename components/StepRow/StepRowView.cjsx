'use strict'

require './StepRow.scss'
require 'react-datetime/css/react-datetime.css'
require 'react-select/dist/react-select.css'

React      = require 'react'
moment     = require 'moment'
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
  permissions
}) ->
  loader = <loader />
  showPicker = null
  typeLabel = find(types, (t) -> t.value == stepType.value)?.label
  statusLabel = find(statuses, (s) -> s.value == status.value)?.label

  submitClassNames = classNames
    'icon'  : true
    'hollow': true
    'active': true
    'plus'  : isNew
    'checkmark' : !isNew

  if isNew
    if permissions.indexOf('UPDATE') > -1
      StepType = <Select
        {...stepType}
        className   = "types"
        options     = {types}
        clearable   = false
        placeholder = "Step Type"
        onBlur      = { (event) ->
          status.onBlur(status.value) }
      />

      Status = <Select
        {...status}
        className   = "statuses"
        options     = {statuses}
        clearable   = false
        placeholder = "Status"
        onBlur      = { (event) ->
          status.onBlur(status.value) }
      />
    else
      StepType = <Select className="types" placeholder="Type disabled" disabled />

      Status = <Select className="status" placeholder="Status disabled" disabled />
  else
    StepType = <p className="types">{typeLabel}</p>

    Status = <p className="status">{statusLabel}</p>

  <form className="StepRow flex middle" onSubmit={handleSubmit}>
    {# loader }
    {
      if permissions.indexOf('UPDATE') > -1
        <div className="flex middle">
          <input type="text" className="name" {...name} />

          <DateTime className="DateTime" {...startsAt} />

          <DateTime className="DateTime" {...details.submissionsDueBy} />

          <DateTime className="DateTime" {...endsAt} />
        </div>
      else
        if isNew
          <div className="flex middle">
            <input type="text" className="name" disabled=true placeholder="Name edit disabled" />

            <input type="text" className="DateTime" disabled=true placeholder="Date edit disabled"/>

            <input type="text" className="DateTime" disabled=true placeholder="Date edit disabled"/>

            <input type="text" className="DateTime" disabled=true placeholder="Date edit disabled"/>
          </div>
        else
          debugger
          <div className="flex middle">
            <input type="text" className="name" disabled=true {...name} />

            <p className="startsAt">{startsAt.value}</p>

            <p className="dueBy">{details.submissionsDueBy.value}</p>

            <p className="endsAt">{endsAt.value}</p>
          </div>
    }

    {StepType}

    {Status}

    {
      if dirty || isNew
        if permissions.indexOf('UPDATE') > -1
          <button className="clean addButton" type="submit">
            <div className={submitClassNames} />
          </button>
        else
          <button className="clean addButton" disabled=true>
            <div className={submitClassNames} />
          </button>
    }
  </form>

StepRow.propTypes =
  fields       : PropTypes.object.isRequired
  handleSubmit : PropTypes.func.isRequired
  submitting   : PropTypes.bool.isRequired
  permissions  : PropTypes.array.isRequired
  dirty        : PropTypes.bool
  isNew        : PropTypes.bool

module.exports = StepRow
