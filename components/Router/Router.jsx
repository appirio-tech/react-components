import React                         from 'react'
import { Provider }                  from 'react-redux'
import store                         from '../../store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

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
import ChallengeCardExamples         from '../ChallengeCard/ChallengeCardExamples.jsx'
import SRMCardExamples               from '../SRMCard/SRMCardExamples.jsx'
import SubmissionManagementExamples  from '../SubmissionManagement/SubmissionManagementExamples.jsx'
import ChallengeFiltersExample       from '../ChallengeFilters/ChallengeFiltersExample.jsx'
import CarouselExamples              from '../Carousel/CarouselExamples.jsx'
import SubNavExamples                from '../SubNav/SubNavExamples.jsx'
import TaggedValueExamples           from '../TaggedValue/TaggedValueExamples.jsx'
import SubTrackDetailsExample        from '../SubTrackDetails/SubTrackDetailsExample.jsx'
import PrizeExamples                 from '../Prize/PrizeExamples.jsx'
import TooltipExamples               from '../Tooltip/TooltipExamples.jsx'
import ProgressBarExample            from '../ProgressBar/ProgressBarExample.jsx'
import ReactSvgLoaderDemo            from '../ReactSvgLoaderDemo'

const Component = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRoute component={AvatarExamples}/>

        <Route path="/FileUploaderContainerExamples" component={FileUploaderContainerExamples}/>

        <Route path="/UploadedFileExamples" component={UploadedFileExamples}/>

        <Route path="/UploadedFilesExamples" component={UploadedFilesExamples}/>

        <Route path="/FileUploaderExamples" component={FileUploaderExamples}/>

        <Route path="/CheckboxExamples" component={CheckboxExamples} />

        <Route path="/ImageViewerHeaderExamples" component={ImageViewerHeaderExamples} />

        <Route path="/ImageViewerExamples" component={ImageViewerExamples} />

        <Route path="/LoaderExamples" component={LoaderExamples} />

        <Route path="/ManageStepsExamples" component={ManageStepsExamples}/>

        <Route path="/StepRowExamples" component={StepRowExamples} />

        <Route path="/PanelExamples" component={PanelExamples} />

        <Route path="/StandardListItemExamples" component={StandardListItemExamples} />

        <Route path="/MenuBarExamples" component={MenuBarExamples} />

        <Route path="/DropdownExamples" component={DropdownExamples} />

        <Route path="/UserDropdownMenuExamples" component={UserDropdownMenuExamples} />

        <Route path="/QuickLinksExample" component={QuickLinksExample} />

        <Route path="/SearchSuggestionsExamples" component={SearchSuggestionsExamples} />

        <Route path="/SearchBarExample" component={SearchBarExample} />

        <Route path="/NavbarExample" component={NavbarExample} />

        <Route path="/TCFooterExamples" component={TCFooterExamples} />

        <Route path="/ChallengeCardExamples" component={ChallengeCardExamples} />

        <Route path="/SRMCardExamples" component={SRMCardExamples} />

        <Route path="/SubmissionManagementExamples" component={SubmissionManagementExamples} />

        <Route path="/ChallengeFiltersExample" component={ChallengeFiltersExample} />

        <Route path="/TaggedValueExamples" component={TaggedValueExamples} />

        <Route path="/CarouselExamples" component={CarouselExamples} />

        <Route path="/SubNavExamples" component={SubNavExamples} />

        <Route path="/SubTrackDetailsExample" component={SubTrackDetailsExample} />

        <Route path="/PrizeExamples" component={PrizeExamples}/>

        <Route path="/TooltipExamples" component={TooltipExamples} />

        <Route path="/ProgressBarExample" component={ProgressBarExample}/>

        <Route path="/ReactSvgLoaderDemo" component={ReactSvgLoaderDemo}/>
      </Route>
    </Router>
  </Provider>
)

export default Component
