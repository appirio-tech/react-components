'use strict'


import Select from 'react-select'
React      = require 'react'
PropTypes  = require 'prop-types'
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
,
  label: 'Development Final Fixes'
  value: 'codeFinalFixes'
]

StepRow = ({
  formProps
  isNew
  editable
}) ->
  typeLabel = find(types, (t) -> t.value == formProps.value)?.label

  if typeof formProps.value == 'string'
    formProps.value = {value:formProps.value, label: typeLabel }

  if isNew
    if editable
      <Select
        {...formProps}
        className   = "types basic-single-select"
        options     = {types}
        clearable   = {false}
        placeholder = "Step Type"
        onBlur      = { (event) ->
          formProps.onBlur(formProps.value) }
      />
    else
      <Select {...formProps} options={types} className="types basic-single-select" placeholder="Type disabled" isDisabled />
  else
    if typeof formProps.value == 'object'
      typeLabel = formProps.value.label
    <p className="types">{typeLabel}</p>

StepRow.propTypes =
  formProps : PropTypes.object.isRequired
  editable  : PropTypes.bool.isRequired
  isNew     : PropTypes.bool

module.exports = StepRow
