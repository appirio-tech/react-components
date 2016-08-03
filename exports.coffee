NavBar              = require './components/Navbar/Navbar'
Panel               = require './components/Panel/Panel'
SearchBar           = require './components/SearchBar/SearchBar'
UserDropdown        = require './components/UserDropdownMenu/UserDropdownMenu'
TCFooter            = require './components/TCFooter/TCFooter'
ProgressBar         = require './components/ProgressBar/ProgressBar'
MenuBar             = require './components/MenuBar/MenuBar'
NavLink             = require './components/NavLink/NavLink'
ImageViewer         = require './components/ImageViewer/ImageViewer'
FileUploader        = require './components/FileUploader/FileUploader'
Loader              = require './components/Loader/Loader'
StandardListItem    = require './components/StandardListItem/StandardListItem'
TaggedValue         = require './components/TaggedValue/TaggedValue'
QuickLinks          = require './components/QuickLinks/QuickLinks'
Tooltip             = require './components/Tooltip/Tooltip'
Avatar              = require './components/Avatar/Avatar'
Carousel            = require './components/Carousel/Carousel'
Checkbox            = require './components/Checkbox/Checkbox'
Dropdown            = require './components/Dropdown/Dropdown'
SelectDropdown      = require './components/SelectDropdown/SelectDropdown'
ManageSteps         = require './components/ManageSteps/ManageSteps'
StepRow             = require './components/StepRow/StepRow'
SubNav              = require './components/SubNav/SubNav'
SwitchButton        = require './components/SwitchButton/SwitchButton'
# Icons
TopcoderLogo        = require './components/Icons/TopcoderLogo'
ConnectLogo         = require './components/Icons/ConnectLogo'
TopcoderMobileLogo  = require './components/Icons/TopcoderMobileLogo'
MagnifyGlassIcon    = require './components/Icons/MagnifyGlassIcon'
LeftArrowIcon       = require './components/Icons/LeftArrowIcon'
RightArrowIcon      = require './components/Icons/RightArrowIcon'
HamburgerIcon       = require './components/Icons/HamburgerIcon'
PlaceholderIcon     = require './components/Icons/PlaceholderIcon'

# Redux Forms
InputFormField      = require './components/ReduxForms/Input'
TextareaFormField   = require './components/ReduxForms/Textarea'

# Forms
Form                = require './components/Forms/Form'
FormFields          = require './components/Forms/Fields'
Validations         = require './components/Forms/Validations'
BaseInputField      = require './components/Forms/BaseInputField'

module.exports =
  NavBar            : NavBar.default
  NavLink           : NavLink.default
  Panel             : Panel.default
  SearchBar         : SearchBar.default
  UserDropdown      : UserDropdown.default
  ProgressBar       : ProgressBar.default
  MenuBar           : MenuBar.default
  ImageViewer       : ImageViewer.default
  FileUploader      : FileUploader.default
  Loader            : Loader.default
  StandardListItem  : StandardListItem.default
  TaggedValue       : TaggedValue.default
  QuickLinks        : QuickLinks.default
  Tooltip           : Tooltip.default
  Avatar            : Avatar.default
  Carousel          : Carousel.default
  Checkbox          : Checkbox.default
  Dropdown          : Dropdown.default
  SelectDropdown    : SelectDropdown.default
  ManageSteps       : ManageSteps.default
  StepRow           : StepRow.default
  SubNav            : SubNav.default,
  TopcoderLogo      : TopcoderLogo.default,
  TopcoderMobileLogo: TopcoderMobileLogo.default,
  MagnifyGlassIcon  : MagnifyGlassIcon.default,
  LeftArrowIcon     : LeftArrowIcon.default,
  RightArrowIcon    : RightArrowIcon.default,
  PlaceholderIcon   : PlaceholderIcon.default,
  HamburgerIcon     : HamburgerIcon.default,
  ConnectLogo       : ConnectLogo.default,
  SwitchButton      : SwitchButton.default
# Redux Forms
  InputFormField    : InputFormField.default
  TextareaFormField : TextareaFormField.default

# Forms
  Form              : Form.default
  Validations       : Validations
  TextInput         : FormFields.default.TextInput
  TextareaInput     : FormFields.default.TextareaInput
  RadioGroupInput   : FormFields.default.RadioGroupInput
  SubmitButton      : FormFields.default.SubmitButton
  SliderRadioGroupInput : FormFields.default.SliderRadioGroupInput
  TiledCheckboxInput: FormFields.default.TiledCheckboxInput
  BaseInputField    : BaseInputField.default
