import React, { Component } from 'react'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'
import AutoresizeTextarea from 'react-textarea-autosize'

class Textarea extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
    this.onFocusChanged = this.onFocusChanged.bind(this)
    this.setTextareaRef = this.setTextareaRef.bind(this)
    this.setDomInputRef = this.setDomInputRef.bind(this)
    this.resizeTextarea = this.resizeTextarea.bind(this)
    this.textArea = null
    this.domInputRef = null
  }

  resizeTextarea() {
    this.textArea._resizeLock = true
    this.textArea._resizeComponent(() => {
      this.textArea._resizeLock = false
    })
  }

  onFocusChanged() {
    if (!this.textArea) return
    this.resizeTextarea()
  }

  setTextareaRef(element) {
    this.textArea = element
  }

  setDomInputRef(element) {
    this.domInputRef = element
  }

  focus() {
    if (!this.domInputRef) return
    this.domInputRef.focus()
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
    if (!this.textArea) return
    this.resizeTextarea()
  }

  render() {
    const { label, name, rows, cols, placeholder, wrapperClass, maxLength } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const classes = classNames('tc-textarea', {error: hasError}, {empty: this.props.getValue() === ''})
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div className={wrapperClass}>
        <label className="tc-label">{label}</label>
        {
          this.props.autoResize ?
            <AutoresizeTextarea
              ref={this.setTextareaRef}
              inputRef={this.setDomInputRef}
              cols={cols}
              id={name}
              name={name}
              placeholder={placeholder}
              className={classes}
              disabled={disabled}
              onFocus={this.onFocusChanged}
              onChange={this.changeValue}
              value={this.props.getValue()}
              minRows={rows}
              maxLength={maxLength}
            /> :
            <textarea
              rows={rows}
              cols={cols}
              id={name}
              name={name}
              placeholder={placeholder}
              className={classes}
              disabled={disabled}
              onChange={this.changeValue}
              value={this.props.getValue()}
              maxLength={maxLength}
            />
        }
        { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>

    )
  }
}
Textarea.defaultProps = {
  onChange: () => {},
  rows: 1,
  cols: 0
}
export default hoc(Textarea)
