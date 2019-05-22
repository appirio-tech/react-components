'use strict'

React          = require 'react'
{ connect }    = require 'react-redux'
{ uploadFile } = require 'appirio-tech-client-app-layer'
classnames     = require 'classnames'
FileUploader   = require './FileUploader'

{ createElement, PropTypes } = React

mapStateToProps = (state) ->
  { id, assetType, category, loading } = state?.fileUploader

  { id, assetType, category, loading }

class FileUploaderContainer extends React.Component
  @propTypes =
    id          : PropTypes.string.isRequired
    assetType   : PropTypes.string.isRequired
    category    : PropTypes.string.isRequired
    dispatch    : PropTypes.func.isRequired
    loading     : PropTypes.bool
    dragAndDrop : PropTypes.bool
    disableClick: PropTypes.bool

  constructor: (props) ->
    super(props)
    this.onChange = this.onChange.bind this

  onChange: (files) ->
    { dispatch, id, assetType, category } = this.props

    files.map (file) ->
      dispatch uploadFile({ id, assetType, category, file })

  render: ->
    { onChange } = this

    { loading, dragAndDrop, disableClick } = this.props

    createElement FileUploader, { onChange, loading, dragAndDrop, disableClick }

module.exports = connect(mapStateToProps)(FileUploaderContainer)

