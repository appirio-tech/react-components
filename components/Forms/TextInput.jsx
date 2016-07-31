'use strict'

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

// Defining css classes for each input
const INPUT_FIELD_CLASS_MAP = {
  text: 'tc-file-field__inputs',
}

class TextInput extends BaseInputField {
  render() {
    const { label, name, type, placeholder, disabled, wrapperClass} = this.props
    const { value, dirty, errorMessage, valid } = this.state
    const hasError = dirty && !valid
    const classes = classNames(
      INPUT_FIELD_CLASS_MAP[type],
      {error: hasError}
    )
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        <input
          name={name}
          className={classes}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={this.onChange.bind(this)}
        />
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TextInput.displayName = 'TextInputField'

/**
 * InputField class
 * Supported types - text, datepicker?
 *
class TextInput extends Component {

  onChange(event) {
    const { onFieldChange, validateField, name, validations} = this.props
    const newValue = event.target.value
    // validate
    const results = validateField(newValue, validations)
    this.setState({
      value: newValue,
      dirty: true,
      valid: !results.hasError,
      errorMessage: results.errorMessage
    })
    onFieldChange(name, newValue, !results.hasError)
  }

  componentWillMount() {
    this.setState({
      dirty: false,
      valid: true, // TODO perform validation on component load
      value: this.props.value
    })
  }

  render() {
    const { label, name, type, placeholder, disabled, wrapperClass} = this.props
    const hasError = this.state.dirty && !this.state.valid
    const classes = classNames(
      INPUT_FIELD_CLASS_MAP[type],
      {error: hasError}
    )
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        <input
          name={name}
          className={classes}
          type={type}
          placeholder={placeholder}
          value={this.state.value}
          disabled={disabled}
          onChange={this.onChange.bind(this)}
        />
      { hasError ? (<p className="error-message">{this.state.errorMessage}</p>) : null}
      </div>
    )
  }
}

TextInput.displayName = 'TextInputField'
TextInput.defaultProps = {
  value: '',
  onFieldChange: ()=>{},
  validateField: ()=>{}
}
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
*/
export default TextInput
