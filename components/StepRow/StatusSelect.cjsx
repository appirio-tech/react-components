'use strict'

require 'react-select/dist/react-select.css'

React      = require 'react'
PropTypes  = React.PropTypes
Select     = require 'react-select'
find       = require 'lodash/find'

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
  formProps
  editable
  isNew
}) ->
  label = find(statuses, (t) -> t.value == formProps.value)?.label

  if editable
    <Select
      {...status}
      className   = "statuses"
      options     = {statuses}
      clearable   = false
      placeholder = "Status"
      onBlur      = { (event) ->
        status.onBlur(status.value) }
    />
  else
    if isNew
      <Select className="status" placeholder="Status disabled" disabled />
    else
      <p>{label}</p>

StepRow.propTypes =
  formProps : PropTypes.object.isRequired
  editable  : PropTypes.bool.isRequired
  isNew     : PropTypes.bool.isRequired

module.exports = StepRow
