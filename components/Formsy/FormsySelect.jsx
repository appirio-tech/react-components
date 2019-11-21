import React from 'react'
import PropTypes from 'prop-types'
import { HOC as hoc } from 'formsy-react'
import Select from 'react-select'
import cn from 'classnames'
import './FormsySelect.scss'

/**
 * This component is a formsy wrapper for the React Select component
 * @param {Object} props Component props
 */

const FormsySelect = props => {
  const { onChange, wrapperClass, label } = props
  const selectedOption = props.getValue()

  const onSelectionChange = selectedOption => {
    props.setValue(selectedOption)
    onChange && onChange(selectedOption)
  }
  const value = selectedOption

  return (
    <div className={cn(wrapperClass, 'formsySelectComponent')}>
      <label className="tc-label">{label}</label>
      <Select
        {...props}
        value={value}
        className="basic-single-select"
        classNamePrefix="select"
        isClearable
        onChange={onSelectionChange}
      />
    </div>
  )
}

FormsySelect.propTypes = {
  onChange: PropTypes.func,
  setValueOnly: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default hoc(FormsySelect)
