'use strict'

require('./NavbarDropdown.scss');
var React    = require('react');

var NavbarDropdown = {
  getInitialState: function() {
    return { isHidden: true };
  },
  onClick: function() {
    this.setState({ isHidden: !this.state.isHidden });
  },
  render: function() {
    var pointerShadow = this.props.pointerShadow,
        noPointer = this.props.noPointer,
        ndClasses = 'NavbarDropdown';

    if (pointerShadow) {
      ndClasses += ' pointer-shadow';
    }

    if (noPointer) {
      ndClasses += ' pointer-hide';
    }

    if (this.state.isHidden) {
      ndClasses += ' hide';
    }

    return (
      <div onClick={ this.onClick }>
        { this.props.children[0] }

        <div className = {ndClasses}>
          { this.props.children[1] }        
        </div>
      </div>
    );
  }
};

module.exports = React.createClass(NavbarDropdown);
