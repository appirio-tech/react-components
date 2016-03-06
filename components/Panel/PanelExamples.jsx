'use strict'

var Panel = require('./Panel.jsx')
var React  = require('react')

var PanelExample = {
  render: function() {
    var dom =
      <div>
        <Panel expandTrigger="expand-trigger">
          <div className="panel-header">
            Header
            <a className="expand-trigger">Click Me</a>
          </div>
          <div className="panel-body">
            Body
          </div>
        </Panel>
      </div>
    return dom;
  }
}

module.exports = React.createClass(PanelExample)
