import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import React from 'react'
import {WithFormValue} from 'react-forms'

class Field extends React.Component {

  render() {
    let {formValue} = this.props
    return (
      <div>
        <label>{formValue.schema.label}</label>
        <input value={formValue.value} onChange={this.onChange} />
      </div>
    )
  }

  onChange = (e) => this.props.formValue.update(e.target.value)
}

class RadioButtonGroup extends Component {

  render() {
    const { formValue, options, modelName } = this.props
    // creating a function to render each radio button
    const typeFunc = (item, index) => {
      // adding classes eg. "phone active"
      const id = modelName + '-radio-option-' + index
      return (
        <div className="radio" key={index}>
          <input
            type="radio"
            name={modelName}
            id={id}
            value={formValue.value} onChange={this.onChange} />
          <label htmlFor={id}>{item.label}</label>
        </div>
      )
    }
    return (
      { typeOptions.map(typeFunc) }
    )
  }

  onChange = (e) => this.props.formValue.update(e.target.value)
}

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelName: PropTypes.string.isRequired
  formValue: PropTypes.string.isRequired
}

export default WithFormValue(RadioButtonGroup)
