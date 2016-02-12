'use strict'

require './PageSectionExamples.scss'
PageSection = require './PageSection.cjsx'
React  = require 'react'

PageSectionExample = ->
  <div className="PageSectionExample flex column middle center">
    <h1>Page Section</h1>

    <div className="page-section--ready">

      <p>Page Section with Ready state</p>

      <PageSection contentState="READY">
        <span>Hello</span>
      </PageSection>
    </div>

    <div className="page-section--loading">
      <p>Page Section with Loading state</p>

      <PageSection contentState="LOADING">
      </PageSection>
    </div>
  </div>

module.exports = PageSectionExample
