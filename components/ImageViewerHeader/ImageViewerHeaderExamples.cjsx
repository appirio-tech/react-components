'use strict'

ImageViewerHeader = require './ImageViewerHeader.cjsx'
React    = require 'react'

ImageViewerHeaderExamples = ->
  alertMessage = ->
    alert('toggled comments')

  <div className="ImageViewerHeaderExamples">
    <h1>Default</h1>

    <ImageViewerHeader />

    <h1>With Params</h1>

    <ImageViewerHeader handle={'Batmannn'} downloadUrl={'http://google.com'} downloadAllowed={true} commentsAllowed={true} title={'Important Report'} toggleComments={alertMessage}/>

  </div>

module.exports = ImageViewerHeaderExamples