import React from 'react'
import Panel from './Panel'

const PanelExample = () => (
  <Panel expandTrigger="expand-trigger">
    <div className="panel-header">
      Header
      <a className="expand-trigger">Click Me</a>
    </div>

    <div className="panel-body">
      Body
    </div>
  </Panel>
)

module.exports = PanelExample
