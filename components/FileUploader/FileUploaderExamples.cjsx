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

    <h1>disabled is true with drag</h1>

    <FileUploader id={'123'} assetType={'work'} category={'development'} disableClick={true} dragAndDrop={true}/>

    <h1>disabled is true with button</h1>

    <FileUploader id={'123'} assetType={'work'} category={'development'} disableClick={true}/>
  </div>

module.exports = FileUploaderExamples
