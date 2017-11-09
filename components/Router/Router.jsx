import React                         from 'react'
import { Provider }                  from 'react-redux'
import store                         from '../../store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import ExampleApp                    from '../ExampleApp/ExampleApp.jsx'
const UploadedFileExamples          = require('../UploadedFile/UploadedFileExamples.cjsx')
const UploadedFilesExamples         = require('../UploadedFiles/UploadedFilesExamples.cjsx')
const FileUploaderExamples          = require('../FileUploader/FileUploaderExamples.cjsx')
const FileUploaderContainerExamples = require('../FileUploader/FileUploaderContainerExamples.cjsx')
import AvatarExamples                from '../Avatar/AvatarExamples.jsx'
const CheckboxExamples              = require('../Checkbox/CheckboxExamples.cjsx')
import ImageViewerHeaderExamples     from '../ImageViewerHeader/ImageViewerHeaderExamples.jsx'
const ImageViewerExamples           = require('../ImageViewer/ImageViewerExamples.cjsx')
const LoaderExamples                = require('../Loader/LoaderExamples.cjsx')
const ManageStepsExamples           = require('../ManageSteps/ManageStepsExamples.cjsx')
const StepRowExamples               = require('../StepRow/StepRowExamples.cjsx')
import PanelExamples                 from '../Panel/PanelExamples.jsx'
import StandardListItemExamples      from '../StandardListItem/StandardListItemExamples.jsx'
import MenuBarExamples               from '../MenuBar/MenuBarExamples.jsx'
import DropdownExamples              from '../Dropdown/DropdownExamples.jsx'
import UserDropdownMenuExamples      from '../UserDropdownMenu/UserDropdownMenuExamples.jsx'
import QuickLinksExample             from '../QuickLinks/QuickLinksExample.jsx'
import SearchSuggestionsExamples     from '../SearchSuggestions/SearchSuggestionsExamples.jsx'
import SearchBarExample              from '../SearchBar/SearchBarExamples.jsx'
import NavbarExample                 from '../Navbar/NavbarExample.jsx'
import TCFooterExamples              from '../TCFooter/TCFooterExamples.jsx'
import CarouselExamples              from '../Carousel/CarouselExamples.jsx'
import SubNavExamples                from '../SubNav/SubNavExamples.jsx'
import TaggedValueExamples           from '../TaggedValue/TaggedValueExamples.jsx'
import SubTrackDetailsExample        from '../SubTrackDetails/SubTrackDetailsExample.jsx'
import PrizeExamples                 from '../Prize/PrizeExamples.jsx'
import TooltipExamples               from '../Tooltip/TooltipExamples.jsx'
import ProgressBarExample            from '../ProgressBar/ProgressBarExample.jsx'
import RichDataTableExample          from '../RichDataTable/RichDataTableExample.jsx'

const renderApp = (component) => () => (
  <ExampleApp>
    {component}
  </ExampleApp>
)

const Component = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={renderApp(<AvatarExamples />)}/>

        <Route path="/FileUploaderContainerExamples" render={renderApp(<FileUploaderContainerExamples/>)} />

        <Route path="/UploadedFileExamples" render={renderApp(<UploadedFileExamples />)} />

        <Route path="/UploadedFilesExamples" render={renderApp(<UploadedFilesExamples />)} />

        <Route path="/FileUploaderExamples" render={renderApp(<FileUploaderExamples />)} />

        <Route path="/CheckboxExamples" render={renderApp(<CheckboxExamples />)} />

        <Route path="/ImageViewerHeaderExamples" render={renderApp(<ImageViewerHeaderExamples />)} />

        <Route path="/ImageViewerExamples" render={renderApp(<ImageViewerExamples />)} />

        <Route path="/LoaderExamples" render={renderApp(<LoaderExamples />)} />

        <Route path="/ManageStepsExamples" render={renderApp(<ManageStepsExamples />)} />

        <Route path="/StepRowExamples" render={renderApp(<StepRowExamples />)} />

        <Route path="/PanelExamples" render={renderApp(<PanelExamples />)} />

        <Route path="/StandardListItemExamples" render={renderApp(<StandardListItemExamples />)} />

        <Route path="/MenuBarExamples" render={renderApp(<MenuBarExamples />)} />

        <Route path="/DropdownExamples" render={renderApp(<DropdownExamples />)} />

        <Route path="/UserDropdownMenuExamples" render={renderApp(<UserDropdownMenuExamples />)} />

        <Route path="/QuickLinksExample" render={renderApp(<QuickLinksExample />)} />

        <Route path="/SearchSuggestionsExamples" render={renderApp(<SearchSuggestionsExamples />)} />

        <Route path="/SearchBarExample" render={renderApp(<SearchBarExample />)} />

        <Route path="/NavbarExample" render={renderApp(<NavbarExample />)} />

        <Route path="/TCFooterExamples" render={renderApp(<TCFooterExamples />)} />
        
        <Route path="/TaggedValueExamples" render={renderApp(<TaggedValueExamples />)} />

        <Route path="/CarouselExamples" render={renderApp(<CarouselExamples />)} />

        <Route path="/SubNavExamples" render={renderApp(<SubNavExamples />)} />

        <Route path="/SubTrackDetailsExample" render={renderApp(<SubTrackDetailsExample />)} />

        <Route path="/PrizeExamples" render={renderApp(<PrizeExamples />)} />

        <Route path="/TooltipExamples" render={renderApp(<TooltipExamples />)} />
        
        <Route path="/ProgressBarExample" render={renderApp(<ProgressBarExample />)} />
        
        <Route path="/RichDataTableExample" render={renderApp(<RichDataTableExample />)} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Component
