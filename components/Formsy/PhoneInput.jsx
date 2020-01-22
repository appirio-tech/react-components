import React, { Component } from 'react'
import PT from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'
import _ from 'lodash'

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
    this.isValidInput = this.isValidInput.bind(this)
    this.onDocClick = this.onDocClick.bind(this)
    this.state = {
      currentCountry: {},
      asYouType: {}
    }
  }

  componentWillReceiveProps(newProps) {
    let stateUpdate
    // initialize currentCountry and asYouType states
    if (_.isEmpty(this.state.asYouType) && this.props.getValue()) {
      const { country: currentCountry, asYouType} = this.getCountryFromPhoneNumber(this.props.getValue())

      if (asYouType.country && currentCountry) {
        stateUpdate = { asYouType, currentCountry }
        this.setState(stateUpdate)
      }
    }

    // If a new country is forced externally, update the country code
    if (newProps.forceCountry && newProps.forceCountry !== this.props.forceCountry ) {
      const currentCountry = _.get(this.state, 'currentCountry.name') || _.get(stateUpdate, 'currentCountry.name')
      if (newProps.forceCountry !== currentCountry) {
        const country = _.find(this.props.listCountry, c => c.name === newProps.forceCountry)
        this.choseCountry(country, stateUpdate, true)
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocClick)
  }

  onDocClick(e) {
    if (!e.path.includes(this.refs.wrapper)) {
      this.props.onOutsideClick()
    }
  }

  isValidInput() {
    const value = this.props.getValue()
    const hasError = !this.props.isPristine() && !this.props.isValid()
    return (!this.props.forceErrorMessage && value && !hasError && this.state.currentCountry.code)
  }

  /**
   * Gets the country object and associated asYouType object for the given phone number
   * @param {string} phoneNumber The phone number
   */
  getCountryFromPhoneNumber(phoneNumber) {
    let country
    const asYouType = new AsYouType()
    asYouType.input(phoneNumber[0] === '+' ? phoneNumber : '+' + phoneNumber)
    if (asYouType.country) {
      country = _.filter(this.props.listCountry, { alpha2: asYouType.country })[0]
    }

    return {
      country,
      asYouType
    }
  }

  /**
   * checkPhone
   *
   * @param {String}        phone
   * @returns {Boolean}
   */
  checkPhone (phone)  {
    if (phone !== null && phone.trim().length !== 0) {
      const  REG = /^(\+)?(?:[0-9] ?){6,14}[0-9]$/
      if (REG.test(phone.trim())) {
        return true
      }
    }
    return false
  }

  changeValue(e, externalChange) {
    const value = e.target.value
    this.props.setValue(value)

    const { country: currentCountry, asYouType} = this.getCountryFromPhoneNumber(value)
    if (asYouType.country && currentCountry) {
      this.setState({ asYouType, currentCountry })
    }

    this.props.onChange(this.props.name, value)
    const isValid = this.checkPhone(value)
    this.props.onChangeCountry({
      phone: value,
      country: currentCountry || {},
      externalChange,
      isValid
    })
  }

  choseCountry(country, updatedState, externalChange) {
    if (country.code !== this.state.currentCountry.code) {
      const asYouTypeTmp = new AsYouType(country.alpha2)
      const { asYouType } = updatedState || this.state
      let phoneNumber = ''
      if (asYouType && asYouType.getNationalNumber) {
        phoneNumber = ` ${asYouType.getNationalNumber()}`
      }

      if (asYouTypeTmp.countryCallingCode) {
        this.setState({ currentCountry: country })
        this.changeValue({ target: { value: `+${asYouTypeTmp.countryCallingCode}${phoneNumber}` } }, externalChange)
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
    const classes = classNames('tc-file-field__inputs', { error: hasError }, { empty: this.props.getValue() === '' })
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div className={wrapperClasses} ref="wrapper">
        <label className="tc-label">
          {label}
          {labelHelpTooltip && <HelpIcon tooltip={labelHelpTooltip} />}
        </label>
        <div className="input-container">
          <Dropdown handleKeyboardNavigation pointerShadow>
            <div className="dropdown-menu-header flex center middle">{this.state.currentCountry && this.state.currentCountry.alpha3 ? this.state.currentCountry.alpha3 : 'Country code'}
              <IconDown width={20} height={12} fill="#fff" wrapperClass="arrow" /></div>
            <ul className="dropdown-menu-list">
              {
                this.props.listCountry.map((country, i) => {
                  /* eslint-disable react/jsx-no-bind */
                  return <li tabIndex="-1" className={(this.state.currentCountry.code === country.code) ? 'selected' : ''} onClick={() => this.choseCountry(country)} key={i}><a href="javascript:;">{country.name}</a></li>
                })
              }
            </ul>
          </Dropdown>
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
        </div>
        {this.isValidInput() && showCheckMark && (
          <IconUICheckSimple wrapperClass="check-success-icon" width={10} height={10} fill="#5CC900" />
        )}
        {readonly && (
          <div styleName="readonly-value">
            {this.props.getValue()}
            {readonlyValueTooltip && <HelpIcon tooltip={readonlyValueTooltip} />}
          </div>
        )}

        {hasError ? (<p className="error-message">{errorMessage}</p>) : (this.props.forceErrorMessage && (<p className="error-message">{this.props.forceErrorMessage}</p>))}
      </div>
    )
  }
}

PhoneInput.defaultProps = {
  onChange: () => { },
  onOutsideClick: () => { },
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
   * triggered when clicked outside
   */
  onOutsideClick: PT.func,

  /**
   * should show check mark icon when valid input
   */
  showCheckMark: PT.bool

}

export default hoc(PhoneInput)
