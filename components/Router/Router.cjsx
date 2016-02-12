'use strict'

React                         = require 'react'
{ Provider }                  = require 'react-redux'
store                         = require '../../store'
ExampleApp                    = require '../ExampleApp/ExampleApp.cjsx'
Router                        = require '../Router/Router.cjsx'

UploadedFileExamples          = require '../UploadedFile/UploadedFileExamples.cjsx'
UploadedFilesExamples         = require '../UploadedFiles/UploadedFilesExamples.cjsx'
FileUploaderExamples          = require '../FileUploader/FileUploaderExamples.cjsx'
FileUploaderContainerExamples = require '../FileUploader/FileUploaderContainerExamples.cjsx'
AvatarExamples                = require '../Avatar/AvatarExamples.cjsx'
CheckboxExamples              = require '../Checkbox/CheckboxExamples.cjsx'
ImageViewerHeaderExamples     = require '../ImageViewerHeader/ImageViewerHeaderExamples.cjsx'
ImageViewerExamples           = require '../ImageViewer/ImageViewerExamples.cjsx'
LoaderExamples                = require '../Loader/LoaderExamples.cjsx'
ManageStepsExamples           = require '../ManageSteps/ManageStepsExamples.cjsx'
StepRowExamples               = require '../StepRow/StepRowExamples.cjsx'
PageSectionExamples           = require '../PageSection/PageSectionExamples.cjsx'

{ Router, Route, Link, IndexRoute, browserHistory } = require 'react-router'

component = ->
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRoute component={AvatarExamples}/>

        <Route path="/FileUploaderContainerExamples" component={FileUploaderContainerExamples}/>

        <Route path="/UploadedFileExamples" component={UploadedFileExamples}/>

        <Route path="/UploadedFilesExamples" component={UploadedFilesExamples}/>

        <Route path="/FileUploaderExamples" component={FileUploaderExamples}/>

        <Route path="/CheckboxExamples" component={CheckboxExamples} />

        <Route path="/ImageViewerHeaderExamples" component={ImageViewerHeaderExamples} />

        <Route path="/ImageViewerExamples" component={ImageViewerExamples} />

        <Route path="/LoaderExamples" component={LoaderExamples} />

        <Route path="/ManageStepsExamples" component={ManageStepsExamples}/>

        <Route path="/StepRowExamples" component={StepRowExamples} />

        <Route path="/PageSectionExamples" component={PageSectionExamples} />
      </Route>
    </Router>
  </Provider>

module.exports = component