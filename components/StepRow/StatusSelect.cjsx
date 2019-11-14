'use strict'

React      = require 'react'
import Select from 'react-select'
PropTypes  = require 'prop-types'
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

  if typeof formProps.value == 'string'
    formProps.value = {value:formProps.value, label: label }

  if editable
    <Select
      {...formProps}
      className   = "statuses basic-single-select"
      options     = {statuses}
      clearable   = {false}
      placeholder = "Status"
      onBlur      = { (event) ->
        formProps.onBlur(formProps.value) }
    />
  else
    if isNew
      <Select {...formProps} className="types basic-single-select" placeholder="Type disabled" isDisabled />
    else
      if typeof formProps.value == 'object'
        label = formProps.value.label
      <p>{label}</p>

StepRow.propTypes =
  formProps : PropTypes.object.isRequired
  editable  : PropTypes.bool.isRequired
  isNew     : PropTypes.bool.isRequired

module.exports = StepRow
