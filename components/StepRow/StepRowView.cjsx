'use strict'

require './StepRow.scss'
require 'react-datetime/css/react-datetime.css'

React          = require 'react'
PropTypes      = require 'prop-types'
{ Field }       = require 'redux-form'
DateTime       = require 'react-datetime'
classNames     = require 'classnames'
StepTypeSelect = require './StepTypeSelect'
StatusSelect   = require './StatusSelect'



renderDateInput = (field) ->
    if typeof field.input.value == 'object'
      field.input.value = field.input.value.format('MM/DD/YYYY')
    <input  type='text'{...field.input} disabled={field.disabled} className={field.className} placeholder={field.placeholder}/>

renderDateTime = (field) ->
    <DateTime {...field.input} className={field.className}/>

renderStepTypeSelect = (field) ->
    <StepTypeSelect isNew={field.isNew} formProps={field.input} editable={field.editable} />


renderStatusSelect = (field) ->
    <StatusSelect isNew={field.isNew} formProps={field.input} editable={field.editable} />

StepRow = ({
  handleSubmit
  submitting
  dirty
  isNew
  permissions
}) ->
  editable = permissions.indexOf('UPDATE') > -1
  isNew    = isNew || false

  submitClassNames = classNames
    'icon'  : true
    'hollow': true
    'active': true
    'plus'  : isNew
    'checkmark' : !isNew

  <form className="StepRow flex middle" onSubmit={handleSubmit}>
    {
      if editable
        <div className="flex middle">

          <Field name="name" className="name" type="text" component='input'/>

          <Field name="startsAt" className="DateTime"  component={renderDateTime}/>

          <Field name="details.submissionsDueBy" className="DateTime"  component={renderDateTime}/>

          <Field name="endsAt" className="DateTime"  component={renderDateTime}/>

        </div>
      else
        if isNew
          <div className="flex middle">

            <Field name="name" className="name" type="text" component="input" disabled={true} placeholder="Name edit disabled"/>

            <Field name="startsAt" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>

            <Field name="details.submissionsDueBy" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>

            <Field name="endsAt" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>
          </div>
        else
          <div className="flex middle">


            <Field name="name" className="name" type="text" component="input" disabled={true} placeholder="Name edit disabled"/>

            <Field name="startsAt" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>

            <Field name="details.submissionsDueBy" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>

            <Field name="endsAt" className="DateTime disabled" type="text" component={renderDateInput} disabled={true} placeholder="Date edit disabled"/>
          </div>
    }



    <Field name="stepType" isNew={isNew} editable={editable} component={renderStepTypeSelect}/>

    <Field name="status" isNew={isNew} editable={editable} component={renderStatusSelect}/>

    {
      if editable && (dirty || isNew)
        <button className="clean addButton" type="submit">
          <div className={submitClassNames} />
        </button>
    }
  </form>

StepRow.propTypes =
  handleSubmit : PropTypes.func.isRequired
  submitting   : PropTypes.bool.isRequired
  permissions  : PropTypes.array.isRequired
  dirty        : PropTypes.bool
  isNew        : PropTypes.bool

module.exports = StepRow
