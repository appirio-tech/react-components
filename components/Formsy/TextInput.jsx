import React, { Component } from 'react'
import PT from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

import HelpIcon from '../HelpIcon/HelpIcon'
import IconUICheckSimple from '../Icons/IconUICheckSimple'

import styles from './TextInput.scss'

class TextInput extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
    this.callValidator= this.callValidator.bind(this)
    this.isValidInput= this.isValidInput.bind(this)
    this.previousValue = null
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.callValidator()
    }, 100)
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
    this.isUpdatedValue = true
  }

  callValidator() {
    const { validator } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const value = this.props.getValue()
    if (!hasError && value && value !== this.previousValue && this.isUpdatedValue) {
      validator(value)
      this.previousValue = value
    }
  }

  isValidInput() {
    const value = this.props.getValue()
    const hasError = !this.props.isPristine() && !this.props.isValid()
    return (!this.props.forceErrorMessage && !!value && !hasError)
  }

  render() {
    const { label, name, type, minValue, maxValue, placeholder, wrapperClass, maxLength, theme,
      labelHelpTooltip, readonly, readonlyValueTooltip, showCheckMark } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const wrapperClasses = classNames(wrapperClass, theme, { [styles['readonly-wrapper']]: readonly })
    const classes = classNames('tc-file-field__inputs', {error: hasError}, {empty: this.props.getValue() === ''})
    const errorMessage = this.props.getErrorMessage() || this.props.validationError
    const value = this.props.getValue()
    return (
      <div className={wrapperClasses}>
        <label className="tc-label">
          {label}
          {labelHelpTooltip && <HelpIcon tooltip={labelHelpTooltip} />}
        </label>
        <input
          name={name}
          className={classes}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={this.changeValue}
          maxLength={maxLength}
          min={minValue}
          max={maxValue}
        />
        {this.isValidInput() && showCheckMark && (
          <IconUICheckSimple wrapperClass="check-success-icon" width={10} height={10} fill="#5CC900"/>
        )}
        {readonly && (
          <div styleName="readonly-value">
            {this.props.getValue()}
            {readonlyValueTooltip && <HelpIcon tooltip={readonlyValueTooltip} />}
          </div>
        )}
        { hasError ? (<p className="error-message">{errorMessage}</p>) : (this.props.forceErrorMessage && (<p className="error-message">{this.props.forceErrorMessage}</p>))}
      </div>
    )
  }
}

TextInput.defaultProps = {
  onChange: () => {},
  forceErrorMessage: null,
  validator: (() => {}),
  showCheckMark: false
}

TextInput.propTypes = {
  /**
   * The difference from `disabled` is that instead of showing disabled input
   * we show value using <div> which let us position something immediately after the value
   */
  readonly: PT.bool,

  /**
   * Show help icon next to the label with the tooltip defined by this prop
   */
  labelHelpTooltip: PT.node,

  /**
   * Show help icon next to the value with the tooltip defined by this prop
   * This only has any effect if `readonly` is set to `true`
   */
  readonlyValueTooltip: PT.node,

  /**
   * Show error message without any condition
   */
  forceErrorMessage: PT.string,

  /**
   * validator functionn from outside
   */
  validator: PT.func,

  /**
   * should show check mark icon when valid input
   */
  showCheckMark: PT.bool
}

export default hoc(TextInput)
