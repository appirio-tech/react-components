'use strict'

import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import BaseInputField from './BaseInputField'
import RadioButton from './RadioButton'

class RadioGroupInput extends BaseInputField {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  render() {
    const { label, name, wrapperClass} = this.props
    const { value, valid, dirty, errorMessage } = this.state
    const hasError = dirty && !valid
    const renderOption = (opt, idx) => {
      return (
        <RadioButton
          key={idx}
          index={idx}
          name={name}
          label={opt.label}
          value={opt.value}
          selectedValue={value}
          onChange={ this.onChange }
        />
      )
    }
    const wrapperClasses = classNames(wrapperClass, 'radio-group-input')
    return (
      <div className={ wrapperClasses }>
        <label className="radio-group-label">{label}</label>
        <div className="radio-group-options">{this.props.options.map(renderOption)}</div>
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
RadioGroupInput.displayName = 'RadioGroupInputField'
RadioGroupInput.propTypes = _.assign({}, RadioGroupInput.propTypes, {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
})

export default RadioGroupInput
