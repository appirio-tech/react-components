require('./SelectDropdown.scss')

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Dropdown from '../Dropdown/Dropdown'

class SelectDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = _.assign(this.state, { selectedOption : null })
  }

  handleClick(option) {
    this.setState({ selectedOption : option }, function() {
      if (this.props.onSelect && typeof this.props.onSelect === 'function')  {
        this.props.onSelect(this.state.selectedOption)
      }
    })
  }

  render() {
    const { options, theme, className } = this.props
    const { selectedOption } = this.state
    let selectedValue = selectedOption ? selectedOption.value : options[0].value

    const renderOption = (option, optIdx) => {
      const handleOptionClick = this.handleClick.bind(this, option)
      return (
        <li key={ optIdx } className="dropdown-menu-list-item" onClick={ handleOptionClick }>
          <a href="javascript:;">{ option.value }</a>
        </li>
      )
    }
    const ddClasses = {}
    if (className) ddClasses[className] = true
    ddClasses['SelectDropdown'] = true
    return (
      <Dropdown theme={ theme } className={ classNames(ddClasses) } noPointer>
        <div className="dropdown-menu-header"><span className="tc-link">{ selectedValue }</span></div>
        <ul className="dropdown-menu-list">
          { options.map(renderOption) }
        </ul>
      </Dropdown>
    )
  }
}

SelectDropdown.propTypes = {
  onSelect : PropTypes.func,
  options  : PropTypes.arrayOf(React.PropTypes.object).isRequired,
  theme    : PropTypes.string
}

export default SelectDropdown