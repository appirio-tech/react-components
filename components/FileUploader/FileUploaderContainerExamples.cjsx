'use strict'

FileUploaderContainer = require './FileUploaderContainer'
React                 = require 'react'

FileUploaderContainerExamples = ->
  <div className="FileUploaderContainerExamples flex column middle center light-bg">
    <h1>Default</h1>

    <FileUploaderContainer/>
  </div>

module.exports = FileUploaderContainerExamples
