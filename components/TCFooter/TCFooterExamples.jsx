'use strict'


import TCFooter from './TCFooter'
import React from 'react'

const TCFooterExamples = ({domain}) => (
  <div className="TCFooterExamples flex column middle center light-bg">
    <TCFooter domain={domain} />
  </div>
)

TCFooterExamples.defaultProps = {
  domain: process.env.domain,
}

TCFooterExamples.propTypes = {
  domain: React.PropTypes.string
}

module.exports = TCFooterExamples
