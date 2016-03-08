'use strict'

require('./Dropdown.scss')
let React    = require('react')

let Dropdown = {
  getInitialState: function() {
    return { isHidden: true }
  },
  onClickOutside: function(evt) {
    let currNode = evt.target
    let isDropdown = false

    do {
      if(currNode.className.indexOf('dropdown-wrap') > -1) {
        isDropdown = true
        break
      }

      currNode = currNode.parentNode;
    } while(currNode.tagName)

    if(!isDropdown) {
      this.setState({ isHidden: true })
    }
  },
  onClick: function(evt) {
    let dropdownClicked = new Event('dropdownClicked')

    document.dispatchEvent(dropdownClicked)

    this.setState({ isHidden: !this.state.isHidden })
    evt.stopPropagation();
  },
  onClickOtherDropdown: function() {
    this.setState({ isHidden: true })
  },
  componentDidMount: function() {
    document.removeEventListener('click', this.onClickOutside)
    document.removeEventListener('dropdownClicked', this.onClickOtherDropdown)

    document.addEventListener('click', this.onClickOutside)
    document.addEventListener('dropdownClicked', this.onClickOtherDropdown)
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this.onClickOutside)
    document.removeEventListener('dropdownClicked', this.onClickOtherDropdown)
  },
  render: function() {
    let pointerShadow = this.props.pointerShadow
    let noPointer = this.props.noPointer
    let ndClasses = 'Dropdown'

    if (pointerShadow) {
      ndClasses += ' pointer-shadow'
    }

    if (noPointer) {
      ndClasses += ' pointer-hide'
    }

    if (this.state.isHidden) {
      ndClasses += ' hide'
    }

    return (
      <div className="dropdown-wrap" onClick={ this.onClick } ref="Dropdown">
        { this.props.children[0] }

        <div className = {ndClasses}>
          { this.props.children[1] }        
        </div>
      </div>
    )
  }
};

module.exports = React.createClass(Dropdown);
