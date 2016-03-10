'use strict'

require('./QuickLinksExample.scss')
const QuickLinks = require('./QuickLinks.jsx')
const React    = require('react')

const QuickLinksExample = {
  render() {
    return (
      <div className="example-wrap">
        <QuickLinks />
      </div>
    )
  }
}

module.exports = React.createClass(QuickLinksExample)
