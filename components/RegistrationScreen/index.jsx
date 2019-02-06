import React, {Component} from 'react'
import Formsy from 'formsy-react'
import TextInput from '../Formsy/TextInput'
import PhoneInput from '../Formsy/PhoneInput'
import PasswordInput from '../Formsy/PasswordInput'
import TiledRadioGroup from '../Formsy/TiledRadioGroup'
import Checkbox from '../Formsy/Checkbox'
import CheckRadioIcon from './CheckRadioIcon'
import Loader from '../Loader/Loader'

require('./style.scss')

const optsCompanySize = [
  {
    title: '1-15',
    value: '1-15',
    desc: null
  },
  {
    title: '16-50',
    value: '16-50',
    desc: null
  },
  {
    title: '51-500',
    value: '51-500',
    desc: null
  },
  {
    title: '500+',
    value: '500+',
    desc: null
  }
]

class RegistrationScreen extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.reRender = this.reRender.bind(this)
    this.isValidForm = this.isValidForm.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.state = {
      update: true,
      canSubmit: false,
      country: null
    }
    props.vm.reRender = this.reRender
  }

  reRender() {
    this.setState({update: true})
  }

  onChangeCountry({country}) {
    const {vm} = this.props

    if (!country || !country.code) {
      vm.phoneErrorMessage = 'Please enter a valid phone number.'
      this.reRender()
    } else {
      vm.phoneErrorMessage = null
      this.setState({update: true, country})
    }
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
    const {vm} = this.props
    const {canSubmit} = this.state
    return !vm.loading && canSubmit && !vm.usernameErrorMessage && !vm.emailErrorMessage && !vm.phoneErrorMessage && this.state.country
  }

  submit(form) {
    const {vm} = this.props
    const {country} = this.state
    const fullName = form.name
    vm.phone = form.phone
    vm.title = form.title
    vm.companyName = form.companyName
    vm.companySize = form.companySize
    vm.username = form.username
    vm.password = form.password
    vm.email = form.email
    vm.country = country
    vm.firstName = fullName.trim().split(' ').slice(0, -1).join(' ')
    vm.lastName = fullName.trim().split(' ').slice(-1).join(' ')
    
    vm.submit()

  }

  render() {
    const {vm} = this.props
    let preFillName = vm.firstName ? vm.firstName : null
    preFillName = vm.lastName ? `${preFillName} ${vm.lastName}` : preFillName
    const preFillEmail = vm.email ? vm.email : null
    return (
      <div className="RegistrationScreen flex column middle center">
        <div className="container flex column middle center">
          <div className="title">Let's start with introductions</div>
          <div className="sub-title">First we need to know you a bit better</div>
            {vm.errorMessage && (<div className="server-error-message">{vm.errorMessage}</div>)}
          <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form flex column middle center">
            <TextInput
              wrapperClass={'input-container'}
              label="First and last name"
              type="text"
              name="name"
              validationError="Please enter name"
              required
              showCheckMark
              value={preFillName}
            />
            <TextInput
              wrapperClass={'input-container'}
              label="Business email"
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
              wrapperClass={'input-container'}
              label="Business phone (include the country code)"
              type="phone"
              name="phone"
              validationError="Invalid business phone"
              required
              listCountry={vm.countries}
              forceErrorMessage={vm.phoneErrorMessage}
              onChangeCountry={this.onChangeCountry}
              showCheckMark
            />
            <TextInput
              wrapperClass={'input-container'}
              label="Your title"
              type="text"
              name="title"
              validationError="Please enter title"
              required
              showCheckMark
            />
            <TextInput
              wrapperClass={'input-container'}
              label="Company name"
              type="text"
              name="companyName"
              validationError="Please enter company name"
              required
              showCheckMark
            />
            <TiledRadioGroup
              wrapperClass={'input-container'}
              label="Company size"
              name="companySize"
              options={optsCompanySize}
              value={optsCompanySize[0].value}
              showCheckMarkBeforeTitle
              checkMarkActiveIcon={(<CheckRadioIcon active />)}
              checkMarkUnActiveIcon={(<CheckRadioIcon active={false} />)}
            />
            <div className="space" />
            <TextInput
              wrapperClass={'input-container'}
              label="Create a username (5–15 characters, A–Z, 0–9)"
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
            { !vm.ssoUser && <PasswordInput
              wrapperClass={'input-container'}
              label="Create a password (8–64 characters, A–Z, 0–9, . _ - ! ? allowed)"
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
              label="I agree to receive other communications from Topcoder."
              name="agreeTerm"
              required
            />
            <div className="space" />
            <button type="submit" className="tc-btn tc-btn-sm tc-btn-primary flex middle center"  disabled={vm.loading || !this.state.canSubmit || !this.state.country}>Continue</button>
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
