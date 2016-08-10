'use strict'

import React from 'react'
import classNames from 'classnames'
import BaseInputField from './BaseInputField'

// Defining css classes for each input
const TEXTAREA_CLASS = 'tc-textarea'

/**
 * Textarea input class
 */
class TextareaInput extends BaseInputField {

  constructor(props) {
    super(props)
  }

  render() {
    const { label, name, disabled, placeholder, wrapperClass} = this.props
    const { dirty, valid, errorMessage, value } = this.state
    const hasError = dirty && !valid

    const classes = classNames(TEXTAREA_CLASS, {error: hasError})
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={classes}
          disabled={disabled}
          onChange={this.onChange}
          value={value}
        />
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TextareaInput.displayName = 'TextareaInputField'

export default TextareaInput
