'use strict'

{ createElement, createClass } = require 'react'
ExampleNav                     = require './ExampleNav'

navs =
  Navbar: [
    'DropdownExamples',
    'UserDropdownMenuExamples',
    'QuickLinksExample',
    'SearchSuggestionsExamples',
    'SearchBarExample'
  ]
  FileUploader: [
    'FileUploaderContainerExamples'
    'FileUploaderExamples'
    'UploadedFileExamples'
    'UploadedFilesExamples'
  ]
  Misc: [
    'CheckboxExamples'
    'ImageViewerHeaderExamples'
    'ImageViewerExamples'
    'LoaderExamples',
    'PanelExamples',
    'StandardListItemExamples',
    'MenuBarExamples'
  ]
  ManageSteps: [
    'ManageStepsExamples'
    'StepRowExamples'
  ]


container =
  getInitialState: ->
    root: true
    links: Object.keys(navs)

  onClick: (link) ->
    this.setState
      root : false
      links: navs[link]

  onBack: ->
    this.setState this.getInitialState()

  render: ->
    { links, root } = this.state

    { onClick, onBack } = this

    if root
      createElement ExampleNav, { links, onClick }
    else
      createElement ExampleNav, { links, onBack }

module.exports = createClass(container)
