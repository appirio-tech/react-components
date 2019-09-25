import React from 'react'
import Formsy from 'formsy-react'
import TextInput from '../Formsy/TextInput'
import Loader from '../Loader/Loader'

require('./style.scss')


class PinVerificationScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      canSubmitPin: false,
      canSubmitEmail: false,
      update: false
    }

    this.handleSubmitPin = this.handleSubmitPin.bind(this)
    this.enableButtonPin = this.enableButtonPin.bind(this)
    this.disableButtonPin = this.disableButtonPin.bind(this)

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this)
    this.enableButtonEmail = this.enableButtonEmail.bind(this)
    this.disableButtonEmail = this.disableButtonEmail.bind(this)

    this.openEmailForm = this.openEmailForm.bind(this)
    this.closeEmailForm = this.closeEmailForm.bind(this)

    this.sendNewPinClicked = this.sendNewPinClicked.bind(this)
    this.reRender = this.reRender.bind(this)
    this.canSubmitEmail = this.canSubmitEmail.bind(this)

    this.onChangeEmail = this.onChangeEmail.bind(this)

    props.vm.reRender = this.reRender
  }

  reRender() {
    this.setState({update: true})
  }

  sendNewPinClicked(event) {
    event.preventDefault()
    const {vm} = this.props
    vm.callResendPIN()
  }

  openEmailForm() {
    const {vm} = this.props
    vm.toggleEmailEdit()
  }

  closeEmailForm() {
    const {vm} = this.props
    vm.toggleEmailEdit()
  }

  enableButtonPin() {
    this.setState({
      canSubmitPin: true
    })
  }

  disableButtonPin() {
    this.setState({
      canSubmitPin: false
    })
  }

  onChangeEmail(key, newEmail) {
    const {vm} = this.props
    vm.email = newEmail
    console.log('newEmail', newEmail)
    console.log('vm.email', vm.email)
  }

  handleSubmitEmail() {
    const {vm} = this.props
    console.log('handleSubmitEmail vm.email', vm.email)
    vm.updateEmailAndResendPIN()
  }

  enableButtonEmail() {
    this.setState({
      canSubmitEmail: true
    })
  }

  disableButtonEmail() {
    this.setState({
      canSubmitEmail: false
    })
  }

  canSubmitEmail() {
    const {vm} = this.props
    return this.state.canSubmitEmail && !vm.loading && !vm.isEmailInvalid
  }

  handleSubmitPin({pin}) {
    const {vm} = this.props
    vm.pin = pin
    vm.submit()
  }

  render() {
    const {vm} = this.props
    return (
      <div className="PinVerificationScreen flex column middle center">
        <div className="container flex column middle center">
          <div className="title">Make sure you can hear us</div>
          <div className="sub-title">Because communication is very important</div>
            { vm.emailEditSuccess && (<div className="confirmation-block">Your email was updated, and we’ve sent you a new PIN. Please enter it below.</div>)}
            { vm.resendPinSuccess && (<div className="confirmation-block">We’ve sent you a new PIN. Please enter it below.</div>)}
          {vm.emailEditMode ? (
            <div className="description">
              If you don’t see an email from us right away, wait for a few minutes or check your spam folder. If you don’t receive a message or need help with your account, please contact <a href="mailto:support@topcoder.com">support@topcoder.com</a>.<a href="mailto:support@connect.com"></a>
            </div>
          ) : (<div className="description">
            We've sent a 1-time PIN to your email. Check your inbox and enter the PIN provided. If its been a few minutes and you have not received your PIN, check your spam folder first and then request a new PIN be sent if not found.
          </div>)}

          <div className="form-container flex column middle center">

            <label className="tc-label">
              {vm.emailEditMode ? 'Please enter the new email:' : 'We sent the security PIN to:'}
            </label>
            <Formsy.Form className="form flex column center" onValidSubmit={this.handleSubmitEmail} onValid={this.enableButtonEmail} onInvalid={this.disableButtonEmail}>

              {vm.emailEditMode ? (
                <div className="verify-email-form verify-email flex column center">
                  <TextInput
                    wrapperClass={'input-container-email'}
                    type="text"
                    name="email"
                    validations="isEmail"
                    validationError="Please enter valid email."
                    required
                    value={vm.email}
                    onChange={this.onChangeEmail}
                    forceErrorMessage={vm.emailErrorMessage || vm.message}
                    validator={vm.emailIsAvailable}
                  />
                  <div className="bottom-button-mail flex column middle center">
                    <button type="submit" className="tc-btn tc-btn-sm tc-btn-primary flex middle center" disabled={!this.canSubmitEmail()}>Update email and send a new PIN</button>
                    <button onClick={this.closeEmailForm} className="tc-btn tc-btn-sm tc-btn-secondary flex middle center" >Cancel</button>
                  </div>
                </div>) : (
                  <div className="verify-email flex column center">{vm.email}
                    <a onClick={this.openEmailForm}>change email</a>
                  </div>
                )}

            </Formsy.Form>
            {!vm.emailEditMode&& (
              <Formsy.Form className="form flex column center" onValidSubmit={this.handleSubmitPin} onValid={this.enableButtonPin} onInvalid={this.disableButtonPin}>
                <div className="verify-pin ">Security PIN:
                  <TextInput
                    wrapperClass={'input-container'}
                    type="text"
                    name="pin"
                    forceErrorMessage={vm.message}
                    validationError="Please enter PIN number."
                    required
                  />
                </div>
                <div className="pin-case-sensitive-message">* PIN is case-sensitive</div>
                <div className="bottom-button flex middle center">
                  <button onClick={this.sendNewPinClicked} className="tc-btn tc-btn-sm tc-btn-default flex middle center" >Send a new PIN</button>
                  <button type="submit" className="verify-pin-btn tc-btn tc-btn-sm tc-btn-primary flex middle center" disabled={!this.state.canSubmitPin}>Verify PIN</button>
                </div>
              </Formsy.Form>)}
          </div>
        </div>
        {vm.loading && (<Loader />)}
      </div>
    )
  }
}

export default PinVerificationScreen
