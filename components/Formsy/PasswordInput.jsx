import React, { Component } from 'react'
import PT from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

import HelpIcon from '../HelpIcon/HelpIcon'
import IconUICheckSimple from '../Icons/IconUICheckSimple'

import styles from './PasswordInput.scss'

class PasswordInput extends Component {

  constructor(props) {
    super(props)
    
    this.changeValue = this.changeValue.bind(this)
    this.toggleShowHide = this.toggleShowHide.bind(this)
    this.isValidInput= this.isValidInput.bind(this)
    this.onFocus= this.onFocus.bind(this)
    this.onBlur= this.onBlur.bind(this)
    this.state = {
      isShowPassword: false,
      type: 'password',
      isFocus: false
    }
  }

  onFocus() {
    this.setState({isFocus: true})
  }

  onBlur() {
    this.setState({isFocus: false})
  }

  isValidInput() {
    const value = this.props.getValue()
    const hasError = !this.props.isPristine() && !this.props.isValid()
    return (!this.props.forceErrorMessage && value && !hasError)
  }

  toggleShowHide() {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
      type: this.state.isShowPassword ? 'password' : 'text'
    })
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }

  render() {
    const { label, name, minValue, maxValue, placeholder, wrapperClass, maxLength, theme,
      labelHelpTooltip, readonly, readonlyValueTooltip, showCheckMark } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const wrapperClasses = classNames(wrapperClass, theme, {
      [styles['readonly-wrapper']]: readonly,
      'password-input-container': true,
      focus: this.state.isFocus
    })
    const classes = classNames('tc-file-field__inputs', {error: hasError}, {empty: this.props.getValue() === ''})
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div className={wrapperClasses}>
        <label className="tc-label">
          {label}
          {labelHelpTooltip && <HelpIcon tooltip={labelHelpTooltip} />}
        </label>
        <input
          name={name}
          className={classes}
          type={this.state.type}
          placeholder={placeholder}
          value={this.props.getValue()}
          disabled={disabled}
          onChange={this.changeValue}
          maxLength={maxLength}
          min={minValue}
          max={maxValue}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.isValidInput() && showCheckMark && (
          <IconUICheckSimple wrapperClass="check-success-icon" width={10} height={10} fill="#5CC900"/>
        )}
        <div onClick={this.toggleShowHide} className="show-hide-button flex center middle">
          {this.state.isShowPassword ? 'Hide' : 'Show'}
        </div>
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

PasswordInput.defaultProps = {
  onChange: () => {},
  forceErrorMessage: null,
  showCheckMark: false
}

PasswordInput.propTypes = {
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
   * should show check mark icon when valid input
   */
  showCheckMark: PT.bool

}

export default hoc(PasswordInput)
