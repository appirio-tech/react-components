import React, { Component } from 'react'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'
import AutoresizeTextarea from 'react-textarea-autosize'

class Textarea extends Component {

  constructor(props) {
    super(props)
    this.state = { value : props.getValue() }
    this.changeValue = this.changeValue.bind(this)
  }

  componentDidMount() {
    this.setState({ value : this.props.getValue() })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.value !== this.state.value || nextProps.name !== this.props.name)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.value !== this.state.value) {
      this.props.setValue(nextState.value)
      this.props.onChange(this.props.name, nextState.value)
    }
  }
  
  changeValue(e) {
    this.setState({ value : e.target.value })
  }

  render() {
    const { label, name, rows, cols, placeholder, wrapperClass} = this.props
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
              rows={rows}
              cols={cols}
              id={name}
              name={name}
              placeholder={placeholder}
              className={classes}
              disabled={disabled}
              onChange={this.changeValue}
              value={this.state.value}
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
              value={this.state.value}
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
