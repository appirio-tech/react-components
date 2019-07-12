import React from 'react'
import SliderStandard from './SliderStandard'
import Formsy from 'formsy-react'
import './SliderStandardExample.scss'

const opts = [
  { value: 0, title:'See Many Concepts' },
  { value: 100, title:'See Best Implementations' }
]


class SliderStandardExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(name, value) {
    this.setState({value})
  }

  render() {
    return (
      <div className="slider-standard-container">
        <Formsy.Form>
          <SliderStandard
            name="sliderStandard"
            min={opts[0].value}
            max={opts[1].value}
            step={1}
            options={opts}
            onChange={this.onChange}
          />
        </Formsy.Form>
        <div>
          Selected value: {this.state.value}
        </div>
      </div>

    )
  }
}

export default SliderStandardExample
