'use strict'

React    = require 'react'
ImageViewerContainer = require './ImageViewerContainer.coffee'

ImageViewerExamples = ->

  files = [
    name: 'flower 1'
    url: require('./flower.png')
  ,
    name: 'phone 2'
    url: require('./phone.jpg')
  ,
    name: 'turtles 3'
    url: require('./turtles-breaking.jpg')
  ]


  <div className="ImageViewerExamples">
    <h1>With Files (Required)</h1>
    <div className="imageViewer">
      <ImageViewerContainer files={files}, initialFile={files[1]}/>
    </div>
  </div>

module.exports = ImageViewerExamples