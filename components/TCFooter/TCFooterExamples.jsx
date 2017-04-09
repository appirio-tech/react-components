'use strict'


import TCFooter from './TCFooter'
import React from 'react'

const TCFooterExamples = () => (
  <div className="TCFooterExamples flex column middle center light-bg">
    <TCFooter domain={`${process.env.domain}`} />
  </div>
)

module.exports = TCFooterExamples
