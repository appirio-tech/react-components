'use strict'

require './StepRow.scss'
require 'react-datetime/css/react-datetime.css'

React          = require 'react'
PropTypes      = React.PropTypes
DateTime       = require 'react-datetime'
classNames     = require 'classnames'
StepTypeSelect = require './StepTypeSelect'
StatusSelect   = require './StatusSelect'

StepRow = ({ 
  fields: { name, startsAt, details, endsAt, stepType, status }
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
          <input type="text" className="name" {...name} />

          <DateTime className="DateTime" {...startsAt} />

          <DateTime className="DateTime" {...details.submissionsDueBy} />

          <DateTime className="DateTime" {...endsAt} />
        </div>
      else
        if isNew
          <div className="flex middle">
            <input type="text" className="name" disabled=true placeholder="Name edit disabled" />

            <input type="text" className="DateTime disabled" disabled=true placeholder="Date edit disabled"/>

            <input type="text" className="DateTime disabled" disabled=true placeholder="Date edit disabled"/>

            <input type="text" className="DateTime disabled" disabled=true placeholder="Date edit disabled"/>
          </div>
        else
          <div className="flex middle">
            <p className="name">{name.value}</p>

            <p className="DateTime disabled">{startsAt.value}</p>

            <p className="DateTime disabled">{details.submissionsDueBy.value}</p>

            <p className="DateTime disabled">{endsAt.value}</p>
          </div>
    }

    <StepTypeSelect isNew={isNew} formProps={stepType} editable={editable} />

    <StatusSelect isNew={isNew} formProps={status} editable={editable} />

    {
      if editable && (dirty || isNew)
        <button className="clean addButton" type="submit">
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
