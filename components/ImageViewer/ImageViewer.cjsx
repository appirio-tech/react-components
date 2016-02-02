'use strict'

require './ImageViewer.scss'

React = require 'react'

ImageViewer = ({
  files
  file
  viewPrevious
  viewNext
  selectFile
  prevFile
  nextFile
  showNotifications
  toggleZoom
  imageZoomedIn
 }) ->

  <div className="ImageViewer">
    <main className="flex column middle light-bg">
      <div className="content flex column flex-grow">
        {if file.name
          <p className="file-name">{file.name}</p>
        }

        {if file.caption
          <p className="file-caption">{file.caption}</p>
        }

        <div className="slideshow flex column flex-grow">
          <div className="preview flex center flex-grow flex-shrink">
            <div className="previous flex flex-grow">
              { if prevFile
                <a className="arrow-previous" onClick={viewPrevious}>
                  <button className="clean icon arrow"></button>
                </a>
              }

              { if !prevFile
                <a className="arrow-previous invisible disabled">
                  <button className="clean icon arrow"></button>
                </a>
              }
            </div>

            <div className="image flex column center">
              <div className="img-container flex flex-grow">
                {if !imageZoomedIn
                  <div className="bg-image" onClick={toggleZoom} style={backgroundImage: 'url(' + file.url + ')'} />
                }
                {if imageZoomedIn
                  <div className="bg-image zoomed elevated" onClick={toggleZoom}>
                    <img src={file.url}/>
                  </div>
                }
              </div>
            </div>

            <div className="next flex flex-grow">
              { if nextFile
                <a className="arrow-next" onClick={viewNext}>
                  <button className="clean icon arrow right"></button>
                </a>
              }

              { if !nextFile
                <a className="arrow-next invisible disabled">
                  <button className="clean icon arrow right"></button>
                </a>
              }
            </div>
          </div>

          <ul className="thumbnails">
            {for file in files
              <li className="thumbnail" key={file.name}>
                <button className="clean" onClick={selectFile.bind(null, file)}>
                  <img src={file.url}/>
                  {if file.unreadMessages > 0 && showNotifications
                    <div className="notification absolute">
                      {file.unreadMessages}
                    </div>
                  }
                </button>
              </li>
            }
          </ul>

        </div>
      </div>
    </main>
  </div>

module.exports = ImageViewer