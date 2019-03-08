import React, { Component, PropTypes } from 'react'
import { HOC as hoc } from 'formsy-react'
import cn from 'classnames'
import { find } from "lodash";
import { numberWithCommas } from './format'

class RadioGroup extends Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(e) {
    const value = e.target.value
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }

  getSelectedOption() {
    const {options = [], getValue} = this.props;
    const value = getValue()
    return find(options, o => value === o.value)
  }

  render() {
    const { label, name, wrapperClass, options } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError
    const selectedOption = this.getSelectedOption()
    const hasPrice = find(options, o => o.quoteUp)

    const renderOption = (radio, key) => {
      const relativePrice = (selectedOption, radio) => {
        const price = (radio.quoteUp || 0) - (selectedOption.quoteUp || 0)
        return (price < 0 ? '-' : '+') + ' $' + numberWithCommas(Math.abs(price))
      }
      const checked = (selectedOption && selectedOption.value === radio.value)
      const disabled = this.props.isFormDisabled() || radio.disabled || this.props.disabled
      const rClass = cn('radio', { disabled, selected: checked })
      const id = name+'-opt-'+key
      const setRef = (c) => this['element-' + key] = c
      return (
        <div className={rClass} key={key}>
          <input
            ref={setRef}
            id={id}
            checked={checked}
            type="radio"
            value={radio.value}
            onChange={this.changeValue}
            disabled={disabled}
          />
          <label htmlFor={id}>{radio.label}</label>
          {
            hasPrice &&
            !checked &&
            (radio.quoteUp || selectedOption) &&
            <div className="radio-option-price"> {selectedOption ? relativePrice(selectedOption, radio) : `$${numberWithCommas(radio.quoteUp)}`} </div>
          }
          {
            radio.description && checked && <div className="radio-option-description"> {radio.description} </div>
          }
        </div>
      )
    }

    return (
      <div className={'radio-group-input ' + wrapperClass }>
        <label className="radio-group-label">{label}</label>
        <div className="radio-group-options">{options.map(renderOption)}</div>
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}


RadioGroup.PropTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
}

RadioGroup.defaultProps = {
  onChange: () => {}
}

export default hoc(RadioGroup)
