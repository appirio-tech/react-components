'use strict'

require 'react-select/dist/react-select.css'

React      = require 'react'
PropTypes  = React.PropTypes
Select     = require 'react-select'
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

  if isNew
    if editable
      <Select
        {...formProps}
        className   = "types"
        options     = {types}
        clearable   = false
        placeholder = "Step Type"
        onBlur      = { (event) ->
          formProps.onBlur(formProps.value) }
      />
    else
      <Select className="types" placeholder="Type disabled" disabled />
  else
    <p className="types">{typeLabel}</p>

StepRow.propTypes =
  formProps : PropTypes.object.isRequired
  editable  : PropTypes.bool.isRequired
  isNew     : PropTypes.bool

module.exports = StepRow
