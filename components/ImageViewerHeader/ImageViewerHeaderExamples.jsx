import React from 'react'
import ImageViewerHeader from './ImageViewerHeader.jsx'

const ImageViewerHeaderExamples = () => {
  const alertMessage = () => {
    alert('toggled comments')
  }

  return (
    <div className="ImageViewerHeaderExamples">
      <h1>Default</h1>

      <ImageViewerHeader />

      <h1>With Params</h1>

      <ImageViewerHeader handle={'Batmannn'} downloadUrl={'http://google.com'} downloadAllowed commentsAllowed title={'Important Report'} toggleComments={alertMessage}/>

    </div>
  )
}

export default ImageViewerHeaderExamples
