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
    this.textArea = null
    this.domInputRef = null
  }

  onFocusChanged() {
    if (!this.textArea) return
    setTimeout(() => {
      this.textArea._resizeComponent(() => {
        this.textArea._resizeLock = false
      })
    })
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
    setTimeout(() => {
      this.textArea._resizeComponent(() => {
        this.textArea._resizeLock = false
      })
    })
  }

  heightChanged(height, instance) {
    if(!instance.state || !instance.state._sizeInitialized) {
      setTimeout(() => {
        instance._resizeComponent(() => {
          instance._resizeLock = false
        })
      })
      instance.setState({
        _sizeInitialized: true
      })
    }
  }

  render() {
    const { label, name, rows, cols, placeholder, wrapperClass, minRows = 3 } = this.props
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
              rows={rows}
              cols={cols}
              id={name}
              name={name}
              placeholder={placeholder}
              className={classes}
              disabled={disabled}
              onFocus={this.onFocusChanged}
              onChange={this.changeValue}
              value={this.props.getValue()}
              minRows={minRows}
              onHeightChange={this.heightChanged}
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
