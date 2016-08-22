'use strict'

import React, { Component } from 'react'

class RadioButton extends Component {
  render() {
    const { name, index, label, selectedValue, value, onChange } = this.props
    const id = [name, 'option', index].join('-')
    return (
      <div className="radio">
        <input type="radio"
          name={name} id={id} value={value}
          checked={value === selectedValue}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}

export default RadioButton
