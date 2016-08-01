'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

class TiledCheckboxInput extends BaseInputField {

  onChange(value, event) {
    event.preventDefault()
    const { onFieldChange, validateField, name, validations} = this.props
    // validate
    const newValue = _.xor(this.state.value, [value])
    const results = validateField(newValue, validations)
    const isValid = results && !results.hasError || true
    this.setState({
      dirty: true,
      value: newValue,
      valid: isValid,
      errorMessage: _.get(results, 'errorMessage', '')
    })
    onFieldChange(name, newValue, isValid)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  render() {
    const { wrapperClass, options} = this.props
    const { value, valid, dirty, errorMessage } = this.state
    const hasError = dirty && !valid
    const renderOption = (opt, idx) => {
      // adding classes eg. "phone active"
      const itemClassnames = classNames(opt.value, {
        active: _.indexOf(value, opt.value) > -1
      })
      const handleClick = this.onChange.bind(this, opt.value)
      return (
        <a onClick={ handleClick } className={itemClassnames} key={idx} >
          <span className="icon"></span>
          <span className="title">{opt.title}</span>
          <small>{opt.desc}</small>
        </a>
      )
    }

    return (
      <div className={wrapperClass}>
        {options.map(renderOption)}
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TiledCheckboxInput.displayName = 'TiledCheckboxInputField'
TiledCheckboxInput.propTypes = _.assign({}, TiledCheckboxInput.propTypes, {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
})

export default TiledCheckboxInput
