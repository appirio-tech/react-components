'use strict'

React    = require 'react'
StepRow  = require './StepRow.coffee'
Provider = require('react-redux').Provider
store    = require('appirio-tech-client-app-layer').default

initialData =
  entities:
    steps:
      abc:
        name     : 'batman'
        startsAt : '2015-12-01'
        endsAt   : '2015-12-01'
        stepType : 'designConcepts'
        status   : 'PROJECT_LAUNCHED'
        details  :
          submissionsDueBy: '2015-12-01'

  stepsByProject:
    abc:
      items: []

storeInstance = store(initialData)

component = ->
  <Provider store={storeInstance}>
    <div className="StepRowExample">
      <h1>Example with state edit</h1>

      <StepRow formKey="abc" projectId="abc" stepId="abc" />

      <h1> Example with no data or state</h1>

      <StepRow projectId="def" formKey="new" isNew={true} />
    </div>
  </Provider>


module.exports = component