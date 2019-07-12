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
    const { options, min, max, step} = this.props
    const value = this.props.getValue()
    const marks = {}
    for(let i=0; i < options.length; i++) {
      if (options[i].value !== null && options[i].value !== undefined && !isNaN(options[i].value)) {
        marks[options[i].value] = options[i].title
      } else {
        const unit = (max - min)/(options.length - 1)
        marks[i * unit + min] = options[i].title
      }
    }
    return (
      <div>
        <Slider
          className={ cn('SliderStandard', { 'null-value' : value  < 0}) }
          min={min}
          max={max}
          step={step}
          value={value}
          marks={marks}
          onChange={ this.onChange }
        />
      </div>
    )
  }
}

SliderStandard.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
}
SliderStandard.defaultProps = {
  onChange: () => {}
}
export default hoc(SliderStandard)