'use strict'

import React, { PropTypes } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import BaseInputField from './BaseInputField'

const CheckboxInput = ({index, name, label, value, selectedValue}) => {
  const id = [name, 'option', index].join('-')
  return (
    <div>
      <div className="tc-checkbox">
        <input id={id} type="checkbox" value={value}  checked={value === selectedValue} />
        <label htmlFor={id}/>
      </div>
      <label className="tc-checkbox-label" htmlFor={id}>{label}</label>
    </div>
  )
}

class CheckboxGroupInput extends BaseInputField {
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
        <CheckboxInput
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
    const wrapperClasses = classNames(wrapperClass, 'checkbox-group-input')
    return (
      <div className={ wrapperClasses }>
        <label className="checkbox-group-label">{label}</label>
        <div className="checkbox-group-options">{this.props.options.map(renderOption)}</div>
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
CheckboxGroupInput.displayName = 'CheckboxGroupInputField'
CheckboxGroupInput.propTypes = _.assign({}, CheckboxGroupInput.propTypes, {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
})

export default CheckboxGroupInput
