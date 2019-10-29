import React from 'react'
import _ from 'lodash'

import Checkbox from './Checkbox'
import PasswordInput from './PasswordInput'
import PhoneInput from './PhoneInput'
import RadioGroup from './RadioGroup'
import SelectDropdown from '../SelectDropdown/SelectDropdown'
import SliderRadioGroup from './SliderRadioGroup'
import SliderStandard from './SliderStandard'
import SwitchButton from '../SwitchButton/SwitchButton'
import Textarea from './Textarea'
import TextInput from './TextInput'
import TiledCheckboxGroup from './TiledCheckboxGroup'
import TiledRadioGroup from './TiledRadioGroup'
import Formsy from 'formsy-react'

import './FormExamples.scss'

const opts = [
  {
    title: 'ASAP',
    value: 'opt ASAP ',
    desc: null
  },
  {
    title: '1 - 2 months',
    value: 'opt 1 - 2 months ',
    desc: null
  },
  {
    title: '2 - 3 months',
    value: 'opt 2 - 3 months ',
    desc: null
  }
]

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

const opt3s = [
  {
    title: 'selectDropdown1',
    value: 'selectDropdown1'
  },
  {
    title: 'selectDropdown2',
    value: 'selectDropdown2'
  },
  {
    title: 'selectDropdown3',
    value: 'selectDropdown3'
  }
]

const ISOCountries = [
  { alpha2: 'AF', alpha3: 'AFG', code: 4, numericString: '004', name: 'Afghanistan' },
  { alpha2: 'AX', alpha3: 'ALA', code: 248, numericString: '248', name: 'Åland Islands' },
  { alpha2: 'AL', alpha3: 'ALB', code: 8, numericString: '008', name: 'Albania' },
  { alpha2: 'DZ', alpha3: 'DZA', code: 12, numericString: '012', name: 'Algeria' }
]


class FormExamples extends React.Component {
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
            PasswordInput:
            </div>
          <PasswordInput
            wrapperClass={'input-container'}
            label="Password"
            type="password"
            name="password"
            validationError="Please enter password"
            onChange={this.onChange}
            value={this.state.passwordInputvalue ? this.state.passwordInputvalue : ''}
          />
          <div className="field-value">
            Selected value: {this.state.passwordInputvalue}
          </div>

          <div className="field-title">
            PhoneInput:
            </div>
          <div className="phone-input-field">
            <PhoneInput
              validations={this.onBlank}
              wrapperClass={'phone-input-container'}
              name="phone"
              type="phone"
              listCountry={ISOCountries}
              forceCountry={this.onBlank}
              onChangeCountry={this.onBlank}
              onOutsideClick={this.onBlank}
              onChange={this.onChange}
              value={this.state.phoneInputvalue ? this.state.phoneInputvalue : ''}
            />
          </div>

          <div className="field-value">
            Selected value: {this.state.phoneInputvalue}
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
            SelectDropdown:
            </div>
          <SelectDropdown
            theme="default"
            name="selectDropdown"
            className="sort-filter"
            options={opt3s}
            // eslint-disable-next-line react/jsx-no-bind
            onSelect={(e) => this.onChange('selectDropdown', e.value)}
          />
          <div className="field-value">
            Selected value: {this.state.selectDropdownvalue}
          </div>

          <div className="field-title">
            SliderRadioGroup:
            </div>
          <div className="slider-radio-group">
            <SliderRadioGroup
              name="sliderRadioGroup"
              wrapperClass="test"
              min={0}
              max={20}
              step={10}
              options={opts}
              onChange={this.onChange}
              value={this.state.sliderRadioGroupvalue ? this.state.sliderRadioGroupvalue : ''}
            />
          </div>
          <div className="field-value padding-top-20">
            Selected value: {this.state.sliderRadioGroupvalue}
          </div>

          <div className="field-title">
            SliderStandard:
            </div>
          <div className="slider-radio-group padding-top-20">
            <SliderStandard
              name="sliderStandard"
              wrapperClass="test"
              min={0}
              max={1000}
              step={10}
              minLabel="0"
              maxLabel="1000"
              onChange={this.onChange}
              value={this.state.sliderStandardvalue ? this.state.sliderStandardvalue : ''}
            />
          </div>
          <div className="field-value">
            Selected value: {this.state.sliderStandardvalue}
          </div>

          <div className="field-title">
            SwitchButton:
            </div>
          <SwitchButton
            name="switchButton"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(e) => this.onChange('switchButton', e.target.checked)}
            label="Private"
          />
          <div className="field-value">
            Selected value: {this.state.switchButtonvalue}
          </div>

          <div className="field-title">
            Textarea:
            </div>
          <Textarea name="textarea" onChange={this.onChange} />
          <div className="field-value">
            Selected value: {this.state.textareavalue}
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

          <div className="field-title">
            TiledCheckboxGroup:
            </div>
          <TiledCheckboxGroup
            name="tiledCheckboxGroup"
            wrapperClass="test"
            options={opts}
            onChange={this.onChange}
            value={this.state.tiledCheckboxGroupvalue ? this.state.tiledCheckboxGroupvalue : ''}
          />
          <div className="field-value">
            Selected value: {this.state.tiledCheckboxGroupvalue}
          </div>

          <div className="field-title">
            TiledRadioGroup:
            </div>
          <TiledRadioGroup
            name="tiledRadioGroup"
            wrapperClass="test"
            options={opts}
            onChange={this.onChange}
            value={this.state.tiledRadioGroupvalue ? this.state.tiledRadioGroupvalue : ''}
          />
          <div className="field-value">
            Selected value: {this.state.tiledRadioGroupvalue ? this.state.tiledRadioGroupvalue : ''}
          </div>

          <div className="padding-top-20 padding-bottom-30">
            <button type="submit" onClick={this.submitForm} className="tc-btn tc-btn-sm tc-btn-primary flex middle center" >Submit</button>
          </div>
        </Formsy.Form>
      </div>

    )
  }
}

export default FormExamples
