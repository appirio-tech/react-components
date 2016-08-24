
import Formsy from 'formsy-react'

import TextInput from './TextInput'
import Textarea from './Textarea'
import Checkbox from './Checkbox'
import RadioGroup from './RadioGroup'
import CheckboxGroup from './CheckboxGroup'
import SliderRadioGroup from './SliderRadioGroup'

require('./FormFields.scss')

export default {
  Formsy,
  Fields: {
    TextInput,
    Textarea,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    SliderRadioGroup
  }
}
