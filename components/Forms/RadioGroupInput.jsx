'use strict'

import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

class RadioButton extends Component {
  render() {
    const { name, index, label, selectedValue, value, onChange } = this.props
    const id = [name, 'option', index].join('-')
    return (
      <div className="radio">
        <input type="radio"
          name={name} id={id} value={value}
          checked={value === selectedValue}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}

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
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        {this.props.options.map(renderOption)}
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
