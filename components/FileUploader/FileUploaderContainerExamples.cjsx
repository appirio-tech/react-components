'use strict'

FileUploaderContainer = require './FileUploaderContainer'
React                 = require 'react'

FileUploaderContainerExamples = ->
  <div className="FileUploaderContainerExamples flex column middle center light-bg">
    <h1>Default</h1>

    <FileUploaderContainer/>

    <h1>disableClick is true</h1>

    <FileUploaderContainer disableClick={true}/>

    <h1>disableClick and dragAndDrop is true</h1>

    <FileUploaderContainer disableClick={true} dragAndDrop={true}/>
  </div>

module.exports = FileUploaderContainerExamples
