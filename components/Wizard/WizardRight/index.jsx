import React from 'react'
import { ViewTypes } from '../Wizard'
import IconMan from '../../Icons/IconMan'
import IconDown from '../../Icons/IconTcCarretDown'

require('./style.scss')

const WizardRight = ({ type, vm }) => {
  const bannerRegist = require('../Assets/hero-register-01@2x.jpg')
  const bannerPin = require('../Assets/hero-register-02@2x.jpg')
  const bannerWelcome = require('../Assets/hero-register-03@2x.jpg')
  let logo = bannerRegist // type == ViewTypes.register
  if (type === ViewTypes.pin) {
    logo = bannerPin
  } else if (type === ViewTypes.welcome) {
    logo = bannerWelcome
  }
  const icons = [
    require('../Assets/customerLogo/harvard_logo.png'),
    require('../Assets/customerLogo/ebay_logo.png'),
    require('../Assets/customerLogo/ge_logo.png'),
    require('../Assets/customerLogo/wipro_logo.png'),
    require('../Assets/customerLogo/softbank_logo.png'),
    require('../Assets/customerLogo/land_o_lakes_logo.png'),
    require('../Assets/customerLogo/Ibm_logo.png'),
    require('../Assets/customerLogo/honeywell_logo.png')
  ]
  return (
    <div className="WizardRight flex column">
        {
          (type !== ViewTypes.welcome) ? (
            <div className="top-login-button flex middle end">
              <span className="text">Already have an account?</span>
              <a className="tc-btn tc-btn-sm tc-btn-default flex center middle" onClick={vm.goToLogin} >Log in</a>
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
        {
          (type === ViewTypes.register) ? (
            <img className="top-img" src={logo}/>
          ) : (
            <img className="top-img-full" src={logo}/>
          )
        }
        
        {(type === ViewTypes.register) && (
          <div className="bottom-container flex column middle">
            <div className="trusted-text flex middle center" >TRUSTED BY</div>
            <div className="bottom-icon flex wrap">
            {
              icons.map((icon, i) => {
                return (
                  <a key={`key-${i}`} className="icon-link flex middle center" href={vm.custommerStoriesUrl}>
                    <img href="" width="100" height="50" className="logo-banner" src={icon}/>
                  </a>)
              })
            }
            </div>
            <a className="bottom-link" href={vm.custommerStoriesUrl}>Discover how we can help your organization</a>
          </div>)}
        
    </div>
  )
}

export default WizardRight
