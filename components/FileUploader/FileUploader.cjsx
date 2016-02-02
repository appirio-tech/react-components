'use strict'

require './FileUploaderStyles'

React                  = require 'react'
UploadedFilesContainer = require '../UploadedFiles/UploadedFilesContainer'
Dropzone               = require 'react-dropzone'
Loader                 = require '../Loader/Loader.cjsx'

FileUploader = ({ multiple, onChange, loading}) ->
  <div className="FileUploader">
    {
      if loading
        <Loader />
    }
    <UploadedFilesContainer/>

    <div className="dropzone-container">
      <Dropzone multiple={multiple} onDrop={onChange} className="Dropzone">
        <button>Choose files to upload.</button>
      </Dropzone>
    </div>
  </div>

module.exports = FileUploader


