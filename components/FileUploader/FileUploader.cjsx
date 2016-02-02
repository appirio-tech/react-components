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

    <Dropzone multiple={multiple} onDrop={onChange} className="Dropzone">
      <p>click or drag files here to upload</p>
    </Dropzone>
  </div>

module.exports = FileUploader


