require('./Panel.scss')
var React = require('react')

var Panel = {
  getInitialState: function() {
    return {expanded: true};
  },
  handleClick: function(event) {
    if (this.props.expandTrigger && event.target.className.indexOf(this.props.expandTrigger) !== -1) {
      this.setState({expanded: !this.state.expanded});
    }
  },
  render: function() {
    var header = <div className="panel-header" onClick={this.handleClick}>
      {
        React.Children.map(this.props.children, function(child) {
          if (child.props.className === 'panel-header')
            return child.props.children;

        })
      }
    </div>
    var body = <div className="panel-body">
      {
        React.Children.map(this.props.children, function(child) {
          if (child.props.className === 'panel-body')
            return child.props.children;

        })
      }
    </div>
    if(this.state.expanded === false) {
      body = null;
    }
    var dom = <div className="panel">
      {header}
      {body}
    </div>
    return dom;
  }
}

module.exports = React.createClass(Panel)