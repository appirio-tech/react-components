import React from 'react'
import ExampleNavContainer from '../ExampleNav/ExampleNavContainer.js'

require('./ExampleApp.scss')

const ExampleApp = ({ children }) => {
  return (
    <div className="ExampleApp">
      <main>{children}</main>

      <ExampleNavContainer />
    </div>
  )
}

export default ExampleApp
