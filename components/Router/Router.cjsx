'use strict'

React                         = require 'react'
{ Provider }                  = require 'react-redux'
configureStore                = require('appirio-tech-client-app-layer').default
ExampleApp                    = require '../ExampleApp/ExampleApp.cjsx'
Router                        = require '../Router/Router.cjsx'
UploadedFileExamples          = require '../UploadedFile/UploadedFileExamples.cjsx'
UploadedFilesExamples         = require '../UploadedFiles/UploadedFilesExamples.cjsx'
FileUploaderExamples          = require '../FileUploader/FileUploaderExamples.cjsx'
FileUploaderContainerExamples = require '../FileUploader/FileUploaderContainerExamples.cjsx'

{ Router, Route, Link, IndexRoute, browserHistory } = require 'react-router'

store = configureStore
  attachments:
    'mockDataInRouter.jpg':
      assetType   : 'specs'
      progress    : 33
      category    :'work'
      fileName    : 'mockDataInRouter.jpg'
      filePath    : 'some/unique/path'
      fileType    : 'image/jpeg'
      id          : 'workid'
    'specsworkworkidmockDataInRouterError.jpg':
      assetType   : 'specs'
      progress    : 33
      category    :'work'
      fileName    : 'mockDataInRouterError.jpg'
      filePath    : 'some/unique/path3'
      fileType    : 'image/jpeg'
      id          : 'workid'
      errors      : []
    'mockDataInRouter2.jpg':
      assetType   : 'specs'
      progress    : 33
      category    :'work'
      fileName    : 'mockDataInRouter2.jpg'
      filePath    : 'some/unique/path2'
      fileType    : 'image/jpeg'
      id          : 'workid'
      preview     : 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
  fileUploader:
    id       : 'workid' # has to match schemas
    assetType: 'specs' # has to match schemas
    category : 'work' # has to match schemas

component = ->
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRoute component={FileUploaderContainerExamples}/>

        <Route path="/UploadedFileExamples" component={UploadedFileExamples}/>

        <Route path="/UploadedFilesExamples" component={UploadedFilesExamples}/>

        <Route path="/FileUploaderExamples" component={FileUploaderExamples}/>
      </Route>
    </Router>
  </Provider>


module.exports = component