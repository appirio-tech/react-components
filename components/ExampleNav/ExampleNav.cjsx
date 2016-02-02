'use strict'

require './ExampleNav.scss'

React      = require 'react'
classNames = require 'classnames'

{ Link } = require 'react-router'

component = ({data, state}) ->
  <ul className="ExampleNav">
    <li>
      <Link to="/">Avatar</Link>

      <Link to="/FileUploaderContainerExamples">FileUploaderContainer</Link>

      <Link to="/UploadedFileExamples">UploadedFile</Link>

      <Link to="/UploadedFilesExamples">UploadedFiles</Link>

      <Link to="/FileUploaderExamples">FileUploader</Link>

      <Link to="/CheckboxExamples">Checkbox</Link>

      <Link to="/ImageViewerHeaderExamples">ImageViewerHeader</Link>

      <Link to="/ImageViewerExamples">ImageViewer</Link>

      <Link to="/LoaderExamples">Loader</Link>
    </li>
  </ul>

module.exports = component