'use strict'

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

// Defining css classes for each input
const TEXTAREA_CLASS = 'tc-textarea'

/**
 * Textarea input class
 */
class TextareaInput extends BaseInputField {

  render() {
    const { label, name, disabled, wrapperClass} = this.props
    const { dirty, valid, errorMessage, value } = this.state
    const hasError = dirty && !valid

    const classes = classNames(TEXTAREA_CLASS, {error: hasError})
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        <textarea
          id={name}
          name={name}
          className={classes}
          disabled={disabled}
          onChange={this.onChange.bind(this)}
          value={value}
        />
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TextareaInput.displayName = 'TextareaInputField'
// TextareaInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   onFieldChange: PropTypes.func.isRequired,
//   validateField: PropTypes.func.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired
// }
// TextInput.defaultProps = {
//   value: '',
//   onFieldChange: ()=>{},
//   validateField: ()=>{}
// }


export default TextareaInput
