import React from 'react'
import Avatar from '../Avatar/Avatar.jsx'

require('./ImageViewerHeader.scss')

const ImageViewerHeader = ({
  avatar,
  handle,
  title,
  downloadUrl,
  commentsAllowed,
  downloadAllowed,
  toggleComments
 }) => {
  const downloadButton = downloadAllowed && (
    <button className="clean">
      <a href={downloadUrl}>
        <div className="icon download"/>
      </a>
    </button>
  )

  const commentsButton = commentsAllowed && (
    <button className="clean" onClick={toggleComments}>
      <div className="icon bubble"/>
    </button>
  )

  return (
    <div className="ImageViewerHeader">
      <main className="flex column light-bg">
        <div className="header flex space-between">
          <div className="user flex middle">
            <a href={'https://www.topcoder.com/members/' + handle}>
              <Avatar avatar-url={avatar} />
            </a>

            <div className="titles flex column">
              <a hrf={'https://www.topcoder.com/members/' + handle}>
                <p className="name"> {handle}
                </p>
              </a>

              <p className="title">
                {title}
              </p>
            </div>
          </div>

          <div className="icons">
            {downloadButton}

            {commentsButton}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ImageViewerHeader
