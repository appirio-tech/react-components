'use strict'

UploadedFile = require './UploadedFile'
React        = require 'react'
preview     = 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'

UploadedFileExamples = ->
  <div className="UploadedFileExamples flex column middle center light-bg">
    <h1>Default</h1>

    <UploadedFile />

    <h1>File failed to upload</h1>

    <UploadedFile status="failed" fileName="crochet-turtle.jpg" progress="50" />

    <h1>File with image src is uploading at 50 progress</h1>

    <UploadedFile
      status="uploading"
      fileName="crochet-turtle.jpg"
      progress="50"
      preview={preview}
      />

    <h1>File is uploading at 50 progress</h1>

    <UploadedFile status="uploading" fileName="example.txt" progress="50" />

    <h1>Image was uploaded, enable captions</h1>

    <UploadedFile
      status="uploaded"
      fileName="crochet-turtle.jpg"
      enableCaptions={true}
      captions="I am a caption." />

    <h1>Non-Image was uploaded</h1>

    <UploadedFile status="uploaded" fileName="this is a very very very very very long na.txt" />
  </div>

module.exports = UploadedFileExamples
