import React from 'react'
import Wizard, {ViewTypes} from './Wizard.jsx'

require('./WizardExamples.scss')

const WizardExamples = () => (
  <div className="WizardExamples flex column middle">
    <Wizard type={ViewTypes.register}/>
    <div className="space"/>
    <Wizard type={ViewTypes.pin}/>
    <div className="space"/>
    <Wizard type={ViewTypes.welcome}/>
  </div>
)

export default WizardExamples
