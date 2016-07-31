'use strict'

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

// Defining css classes for each input
const TEXTAREA_CLASS = 'tc-textarea'

/**
 * Base Input field implementation
 */
class BaseInputField extends Component {

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
}

BaseInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
BaseInputField.defaultProps = {
  value: '',
  onFieldChange: ()=>{},
  validateField: ()=>{}
}


export default BaseInputField
