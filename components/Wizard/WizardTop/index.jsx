import React from 'react'
import { ViewTypes } from '../Wizard'
import ConnectLogo from '../../Icons/ConnectLogoWhite'
import IconMan from '../../Icons/IconMan'
import IconDown from '../../Icons/IconTcCarretDown'

require('./style.scss')

const WizardTop = ({ type, vm }) => {
  const bannerRegist = require('../Assets/hero-register-01@2x.jpg')
  const bannerPin = require('../Assets/hero-register-02@2x.jpg')
  const bannerWelcome = require('../Assets/hero-register-03@2x.jpg')
  let logo = bannerRegist // type == ViewTypes.register
  if (type === ViewTypes.pin) {
    logo = bannerPin
  } else if (type === ViewTypes.welcome) {
    logo = bannerWelcome
  }
  return (
    <div className="WizardTop flex column">
        <img className="top-img" src={logo}/>
        {
          (type !== ViewTypes.welcome) ? (
            <div className="top-login-button flex middle center">
              <span className="text">Already have an account?</span>
              <a className="tc-btn tc-btn-sm tc-btn-default" onClick={vm.goToLogin} >Log in</a>
            </div>
          ) : (
            <div className="top-login-button flex middle center">
              <span className="text">Hello, <b>Victor Tian</b></span>
              <div className="avatar">
                <IconMan />
              </div>
              <IconDown width={20} height={12} fill="#fff" wrapperClass="arrow" />
            </div>
          )
        }
        
        <ConnectLogo fill="#FFFFFF" wrapperClass="top-logo with-text" title="CONNECT" />
        <ConnectLogo fill="#FFFFFF" wrapperClass="top-logo no-text" />
        
    </div>
  )
}

export default WizardTop
