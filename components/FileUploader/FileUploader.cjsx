'use strict'

require './FileUploaderStyles'

React                  = require 'react'
UploadedFilesContainer = require '../UploadedFiles/UploadedFilesContainer'
Dropzone               = require 'react-dropzone'
Loader                 = require '../Loader/Loader.cjsx'
classNames             = require 'classnames'

FileUploader = ({ multiple, onChange, loading, dragAndDrop, disableClick }) ->
  dzContainerClassNames = classNames
    'dropzone-container': true
    'drag-and-drop': dragAndDrop

  <div className="FileUploader">
    {
      if loading
        <Loader />
    }
    <UploadedFilesContainer disabled={disableClick} />

    <div className={ dzContainerClassNames }>
      <Dropzone multiple={multiple} onDrop={onChange} className="Dropzone" disableClick={disableClick}>
        {
          if dragAndDrop && !disableClick
            <p>click or drag files here to upload</p>
          else if dragAndDrop && disableClick
            <p>file upload disabled</p>
          else if !dragAndDrop
            if disableClick
              <button disabled>choose files to upload</button>
            else
              <button>choose files to upload</button>
        }
      </Dropzone>
    </div>
  </div>

module.exports = FileUploader


