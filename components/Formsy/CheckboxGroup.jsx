import React, { Component, PropTypes } from 'react'
import { HOC as hoc } from 'formsy-react'
import cn from 'classnames'
import { numberWithCommas } from './format'

class CheckboxGroup extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue() {
    const value = []
    this.props.options.forEach((option, key) => {
      if (this['element-' + key].checked) {
        value.push(option.value)
      }
    })
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }

  render() {
    const { label, name, options, layout, wrapperClass } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    const renderOption = (cb, key) => {
      const curValue = this.props.getValue() || []
      const checked = curValue.indexOf(cb.value) !== -1
      const disabled = this.props.isFormDisabled() || cb.disabled || this.props.disabled
      const rClass = cn('checkbox-group-item', { disabled, selected: checked })
      const id = name+'-opt-'+key
      const setRef = (c) => this['element-' + key] = c
      return (
        <div className={rClass} key={key}>
          <div className="tc-checkbox">
            <input
              id={id}
              ref={setRef}
              type="checkbox"
              name={name}
              checked={checked}
              disabled={disabled}
              onChange={this.changeValue}
            />
            <label htmlFor={id}/>
          </div>
          <label className="tc-checkbox-label" htmlFor={id}>{cb.label}</label>
          {
            cb.quoteUp && !checked && <div className="checkbox-option-price"> {`+ $${numberWithCommas(cb.quoteUp)}`} </div>
          }
          {
            cb.description && checked && <div className="checkbox-option-description"> {cb.description} </div>
          }
        </div>
      )
    }
    const chkGrpClass = cn('checkbox-group', wrapperClass, {
      horizontal: layout === 'horizontal',
      vertical: layout === 'vertical'
    })
    return (
      <div className={chkGrpClass}>
        <label className="checkbox-group-label">{label}</label>
        <div className="checkbox-group-options">{options.map(renderOption)}</div>
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}

CheckboxGroup.PropTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
}

CheckboxGroup.defaultProps = {
  onChange: () => {}
}

export default hoc(CheckboxGroup)
