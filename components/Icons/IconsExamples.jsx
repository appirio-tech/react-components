import React from 'react'
import CloseIcon from './CloseIcon'
import ConnectLogoWhite from './ConnectLogoWhite'
require('./IconsExamples.scss')

const IconsExamples = () => (
  <div className="flex column middle center light-bg">
    <h1>CloseIcon</h1>

    <span className="icon-container flex center middle">
      <CloseIcon/>
    </span>


    <h1>ConnectLogoWhite</h1>

    <span className="icon-container flex center middle">
      <ConnectLogoWhite/>
    </span>
  </div>
)

module.exports = IconsExamples
