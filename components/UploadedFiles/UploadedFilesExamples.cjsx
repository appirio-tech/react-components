'use strict'

UploadedFiles = require './UploadedFiles'
React         = require 'react'

UploadedFilesExamples = ->
  <div className="UploadedFilesExamples flex column middle center light-bg">
    <h1>Default</h1>

    <UploadedFiles />

    <h1>has 5 files</h1>

    <UploadedFiles files={[0..4]} />
  </div>

module.exports = UploadedFilesExamples
