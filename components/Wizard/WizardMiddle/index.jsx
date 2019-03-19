import React from 'react'

require('./style.scss')

const WizardMiddle = ({ children, vm }) => {
  return (
    <div className={'WizardMiddle ' + (vm.hideLeftProgress ? 'hide-left-progress' : '')}>
      {children}
    </div>
  )
}

export default WizardMiddle
