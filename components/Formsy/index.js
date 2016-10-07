
import Formsy from 'formsy-react'

import TextInput from './TextInput'
import Textarea from './Textarea'
import Checkbox from './Checkbox'
import RadioGroup from './RadioGroup'
import CheckboxGroup from './CheckboxGroup'
import SliderRadioGroup from './SliderRadioGroup'
import TiledRadioGroup from './TiledRadioGroup'

require('./FormFields.scss')

// validations
Formsy.addValidationRule('isRequired', function (values, value, array) {
  return value && value.trim().length > 0
})

export default {
  Formsy,
  Fields: {
    TextInput,
    Textarea,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    SliderRadioGroup,
    TiledRadioGroup
  }
}
