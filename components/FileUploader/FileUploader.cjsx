'use strict'

require './FileUploaderStyles'

React                  = require 'react'
UploadedFilesContainer = require '../UploadedFiles/UploadedFilesContainer'
Dropzone               = require 'react-dropzone'
Loader                 = require '../Loader/Loader.cjsx'
classNames             = require 'classnames'

FileUploader = ({ multiple, onChange, loading, dragAndDrop }) ->
  dzContainerClassNames = classNames
    'dropzone-container': true
    'drag-and-drop': dragAndDrop

  <div className="FileUploader">
    {
      if loading
        <Loader />
    }
    <UploadedFilesContainer/>

    <div className={ dzContainerClassNames }>
      <Dropzone multiple={multiple} onDrop={onChange} className="Dropzone">
        {
          if dragAndDrop
            <p>click or drag files here to upload</p>
          else
            <button>choose files to upload</button>
        }
      </Dropzone>
    </div>
  </div>

module.exports = FileUploader


