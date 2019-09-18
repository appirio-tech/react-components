import React from 'react'
import cn from 'classnames'

require('./style.scss')
import { ViewTypes } from '../Wizard'
import ConnectLogo from '../../Icons/ConnectLogoWhite'

const WizardLeft = ({type, vm}) => {
  const step1ContainerClass = cn({
    selected: (type === ViewTypes.register),
    'bottom-line': true, step1: true,
    step: true, flex: true, middle: true, center: true
  })
  const step2ContainerClass = cn({
    selected: (type === ViewTypes.pin),
    'bottom-line': true, step2: true,
    step: true, flex: true, middle: true, center: true
  })
  const step3ContainerClass = cn({
    selected: (type === ViewTypes.welcome),
    step3: true,
    step: true, flex: true, middle: true, center: true
  })
  return (
    <div className={'WizardLeft ' + (vm.hideLeftProgress ? 'hide-left-progress' : '')}>
      <div className="logo flex column middle center">
        <ConnectLogo fill="#47474F" wrapperClass="top-logo with-text" title="CONNECT" />
      </div>
      {!vm.hideLeftProgress && (<div className="title">
        REGISTRATION
      </div>)}
      {!vm.hideLeftProgress && (<div className="step-container">
        <div className={step1ContainerClass}>
          <div className="number">1</div>
          <div className="name">Profile</div>
        </div>
        <div className={step2ContainerClass}>
          <div className="number">2</div>
          <div className="name">Validation</div>
        </div>
        <div className={step3ContainerClass}>
          <div className="number">3</div>
          <div className="name">Registered</div>
        </div>
      </div>)}
      <div className="bottom">
      © 2018 Topcoder. All Rights Reserved
      </div>
    </div>
  )
}

export default WizardLeft
