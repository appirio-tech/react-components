import React from 'react'
import PT from 'prop-types'
import cn from 'classnames'
import { range } from 'lodash'

import FormsySelect from './FormsySelect'
import styles from './WorkingHoursSelection.scss'

/**
 * This component renders the working hours selection on profile settings and
 * connect registration pages
 */
class WorkingHoursSelection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hourOptions: this.getHourOptions()
    }

    this.onEndHourChange = this.onEndHourChange.bind(this)
    this.onStartHourChange = this.onStartHourChange.bind(this)
  }

  /**
   * Generates options for the hour selection.
   * @returns {array} a list of hours ['1:00', '2:00', ... '24:00']
   */
  getHourOptions() {
    return range(1, 25)
      .map(h => `${h}:00`)
      .map(h => ({ value: h, label: h }))
  }

  onStartHourChange(value) {
    const { onChange, startHourName } = this.props

    if (onChange) {
      onChange(startHourName, value)
    }
  }

  onEndHourChange(value) {
    const { onChange, endHourName } = this.props

    if (onChange) {
      onChange(endHourName, value)
    }
  }

  render() {
    const {
      label,
      wrapperClass,
      startHourName,
      endHourName,
      startHourLabel,
      endHourLabel,
      startHourValue,
      endHourValue,
      selectElement,
      selectElementProps,
      isRequired
    } = this.props

    const Select = selectElement || FormsySelect

    return (
      <div
        className={cn(
          wrapperClass,
          'workingHourSelectionContainer',
          styles.workingHourSelectionContainer
        )}
      >
        <label className="tc-label">{label}</label>
        <div className="selectRow">
          {/* Start hour */}
          <div className="selectWrapper">
            <label className="tc-label">{startHourLabel}</label>
            <Select
              options={this.state.hourOptions}
              name={startHourName}
              onChange={this.onStartHourChange}
              value={startHourValue}
              required={isRequired}
              {...(selectElement && selectElementProps
                ? selectElementProps
                : {})}
              validationError={`Please enter ${startHourLabel}`}
            />
          </div>

          {/* End hour */}
          <div className="selectWrapper">
            <label className="tc-label">{endHourLabel}</label>
            <Select
              options={this.state.hourOptions}
              name={endHourName}
              onChange={this.onEndHourChange}
              value={endHourValue}
              required={isRequired}
              {...(selectElement && selectElementProps
                ? selectElementProps
                : {})}
              validationError={`Please enter ${endHourLabel}`}
            />
          </div>
        </div>
      </div>
    )
  }
}


WorkingHoursSelection.defaultProps = {
  isRequired: false
}


WorkingHoursSelection.PropTypes = {
  startHourLabel: PT.string.isRequired,
  endHourLabel: PT.string.isRequired,
  startHourName: PT.string.isRequired,
  endHourName: PT.string.isRequired,
  label: PT.string,
  wrapperClass: PT.string,
  startHourValue: PT.string,
  endHourValue: PT.string,
  selectElement: PT.element,
  selectElementProps: PT.object,
  isRequired: PT.bool
}
export default WorkingHoursSelection
