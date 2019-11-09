import React                         from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExampleApp                    from '../ExampleApp/ExampleApp.jsx'

import FormExamplesReact16                  from '../Formsy/FormExamplesReact16.jsx'

const renderApp = (component) => () => (
  <ExampleApp>
    {component}
  </ExampleApp>
)

const Component = () => (
    <BrowserRouter>
      <Switch>
        <Route path="/FormExamplesReact16">
          {renderApp(<FormExamplesReact16 />)}
        </Route>
      </Switch>
    </BrowserRouter>
)

export default Component
