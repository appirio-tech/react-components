'use strict'

import React, { PropTypes } from 'react'
import BaseInputField from './BaseInputField'
import _ from 'lodash'

class CheckboxInput extends BaseInputField {
  render() {
    const { name, index, label, ...rest } = this.props
    const id = [name, 'option', index].join('-')
    return (
      <div className="checkbox-group-item">
        <div className="tc-checkbox">
          <input id={id} type="checkbox" {...rest} />
          <label htmlFor={id}/>
        </div>
        <label className="tc-checkbox-label" htmlFor={id}>{label}</label>
      </div>
    )
  }
}


CheckboxInput.displayName = 'CheckboxInputField'
CheckboxInput.propTypes = _.assign({}, CheckboxInput.propTypes, {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
})

export default CheckboxInput
