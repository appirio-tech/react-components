import React, { PropTypes, Component } from 'react'

require('./Panel.scss')

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = { expanded: true }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    if (this.props.expandTrigger && event.target.className.indexOf(this.props.expandTrigger) !== -1) {
      this.setState({expanded: !this.state.expanded})
    }
  }

  render() {
    const header = (
      <div className="panel-header" onClick={this.handleClick}>
        {this.props.children.map(child => {
          if (child.props.className === 'panel-header')
            return child.props.children
        })}
      </div>
    )

    let body = (
      <div className="panel-body">
        {this.props.children.map((child) => {
          if (child.props.className === 'panel-body')
            return child.props.children
        })}
      </div>
    )

    if (!this.state.expanded) {
      body = null
    }

    return (
      <div className="Panel">
        {this.props.showHeader ? header : null}
        {body}
      </div>
    )
  }
}

Panel.propTypes = {
  children     : PropTypes.array.isRequired,
  expandTrigger: PropTypes.string
}

Panel.defaultProps = {
  showHeader : true
}

export default Panel
