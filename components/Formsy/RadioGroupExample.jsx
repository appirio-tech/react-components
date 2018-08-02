import React from 'react'
import TiledRadioGroup from './TiledRadioGroup'
import Formsy from 'formsy-react'
import './RadioGroupExample.scss'

const opts = [
  {
    title: 'ASAP',
    value: 'opt ASAP',
    desc: null
  },
  {
    title: '1 - 2 months',
    value: 'opt 1 - 2 months',
    desc: null
  },
  {
    title: '2 - 3 months',
    value: 'opt 2 - 3 months',
    desc: null
  }
]


class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      radioGroup1value: ['opt 2 - 3 months'],
      radioGroup2value: ['opt ASAP']
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(name, value) {
    if (name === 'radioGroup1') {
      this.setState({radioGroup1value: value})
    }
    if (name === 'radioGroup2') {
      this.setState({radioGroup2value: value})
    }
  }

  render() {
    return (
      <div className="radio-group-container">
        <div className="single-action-radio-group">
          <div className="checkbox-title">
            Single Option:
          </div>
          <Formsy.Form>
            <TiledRadioGroup
              name="radioGroup1"
              wrapperClass="test"
              options={opts}
              onChange={this.onChange}
              value={this.state.radioGroup1value}
            />
          </Formsy.Form>
          <div>
            Selected value: {this.state.radioGroup1value}
          </div>
        </div>

        <div className="single-action-radio-group">
          <div className="checkbox-title">
            Multiple Option:
          </div>
          <Formsy.Form>
            <TiledRadioGroup
              name="radioGroup2"
              wrapperClass="test"
              options={opts}
              onChange={this.onChange}
              value={this.state.radioGroup2value}
              multipleOptions
            />
          </Formsy.Form>
          <div>
            Selected value: {this.state.radioGroup2value.join(', ')}
          </div>
        </div>
      </div>

    )
  }
}

export default RadioGroupExample
