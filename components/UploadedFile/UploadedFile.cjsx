'use strict'

require './UploadedFileStyles'

React      = require 'react'
classnames = require 'classnames'

UploadedFile = ({ status, preview, progress, fileName, enableCaptions, captions, onDelete }) ->
  <div className="UploadedFile">
    <main className="flex column middle center" >
      {
        if status == 'failed'
          <div className="failed flex column center">
            <img className="icon" src={require './icon-alert-red.svg'}/>

            <button className="clean" onClick="" type="button">
              retry
            </button>
          </div>
        else
          if preview
            <div className="preview" style={backgroundImage: "url(#{preview})"} />
          else
            <img className="document-icon" src={require './icon-document.svg'} />
      }
      {
        if status == 'uploading'
          <div className="progress">
            <progress value={progress} max="100">
              {progress}%
            </progress>
          </div>
      }
    </main>

    <div className="file-name flex space-between">
      <p className="file-name">{ fileName }</p>
      {
        unless status == 'uploading'
          <button className="clean" type="button" onClick={onDelete}>
            <div className="icon cross"/>
          </button>
      }
    </div>

    {
      if enableCaptions
        <textarea placeholder="enter a caption" value={captions} />
    }
  </div>

module.exports = UploadedFile

