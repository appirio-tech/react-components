'use strict'

import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

/**
 * Base Input field implementation
 */
class BaseInputField extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.init = this.init.bind(this)
  }

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps)
  }

  init(props) {
    this.setState({
      dirty: false,
      valid: true, // TODO perform validation on component load
      value: props.value
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state)
  }

  onChange(event) {
    const { onFieldChange, validateField, name, validations} = this.props
    const newValue = event.target.value
    // validate
    const results = validateField(newValue, validations)
    // TODO - compare against this.props.value to see if value has infact changed
    this.setState({
      value: newValue,
      dirty: this.state.value !== newValue, //
      valid: !results.hasError,
      errorMessage: results.errorMessage
    })
    onFieldChange(name, newValue, !results.hasError)
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
  onFieldChange: () => {},
  validateField: () => {}
}


export default BaseInputField
