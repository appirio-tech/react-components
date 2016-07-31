'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

const RadioButton = React.createClass({
  render: function() {
    const { name, index, label, selectedValue, value, onChange } = this.props
    const id = [name, 'option', index].join('-')
    return (
      <div className="radio">
        <input type="radio"
          name={name} id={id} value={value}
          checked={value === selectedValue}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
})

class RadioGroupInput extends BaseInputField {
  render() {
    const { label, name, disabled, wrapperClass} = this.props
    const { value, valid, dirty, errorMessage } = this.state
    const hasError = dirty && !valid
    const renderOption = (opt, idx) => {
      return (
        <RadioButton
          key={idx}
          index={idx}
          name={name}
          label={opt.label}
          value={opt.value}
          selectedValue={value}
          onChange={this.onChange.bind(this)}
        />
      )
    }
    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        {this.props.options.map(renderOption)}
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
RadioGroupInput.displayName = 'RadioGroupInputField'
RadioGroupInput.propTypes = _.assign(
  {},
  RadioGroupInput.propTypes,
  {
    options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }
)

export default RadioGroupInput
