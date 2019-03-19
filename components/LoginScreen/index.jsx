import React, {Component, PropTypes} from 'react'
import Formsy from 'formsy-react'
import TextInput from '../Formsy/TextInput'
import PasswordInput from '../Formsy/PasswordInput'
import ConnectLogo from '../Icons/ConnectLogoWhite'
import Loader from '../Loader/Loader'

require('./style.scss')
class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.reRender = this.reRender.bind(this)
    this.getErrorMessageForUsername = this.getErrorMessageForUsername.bind(this)
    this.getErrorMessageForPassword = this.getErrorMessageForPassword.bind(this)
    this.state = {
      update: true,
      canSubmit: false
    }
    props.vm.reRender = this.reRender
  }

  reRender() {
    this.setState({update: true})
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

  submit(form) {
    const {vm} = this.props
    vm.username = form.username
    vm.password = form.password
    vm.submit()
  }

  getErrorMessageForPassword() {
    const {vm} = this.props
    if (vm && vm.loginErrors && vm.loginErrors.WRONG_PASSWORD) {
      return 'That password is incorrect. Please check that you entered the right one.'
    }
    return null
  }

  getErrorMessageForUsername() {
    const {vm} = this.props
    if (vm && vm.loginErrors && vm.loginErrors.USERNAME_NONEXISTANT) {
      return 'We couldn\'t find a member with that "username". Please check that you entered it correctly.'
    } else if (vm && vm.loginErrors && vm.loginErrors.ACCOUNT_INACTIVE) {
      return 'Your account is inactive, please contact support for activating it.'
    }
    return null
  }

  render() {
    const {vm} = this.props

    return (
      <div className="LoginScreen flex column middle center tc-ui">
        <div className="top-login-button flex middle center wrap">
          <span className="text">Don’t have an account?</span>
          <a className="tc-btn tc-btn-sm tc-btn-default flex center middle" href={vm.registrationUrl} >Register for free</a>
        </div>
        <ConnectLogo fill="#47474F" wrapperClass="top-logo with-text" title=" CONNECT" />
        <ConnectLogo fill="#47474F" wrapperClass="top-logo no-text" />
        <div className="container flex column middle center">
          <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form flex column middle center">
            <div className="title">Log in to Topcoder</div>
            {vm.loading && (<Loader />)}
            {vm.passwordReset && (<div className="confirmation-block confirmation-block-md ng-scope">Your password has been updated. Please log in.</div>)}
            <TextInput
              wrapperClass={'input-container'}
              label="Username or email"
              type="text"
              name="username"
              validationErrors={{
                isDefaultRequiredValue: 'Please enter name'
              }}
              forceErrorMessage={this.getErrorMessageForUsername()}
              required
            />
            <PasswordInput
              wrapperClass={'input-container'}
              label="Password"
              type="password"
              name="password"
              validationError="Please enter password"
              forceErrorMessage={this.getErrorMessageForPassword()}
              required
            />
            <a href={vm.forgotPasswordUrl} className="bottom-link">Forgot your password?</a>
            <button type="submit" className="tc-btn tc-btn-sm tc-btn-primary flex middle center" disabled={vm.loading || !this.state.canSubmit}>Log in</button>

            { vm.ssoLoginUrl && (
              <a className="sso-link" href={vm.ssoLoginUrl}>
                <span>Single Sign On</span>
              </a>)
            }
          </Formsy.Form>
          <p className="copyright">© Topcoder 2018</p>
        </div>
      </div>
    )
  }
}

LoginScreen.defaultProps = {
  vm: {}
}

LoginScreen.propTypes = {
  vm: PropTypes.any
}

export default LoginScreen
