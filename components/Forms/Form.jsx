'use strict'

import React, { PropTypes } from 'react'
import _ from 'lodash'


function setValue(path, val, obj) {
  const fields = path.split('.')
  let result = obj
  for (let i = 0, n = fields.length; i < n && result !== undefined; i++) {
    const field = fields[i]
    if (i === n - 1) {
      result[field] = val
    } else {
      if (typeof result[field] === 'undefined' || !_.isObject(result[field])) {
        result[field] = {}
      }
      result = result[field]
    }
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const formValue = _.assign({}, this.props.initialValue || {})
    this.setState({
      fieldValidity: {}, // TODO perform initial validations
      dirty: false,
      valid: false,
      formValue
    })
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.formValue)
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
    const newState = _.assign({}, this.state)
    // setting the form value
    setValue(fieldName, fieldValue, newState.formValue)
    // update field validity
    newState.fieldValidity[fieldName] = isValid
    _.merge(newState, {
      valid: _.every(newState.fieldValidity),
      dirty: true
    })
    this.setState(newState)
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      let childProps = {}
      // string has no props
      if (child.props) {
        // restrict applying additional properties to "registered field types"
        const childType = this.getChildType(child)

        switch(childType) {
        case 'InputField':
          // provide additional properties
          const value = _.isEmpty(child.props.value)
            ? _.get(this.state.formValue, child.props.name, '')
            : child.props.value
          childProps = {
            value: value,
            validateField: this.validateField.bind(this),
            onFieldChange: this.handleFieldChange.bind(this)
          }
          break
        case 'SubmitButton':
          // (isDirty && !isValid) || !isDirty
          childProps = {
            disabled: (!this.state.valid && this.state.dirty) || !this.state.dirty,
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
      const displayName = _.get(elem, 'type.displayName', '')
      if (displayName.indexOf('Field') > -1)
        return 'InputField'
      else if (displayName.indexOf('SubmitButton') > -1)
        return 'SubmitButton'
    }
    return 'UI'
  }
}

Form.propTypes = {
  initalValue: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func
}
export default Form
