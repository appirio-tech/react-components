import React from 'react'
import Wizard, {ViewTypes} from './Wizard.jsx'
import ISOCountries from './iso-countries'

require('./WizardExamples.scss')

const vm = { countries: ISOCountries, submit: () => console.log(vm) }

const WizardExamples = () => (
  <div className="WizardExamples flex column middle">
    <Wizard type={ViewTypes.register} vm={vm}/>
    <div className="space"/>
    <Wizard type={ViewTypes.pin}/>
    <div className="space"/>
    <Wizard type={ViewTypes.welcome}/>
  </div>
)

export default WizardExamples
