'use strict'

import React from 'react'
import classNames from 'classnames'
import BaseInputField from './BaseInputField'

// Defining css classes for each input
const INPUT_FIELD_CLASS_MAP = {
  text: 'tc-file-field__inputs'
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
          onChange={this.onChange}
        />
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TextInput.displayName = 'TextInputField'

export default TextInput
