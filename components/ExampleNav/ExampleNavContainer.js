import React, { Component } from 'react'
import ExampleNav from './ExampleNav.jsx'

const navs = {
  Navbar: [
    'DropdownExamples',
    'UserDropdownMenuExamples',
    'QuickLinksExample',
    'SearchSuggestionsExamples',
    'SearchBarExample',
    'NavbarExample',
    'TCFooterExamples',
    'MenuBarExamples',
    'TabsExamples'
  ],
  FileUploader: [
    'FileUploaderContainerExamples',
    'FileUploaderExamples',
    'UploadedFileExamples',
    'UploadedFilesExamples',
    'FilePickerExample'
  ],
  Misc: [
    'CheckboxExamples',
    'ImageViewerHeaderExamples',
    'ImageViewerExamples',
    'LoaderExamples',
    'PanelExamples',
    'StandardListItemExamples',
    'TooltipExamples',
    'RadioGroupExample',
    'DrawerExamples',
    'IconsExamples',
    'FormExamples'
  ],
  ManageSteps: [
    'ManageStepsExamples',
    'StepRowExamples'
  ],
  RichDataTable: [
    'RichDataTableExample'
  ],
  Screen: [
    'LoginScreenExamples',
    'WizardExamples'
  ]
}

class ExampleNavContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      root : true,
      links: Object.keys(navs)
    }

    this.onClick = this.onClick.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  onClick(link) {
    this.setState({
      root: false,
      links: navs[link]
    })
  }

  onBack() {
    this.setState({
      root: true,
      links: Object.keys(navs)
    })
  }

  render() {
    const { links, root } = this.state
    const { onClick, onBack } = this

    if (root) {
      return <ExampleNav links={links} onClick={onClick} />
    } else {
      return <ExampleNav links={links} onBack={onBack} />
    }
  }
}

export default ExampleNavContainer
