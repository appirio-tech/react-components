import React, { Component } from 'react'
import Formsy from 'formsy-react'
import { find, orderBy } from 'lodash'
import cn from 'classnames'
import TextInput from '../Formsy/TextInput'
import PhoneInput from '../Formsy/PhoneInput'
import PasswordInput from '../Formsy/PasswordInput'
import FormsySelect from '../Formsy/FormsySelect'
import Checkbox from '../Formsy/Checkbox'
import Loader from '../Loader/Loader'

require('./style.scss')

class RegistrationScreen extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.reRender = this.reRender.bind(this)
    this.isValidForm = this.isValidForm.bind(this)
    this.onBusinessPhoneChange = this.onBusinessPhoneChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
    this.hideCountrySelectAlert = this.hideCountrySelectAlert.bind(this)
    this.hideBusinessPhoneAlert = this.hideBusinessPhoneAlert.bind(this)

    this.state = {
      update: true,
      canSubmit: false,
      countryList: null,
      country: null,
      countrySelectDirty: false,
      businessPhoneDirty: false
    }
    props.vm.reRender = this.reRender
  }

  componentDidMount() {
    if (this.props.vm && this.props.vm.countries) {
      this.setState({
        countryList: orderBy(this.props.vm.countries, ['name'], ['asc']).map(c => ({...c, label: c.name, value: c.name}))
      })
    }
  }

  hideCountrySelectAlert() {
    this.setState({
      countrySelectDirty: false
    })
  }

  hideBusinessPhoneAlert () {
    this.setState({
      businessPhoneDirty: false
    })
  }

  reRender() {
    this.setState({ update: true })
  }

  onBusinessPhoneChange({ country, externalChange }) {
    const { vm } = this.props
    const { country: previousSelectedCountry } = this.state

    if (!country || !country.code) {
      vm.phoneErrorMessage = 'Please enter a valid phone number.'
      this.reRender()
    } else {
      vm.phoneErrorMessage = null
      // When the business phone's country code changes, we should change the country selection also
      this.refs.countrySelect.setValue(country.name)
      this.setState({ update: true, country })
    }

    const countryName = country && country.name
    const previousCountryName = previousSelectedCountry && previousSelectedCountry.name
    const countryCodeChanged = countryName && previousCountryName && countryName !== previousCountryName
    if (!externalChange && countryCodeChanged) {
      this.setState({
        businessPhoneDirty: true
      })
    }
  }

  onCountryChange(value) {
    // when the country selection is changed, we have to change the country code of business phone
    if (!this.state.country || this.state.country.name !== value) {
      const country = find(this.props.vm.countries, c => c.name === value)

      if (country) {
        this.setState({
          country
        })
      }
    }

    this.setState({
      countrySelectDirty: true
    })
  }

  enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  isValidForm() {
    const { vm } = this.props
    const { canSubmit } = this.state
    return !vm.loading && canSubmit && !vm.usernameErrorMessage && !vm.emailErrorMessage && !vm.phoneErrorMessage && this.state.country
  }

  submit(form) {
    const { vm } = this.props
    vm.phone = form.phone
    vm.title = form.title
    vm.companyName = form.companyName
    vm.companySize = form.companySize
    vm.username = form.username
    vm.password = form.password
    vm.email = form.email
    vm.country = find(vm.countries, {name: form.country})
    vm.firstName = form.firstName
    vm.lastName = form.lastName

    vm.submit()

    this.setState({
      businessPhoneDirty: false,
      countrySelectDirty: false
    })
  }

  render() {
    const { vm } = this.props
    const { country, countryList, businessPhoneDirty, countrySelectDirty } = this.state
    const preFillFirstName = vm.firstName
    const preFillLastName = vm.lastName
    const preFillEmail = vm.email ? vm.email : null
    const renderRequired = (label) => <span><span>{label}</span>&nbsp;<sup className="requiredMarker">*</sup></span>
    return (
      <div className="RegistrationScreen flex column middle center">
        <div className="container flex column middle center">
          <div className="title">Let's start with introductions</div>
          <div className="sub-title">We're excited to meet you!</div>
          {vm.errorMessage && (<div className="server-error-message">{vm.errorMessage}</div>)}
          <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form flex column middle center">
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('First Name')}
              type="text"
              name="firstName"
              validationError="Please enter your first name"
              required
              showCheckMark
              value={preFillFirstName}
            />
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('Last Name')}
              type="text"
              name="lastName"
              validationError="Please enter your last name"
              required
              showCheckMark
              value={preFillLastName}
            />
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('Business email')}
              type="email"
              name="email"
              value={preFillEmail}
              disabled={!!preFillEmail}
              validations="isEmail"
              validationError="Invalid business email"
              required
              forceErrorMessage={vm.emailErrorMessage}
              validator={vm.emailIsAvailable}
              showCheckMark
            />
            <PhoneInput
              wrapperClass={cn('input-container', {'valid-phone': !vm.phoneErrorMessage})}
              label={renderRequired('Business phone (include the country code)')}
              type="phone"
              name="phone"
              value=""
              validationError="Invalid business phone"
              required
              listCountry={vm.countries}
              forceErrorMessage={vm.phoneErrorMessage}
              onChangeCountry={this.onBusinessPhoneChange}
              forceCountry={country && country.name}
              showCheckMark
              onOutsideClick={this.hideBusinessPhoneAlert}
            />
            { businessPhoneDirty && <div className="warningText">Note: Changing the country code also updates your country selection</div> }
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('Your title')}
              type="text"
              name="title"
              validationError="Please enter title"
              required
              showCheckMark
            />
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('Company name')}
              type="text"
              name="companyName"
              validationError="Please enter company name"
              required
              showCheckMark
            />
            <FormsySelect
              ref="countrySelect"
              wrapperClass={'input-container'}
              label={renderRequired('Country')}
              name="country"
              value=""
              options={countryList}
              onChange={this.onCountryChange}
              required
              placeholder="- Select country -"
              showDropdownIndicator
              setValueOnly
              onBlur={this.hideCountrySelectAlert}
            />
            {countrySelectDirty && <div className="warningText">Note: Changing the country also updates the country code of business phone.</div> }
            <div className="space" />
            <TextInput
              wrapperClass={'input-container'}
              label={renderRequired('Create a username (5–15 characters, A–Z, 0–9)')}
              type="text"
              name="username"
              validationErrors={{
                isDefaultRequiredValue: 'Please enter user name',
                minLength: '5–15 characters',
                maxLength: '5–15 characters',
                isAlphanumeric: 'Only contains letters or numbers'
              }}
              validations={{
                minLength: 5,
                maxLength: 15,
                isAlphanumeric: true
              }}
              required
              forceErrorMessage={vm.usernameErrorMessage}
              validator={vm.usernameIsFree}
              showCheckMark
            />
            {
              !vm.ssoUser &&
              <PasswordInput
                wrapperClass={'input-container'}
                label={renderRequired('Create a password (8–64 characters, A–Z, 0–9, . _ - ! ? allowed)')}
                name="password"
                validationErrors={{
                  isDefaultRequiredValue: 'Please enter password',
                  minLength: '8–64 characters',
                  maxLength: '8–64 characters',
                  matchRegexp: 'The password must contain at least one number or symbol and one character'

                }}
                validations={{
                  minLength: 8,
                  maxLength: 64,
                  matchRegexp: /^((?=.*[a-z])|(?=.*[A-Z]))((?=.*[0-9])|(?=.*[!@#\$%\^&\*]))/
                }}
                required
                showCheckMark
              />
            }
            <Checkbox
              wrapperClass={'input-container'}
              label="I do not want to receive marketing communications from Topcoder."
              name="agreeTerm"
            />
            <div className="space" />
            <button type="submit" className="tc-btn tc-btn-sm tc-btn-primary flex middle center" disabled={vm.loading || !this.state.canSubmit || !this.state.country}>Continue</button>
            <div className="by-clicking-continue">By clicking “Continue” you agree to our <a href={vm.termsUrl}>Terms</a> and <a href={vm.privacyUrl}>Privacy Policy</a>.
  We are never going to sell your data or send you spam messages. Your email is going to be used for communication purposes only.</div>
          </Formsy.Form>
        </div>
        {vm.loading && (<Loader />)}
      </div>
    )
  }
}

export default RegistrationScreen
