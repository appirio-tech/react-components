import React from 'react'

require('./style.scss')

const WizardLeft = () => {
  const logo = require('../Assets/connect-logo-mono.svg')
  return (
    <div className="WizardLeft">
      <div className="logo flex column middle center">
        <img src={logo}/>
      </div>
      <div className="title">
        CREATE A NEW PROJECT
      </div>
      <div className="step-container">
        <div className="selected bottom-line step flex middle center">
          <div className="selected number">1</div>
          <div className="name">Create account</div>
        </div>
        <div className="bottom-line step flex middle center">
          <div className="number">2</div>
          <div className="name">Select your solution</div>
        </div>
        <div className="bottom-line step flex middle center">
          <div className="number">3</div>
          <div className="name">Defined scope</div>
        </div>
        <div className="step flex middle center">
          <div className="number">4</div>
          <div className="name">Project sumitted</div>
        </div>
      </div>
      <div className="bottom">
      © 2018 Topcoder. All Rights Reserved
      </div>
    </div>
  )
}

export default WizardLeft
