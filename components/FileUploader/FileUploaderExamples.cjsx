'use strict'

FileUploader = require './FileUploader'
React        = require 'react'

FileUploaderExamples = ->
  <div className="FileUploaderExamples flex column middle center light-bg">
    <h1>Default</h1>

    <FileUploader/>

    <h1>loading is true</h1>

    <FileUploader loading={true} id={'123'} assetType={'work'} category={'development'}/>

    <h1>dragNdrop is true</h1>

    <FileUploader id={'123'} assetType={'work'} category={'development'} dragAndDrop={true}/>
  </div>

module.exports = FileUploaderExamples
