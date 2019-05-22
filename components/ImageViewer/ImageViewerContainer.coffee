'use strict'

React = require 'react'
PropTypes = require 'prop-types'
{ createElement } = React
ImageViewerElement = require './ImageViewer.cjsx'

class ImageViewer extends React.Component
  @propTypes =
    files: PropTypes.array.isRequired
    showNotifications: PropTypes.bool
    initialFile: PropTypes.object.isRequired
    onFileChange: PropTypes.func

  constructor: (props) ->
    super(props)
    currentIndex = props.files.indexOf props.initialFile
    this.state =
      file: props.initialFile
      currentIndex: currentIndex
      nextFile: currentIndex + 1 < props.files.length
      prevFile: currentIndex - 1 >= 0
    this.viewNext = this.viewNext.bind this
    this.viewPrevious = this.viewPrevious.bind this
    this.selectFile = this.selectFile.bind this
    this.updateArrowsState = this.updateArrowsState.bind this
    this.toggleZoom = this.toggleZoom.bind this

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