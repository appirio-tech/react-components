'use strict'

React = require 'react'
{ PropTypes, createElement, createClass } = React
ImageViewerElement = require './ImageViewer.cjsx'

ImageViewer = React.createClass
  propTypes:
    files: PropTypes.array.isRequired
    showNotifications: PropTypes.bool
    initialFile: PropTypes.object.isRequired
    onFileChange: PropTypes.func

  getInitialState: ->
    file = this.props.initialFile
    currentIndex = this.props.files.indexOf this.props.initialFile
    nextFile = currentIndex + 1 < this.props.files.length
    prevFile = currentIndex - 1 >= 0

    file: file
    currentIndex: currentIndex
    nextFile: nextFile
    prevFile: prevFile

  componentWillMount: ->
    this.props.onFileChange({file: this.state.file}) if this.props.onFileChange

  componentWillUpdate: ->
    this.props.onFileChange({file: this.state.file}) if this.props.onFileChange

  viewNext: ->
    file = this.props.files[this.state.currentIndex + 1]
    this.updateArrowsState(file)

  viewPrevious: ->
    file = this.props.files[this.state.currentIndex - 1]
    this.updateArrowsState(file)

  selectFile: (file) ->
    file = file
    this.updateArrowsState(file)

  updateArrowsState: (file) ->
    currentIndex = this.props.files.indexOf file
    nextFile = currentIndex + 1 < this.props.files.length
    prevFile = currentIndex - 1 >= 0

    this.setState
      file: file
      currentIndex: currentIndex
      nextFile: nextFile
      prevFile: prevFile
      imageZoomedIn: false

  toggleZoom: ->
    imageZoomedIn = this.state.imageZoomedIn

    this.setState
      imageZoomedIn: !imageZoomedIn

  render: ->
    createElement ImageViewerElement,
      showNotifications: this.props.showNotifications
      files:             this.props.files
      file:              this.state.file
      prevFile:          this.state.prevFile
      nextFile:          this.state.nextFile
      currentIndex:      this.state.currentIndex
      imageZoomedIn:     this.state.imageZoomedIn
      viewNext:          this.viewNext
      viewPrevious:      this.viewPrevious
      selectFile:        this.selectFile
      toggleZoom:        this.toggleZoom

module.exports = ImageViewer