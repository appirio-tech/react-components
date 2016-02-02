'use strict'

Checkbox = require './Checkbox.cjsx'
React    = require 'react'

CheckboxExamples = ->
  <div className="CheckboxExamples flex column middle center">
    <h1>Default</h1>

    <Checkbox />

    <h1>Checked is true with label</h1>

    <Checkbox checked={true} label="show me the money" />

  </div>

module.exports = CheckboxExamples
