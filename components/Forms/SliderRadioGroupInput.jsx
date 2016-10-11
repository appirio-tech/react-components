'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import BaseInputField from './BaseInputField'

class SliderRadioGroupInput extends BaseInputField {
  constructor(props) {
    super(props)
    this.onSlide = this.onSlide.bind(this)
  }

  componentWillMount() {
    const idx = Math.max(this.getIndexFromValue(this.props.value), 0)
    this.setState({
      dirty: false,
      valid: true,
      value: this.props.options[idx].value
    })
  }

  onChange(idx) {
    idx = parseInt(idx)
    const {onFieldChange, name, options} = this.props
    const newValue = options[idx].value
    this.setState({dirty: true, value: newValue, valid: true})
    onFieldChange(name, newValue, true)
  }

  noOp() {}

  onSlide(event) {
    this.onChange(event.target.value)
  }

  getIndexFromValue(val) {
    return _.findIndex(this.props.options, (t) => t.value === val)
  }

  render() {
    const { options, min, max, step} = this.props
    const { value } = this.state
    const valueIdx = this.getIndexFromValue(value)
    // creating a function to render each type title + desc
    const itemFunc = (item, index) => {
      // handle active class
      const itemClassnames = classNames( 'selector', {
        active: value === item.value
      })
      const idx = this.getIndexFromValue(item.value)
      const handleClick = this.onChange.bind(this, idx)
      return (
        <div className={itemClassnames} key={index} onClick={ handleClick } >
          <h3>{item.title}</h3>
          {item.desc}
        </div>
      )
    }

    // function to render item info
    const itemInfoFunc = (item, index) => {
      // handle active class
      const itemClassnames = classNames({active: value === item.value})
      const idx = this.getIndexFromValue(item.value)
      const handleClick = this.onChange.bind(this, idx)
      return (
        <span
          onClick={ handleClick }
          className={itemClassnames}
          key={index}
          dangerouslySetInnerHTML={{__html: item.info}}
        />
      )
    }
    return (
      /**
       * TODO Using onInput trigger instead of onChange.
       * onChange is showing some funky behavior at least in Chrome.
       * This functionality should be tested in other browsers
       * onChange={this.noOp}
       */
      <div>
      
        <div className="range-slider">
          <input
            type="range"
            classNames="range-slider__range"
            min={min}
            max={max}
            step={step}
            value={valueIdx}
            onChange={ this.onSlide }
          />
        </div>

        <div className="type-selector">
          {options.map(itemFunc)}
        </div>

        <div className="info-selector">
          {options.map(itemInfoFunc)}
        </div>

      </div>
    )
  }
}

SliderRadioGroupInput.displayName = 'SliderRadioGroupInputField'
SliderRadioGroupInput.propTypes = _.assign({}, SliderRadioGroupInput.propTypes, {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
})

export default SliderRadioGroupInput
