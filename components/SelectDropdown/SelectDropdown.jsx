require('./SelectDropdown.scss')

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
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
    const { options, theme } = this.props
    const { selectedOption } = this.state
    let selectedValue = selectedOption ? selectedOption.value : options[0].value

    const renderOption = (option, optIdx) => {
      const handleOptionClick = this.handleClick.bind(this, option)
      return (
        <li key={ optIdx } className="dropdown-menu-list-item" onClick={ handleOptionClick }>
          <a href="javascript:;">{ option.title ? option.title : option.value }</a>
        </li>
      )
    }
    return (
      <Dropdown theme={ theme } className="SelectDropdown" noPointer>
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