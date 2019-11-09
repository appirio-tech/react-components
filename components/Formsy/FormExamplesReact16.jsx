import React from 'react'
import _ from 'lodash'

import Checkbox from './Checkbox'
import RadioGroup from './RadioGroup'
import TextInput from './TextInput'
import Formsy from 'formsy-react'

import './FormExamplesReact16.scss'

const opt2s = [
  {
    label: 'ASAP',
    value: 'opt ASAP',
    quoteUp: 10
  },
  {
    label: '1 - 2 months',
    value: 'opt 1 - 2 months',
    quoteUp: 20
  },
  {
    label: '2 - 3 months',
    value: 'opt 2 - 3 months',
    quoteUp: 30
  }
]


class FormExamplesReact16 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onChange = this.onChange.bind(this)
    this.onBlank = this.onBlank.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  onBlank() {}

  submitForm(){
    alert(JSON.stringify(this.state, '', 2))
  }

  onChange(name, value) {
    if (name === 'checkBox') {
      this.setState({ checkBoxvalue: _.toString(value) })
    }
    if (name === 'password') {
      this.setState({ passwordInputvalue: value })
    }
    if (name === 'phone') {
      this.setState({ phoneInputvalue: value })
    }
    if (name === 'radioGroup') {
      this.setState({ radioGroupvalue: value })
    }
    if (name === 'selectDropdown') {
      this.setState({ selectDropdownvalue: value })
    }
    if (name === 'sliderRadioGroup') {
      this.setState({ sliderRadioGroupvalue: value })
    }
    if (name === 'sliderStandard') {
      this.setState({ sliderStandardvalue: value })
    }
    if (name === 'switchButton') {
      this.setState({ switchButtonvalue: _.toString(value) })
    }
    if (name === 'textarea') {
      this.setState({ textareavalue: value })
    }
    if (name === 'textInput') {
      this.setState({ textInputvalue: value })
    }
    if (name === 'tiledCheckboxGroup') {
      this.setState({ tiledCheckboxGroupvalue: value })
    }
    if (name === 'tiledRadioGroup') {
      this.setState({ tiledRadioGroupvalue: value })
    }

  }

  render() {
    return (
      <div className="form-container">
        <Formsy.Form>
          <div className="field-title">
            Checkbox:
            </div>
          <Checkbox checked={this.state.checkBoxvalue} name="checkBox" onChange={this.onChange} label="show me the money" />
          <div className="field-value">
            Selected value: {this.state.checkBoxvalue}
          </div>

          <div className="field-title">
            RadioGroup:
            </div>
          <RadioGroup
            name="radioGroup"
            wrapperClass="test"
            options={opt2s}
            onChange={this.onChange}
            value={this.state.radioGroupvalue ? this.state.radioGroupvalue : ''}
          />
          <div className="field-value">
            Selected value: {this.state.radioGroupvalue}
          </div>

          <div className="field-title">
            TextInput:
            </div>
          <TextInput
            wrapperClass={'input-container'}
            type="text"
            name="textInput"
            onChange={this.onChange}
            value={this.state.textInputvalue ? this.state.textInputvalue : ''}
          />
          <div className="field-value">
            Selected value: {this.state.textInputvalue}
          </div>

          <div className="padding-top-20 padding-bottom-30">
            <button type="submit" onClick={this.submitForm} className="tc-btn tc-btn-sm tc-btn-primary flex middle center" >Submit</button>
          </div>
        </Formsy.Form>
      </div>

    )
  }
}

export default FormExamplesReact16
