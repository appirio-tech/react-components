import React from 'react'

require('./style.scss')

const WizardMiddle = ({ children }) => {
  return (
    <div className="WizardMiddle">
      {children}
    </div>
  )
}

export default WizardMiddle
