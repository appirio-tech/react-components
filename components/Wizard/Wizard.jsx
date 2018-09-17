import React, {PropTypes} from 'react'
import WizardTop from './WizardTop'
import WizardLeft from './WizardLeft'
import WizardRight from './WizardRight'
import WizardMiddle from './WizardMiddle'
import WizardBottom from './WizardBottom'
import RegistrationScreen from '../RegistrationScreen'
import PinVerificationScreen from '../PinVerificationScreen'
import WelcomeScreen from '../WelcomeScreen'

require('./Wizard.scss')

/**
 * the view types
 */
export const ViewTypes = {
  register: 'register',
  pin: 'pin',
  welcome: 'welcome'
}

const Wizard = ({ type, vm }) => {
  return (
    <div className="Wizard tc-ui">
      <WizardTop type={type} vm={vm} />
      <WizardLeft type={type} />
      <WizardMiddle>
        {(type === ViewTypes.register) && (<RegistrationScreen vm={vm} />)}
        {(type === ViewTypes.pin) && (<PinVerificationScreen vm={vm} />)}
        {(type === ViewTypes.welcome) && (<WelcomeScreen vm={vm} />)}
      </WizardMiddle>
      <WizardRight type={type} vm={vm} />
      <WizardBottom />
    </div>
  )
}

Wizard.defaultProps = {
  type: ViewTypes.register,
  vm: {}
}

Wizard.propTypes = {
  type: PropTypes.oneOf(Object.values(ViewTypes)),
  vm: PropTypes.any
}

export default Wizard
