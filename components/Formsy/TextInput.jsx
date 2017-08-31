import React, { Component } from 'react'
import { HOC as hoc } from 'formsy-react'
import classNames from 'classnames'

class TextInput extends Component {

  constructor(props) {
    super(props)
    this.state = { value : props.getValue() }
    this.changeValue = this.changeValue.bind(this)
  }

  componentDidMount() {
    this.setState({ value : this.props.getValue() })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.value != this.state.value || nextProps.name !== this.props.name);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if(nextState.value != this.state.value) {
      this.props.setValue(nextState.value)
      this.props.onChange(this.props.name, nextState.value)
    }
  }

  changeValue(e) {
    this.setState({
      value : e.target.value
    });
  }

  render() {
    const { label, name, type, placeholder, wrapperClass, maxLength, theme } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const wrapperClasses = classNames(wrapperClass, theme)
    const classes = classNames('tc-file-field__inputs', {error: hasError}, {empty: this.props.getValue() === ''})
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    return (
      <div className={wrapperClasses}>
        <label className="tc-label">{label}</label>
        <input
          name={name}
          className={classes}
          type={type}
          placeholder={placeholder}
          value={this.state.value}
          disabled={disabled}
          onChange={this.changeValue}
          maxLength={maxLength}
        />
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}

TextInput.defaultProps = {
  onChange: () => {}
}

export default hoc(TextInput)
