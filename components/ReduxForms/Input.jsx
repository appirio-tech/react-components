import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Field, Errors } from 'react-redux-form'
import _ from 'lodash'

require('./FormField.scss')

class InputFormFieldClass extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      id, label, placeholder,
      formModel, formModelName, fieldModelName,
      errorMessages, validators,
    } = this.props
    const inputType = this.props.inputType || 'text'
    const hasError = _.has(formModel.fields, id)
      && formModel.fields[id].dirty
      && !formModel.fields[id].valid

    // const hasError = true
    const inputClasses = classNames('tc-file-field__inputs', {
      'error': hasError
    })

    // // const hasError = true
    // const inputClasses = classNames('tc-textarea', {
    //   'error': hasError
    // })
    return (
      <div>
        <Field model={fieldModelName} validators={validators}>
          <label className="tc-label">{label}</label>
          <input
            model={fieldModelName}
            name={id}
            className={inputClasses}
            type={inputType}
            placeholder={placeholder}
          />
        </Field>
        <Errors
          model={fieldModelName}
          show={hasError}
          messages={errorMessages}
          component={(props) => <p className="error-message">{props.children}</p>}
        />
      </div>
    )
  }
}

InputFormFieldClass.propTypes = {
  id: PropTypes.string,
  formModel: PropTypes.object.isRequired,
  formModelName: PropTypes.string.isRequired,
  fieldModelName: PropTypes.string.isRequired,
  validators: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputType: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => ({
  formModel: state[ownProps.formModelName]
})
export default connect(mapStateToProps)(InputFormFieldClass)
