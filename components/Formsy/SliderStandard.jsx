'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import cn from 'classnames'
import { HOC as hoc } from 'formsy-react'

import './SliderStandard.scss'

class SliderStandard extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    const {name} = this.props
    this.props.setValue(value.toString())
    this.props.onChange(name, value)
  }

  noOp() {}

  render() {
    const { minLabel, maxLabel, min, max, step} = this.props
    const value = this.props.getValue()
    const marks = {}
    marks[min] = minLabel
    marks[max] = maxLabel
    return (
      <div>
        <Slider
          className={ cn('SliderStandard', { 'null-value' : value  < 0}) }
          min={min}
          max={max}
          step={step}
          value={parseInt(value)}
          marks={marks}
          onChange={ this.onChange }
          // handles onAfterChange to fix issue when user clicks on first value/step of untouched slider
          onAfterChange={ this.onChange }
        />
      </div>
    )
  }
}

SliderStandard.propTypes = {
  minLabel: PropTypes.string.isRequired,
  maxLabel: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
}
SliderStandard.defaultProps = {
  onChange: () => {}
}
export default hoc(SliderStandard)