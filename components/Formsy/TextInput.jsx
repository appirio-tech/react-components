import React, { Component } from 'react'
import PT from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

import HelpIcon from '../HelpIcon/HelpIcon'

import styles from './TextInput.scss'

class TextInput extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }

  render() {
    const { label, name, type, minValue, maxValue, placeholder, wrapperClass, maxLength, theme,
      labelHelpTooltip, readonly, readonlyValueTooltip } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const wrapperClasses = classNames(wrapperClass, theme, { [styles['readonly-wrapper']]: readonly })
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
          type={type}
          placeholder={placeholder}
          value={this.props.getValue()}
          disabled={disabled}
          onChange={this.changeValue}
          maxLength={maxLength}
          min={minValue}
          max={maxValue}
        />
        {readonly && (
          <div styleName="readonly-value">
            {this.props.getValue()}
            {readonlyValueTooltip && <HelpIcon tooltip={readonlyValueTooltip} />}
          </div>
        )}
        { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}

TextInput.defaultProps = {
  onChange: () => {}
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
  readonlyValueTooltip: PT.node
}

export default hoc(TextInput)
