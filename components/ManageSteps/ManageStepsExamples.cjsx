'use strict'

require './ManageStepsExamples.scss'

React       = require 'react'
ManageSteps = require './ManageSteps.coffee'
Provider    = require('react-redux').Provider
store       = require('appirio-tech-client-app-layer').default

initialData =
  stepsByProject:
    abc:
      items: []

storeInstance = store(initialData)

permissions = ['READ']

component = ->
  <Provider store={storeInstance}>
    <div className="ManageStepsExamples light-bg">
      <h1>Example with data</h1>

      <ManageSteps projectId="1435677908878-f5e91b34-9ea1-407d-b882-0022ea2de0da" permissions={permissions}/>

      <h1>Example with no data</h1>

      <ManageSteps projectId="abc" permissions={permissions} />
    </div>
  </Provider>


module.exports = component