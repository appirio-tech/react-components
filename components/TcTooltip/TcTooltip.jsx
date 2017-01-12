import React from 'react';
import ReactDOM from 'react-dom';

require('./TcTooltip.scss');

class TcTooltip extends React.Component {

  render() {
    const { tooltipContent, cName } = this.props;
    return (
      <span className={"tooltip-link "+cName} ref="target" data-tooltip={tooltipContent}>
        { this.props.children }
      </span>
    )
  }
}

module.exports = TcTooltip
