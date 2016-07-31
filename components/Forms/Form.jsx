'use strict'

import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Form extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const formValue = _.assign({}, this.props.initialValue || {})
    this.setState({
      valid: true,
      formValue
    })
  }

  onSubmit(event) {
    event.preventDefault()
    // let formValue = _.mapValues(this.state.fields, (f) => f.value)
    // extract field values and return them
    this.props.onSubmit(this.state)
  }

  /**
   * perform validations corresponding to field defined in schema
   * @param  {string} fieldName  Name of the field
   * @param  {string} fieldValue new value
   * @return {object} object with hasError(boolean) and error message(strng) fields
   */
  validateField(fieldValue, validations) {
    const errors = _.map(validations, (v) => {
      // message if invalid else null
      return v[0](fieldValue) ? false : v[1]
    })
    const hasError = !_.isEmpty(validations) && _.every(errors)
    const errorMessage = hasError ? errors.join(' ') : null
    return { hasError, errorMessage }
  }

  /**
   * function that updates component state with user entered value
   * after validating the input
   * @param  {string} fieldName  name of the field updated
   * @param  {string} fieldValue updated field value
   */
  handleFieldChange(fieldName, fieldValue, isValid) {
    // validate
    let newState = _.assign({}, this.state)
    newState.formValue[fieldName] = fieldValue
    newState.valid = newState.valid && isValid
    this.setState(newState)
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      var childProps = {}
      // string has no props
      if (child.props) {
        // restrict applying additional properties to "registered field types"
        const childType = this.getChildType(child)
        switch(childType) {
          case 'InputField':
            // provide additional properties
            childProps = {
              value: _.get(this.state.formValue, child.props.name),
              validateField: this.validateField.bind(this),
              onFieldChange: this.handleFieldChange.bind(this)
            }
            break
          case 'SubmitButton':
            childProps = {
              disabled: !this.state.valid,
              onClick: this.onSubmit.bind(this)
            }
            break
          default:
            childProps = {}
        }
        childProps.children = this.recursiveCloneChildren(child.props.children)
        if (_.isEmpty(childProps)) {
          return child
        } else {
          return React.cloneElement(child, childProps)
        }
      }
      return child
    })
  }
  render() {
    return (<form>{this.recursiveCloneChildren(this.props.children)}</form>)
  }

  /**
   * Helper function to help identify form field.
   * Returns true if component type is function & displayName constains "Field"
   */
  getChildType(elem) {
    if (typeof elem.type === 'function') {
      if (elem.type.displayName.indexOf('Field') > -1)
        return 'InputField'
      else if (elem.type.displayName.indexOf('SubmitButton') > -1)
        return 'SubmitButton'
    }
    return 'UI'
  }
}

Form.propTypes = {
  initalValue: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
}
export default Form
