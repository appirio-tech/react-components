import React, { Component } from 'react'
import PT from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

import HelpIcon from '../HelpIcon/HelpIcon'
import Dropdown from '../Dropdown/Dropdown'
import IconDown from '../Icons/IconTcCarretDown'
import IconUICheckSimple from '../Icons/IconUICheckSimple'

import styles from './PhoneInput.scss'
import { AsYouType } from 'libphonenumber-js'

class PhoneInput extends Component {

  constructor(props) {
    super(props)
    
    this.changeValue = this.changeValue.bind(this)
    this.choseCountry = this.choseCountry.bind(this)
    this.isValidInput= this.isValidInput.bind(this)
    this.state = {
      currentCountry: {},
      asYouType: {}
    }
  }

  isValidInput() {
    const value = this.props.getValue()
    const hasError = !this.props.isPristine() && !this.props.isValid()
    return (!this.props.forceErrorMessage && value && !hasError && this.state.currentCountry.code)
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    let currentCountry
    const asYouType = new AsYouType()
    asYouType.input(value)
    if (asYouType.country) {
      currentCountry = _.filter(this.props.listCountry, {alpha2: asYouType.country})[0]
      if (currentCountry) {
        this.setState({asYouType, currentCountry})
      }
    }

    this.props.onChange(this.props.name, value)
    this.props.onChangeCountry({
      phone: value,
      country: currentCountry || {}
    })
  }

  choseCountry(country) {
    if (country.code !== this.state.currentCountry.code) {
      const asYouTypeTmp = new AsYouType(country.alpha2)
      const {asYouType} = this.state
      let phoneNumber = ''
      if (asYouType && asYouType.getNationalNumber) {
        phoneNumber = ` ${asYouType.getNationalNumber()}`
      }

      if (asYouTypeTmp.countryCallingCode) {
        this.setState({currentCountry: country})
        this.changeValue({target: { value: `+${asYouTypeTmp.countryCallingCode}${phoneNumber}` }})
      }
    }
  }

  render() {
    const { label, name, type, minValue, maxValue, placeholder, wrapperClass, maxLength, theme,
      labelHelpTooltip, readonly, readonlyValueTooltip, showCheckMark } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const wrapperClasses = classNames(wrapperClass, theme, {
      [styles['readonly-wrapper']]: readonly,
      'phone-input-container': true
    })
    const classes = classNames('tc-file-field__inputs', {error: hasError}, {empty: this.props.getValue() === ''})
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div className={wrapperClasses}>
        <label className="tc-label">
          {label}
          {labelHelpTooltip && <HelpIcon tooltip={labelHelpTooltip} />}
        </label>
        <div className="input-container">
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
          <Dropdown pointerShadow>
              <div className="dropdown-menu-header flex center middle">{this.state.currentCountry ? this.state.currentCountry.alpha3 : ''}
              <IconDown width={20} height={12} fill="#fff" wrapperClass="arrow" /></div>
              <ul className="dropdown-menu-list">
                {
                  this.props.listCountry.map((country, i) => {
                    /* eslint-disable react/jsx-no-bind */
                    return <li className={(this.state.currentCountry.code === country.code) ? 'selected' : ''} onClick={() => this.choseCountry(country)} key={i}><a href="javascript:;">{country.name}</a></li>
                  })
                }
              </ul>
            </Dropdown>
        </div>
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

PhoneInput.defaultProps = {
  onChange: () => {},
  forceErrorMessage: null,
  listCountry: [],
  showCheckMark: false
}

PhoneInput.propTypes = {
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
   * country list
   */
  listCountry: PT.array,

  /**
   * event when change phone
   */
  onChangeCountry: PT.func,

  /**
   * should show check mark icon when valid input
   */
  showCheckMark: PT.bool

}

export default hoc(PhoneInput)
