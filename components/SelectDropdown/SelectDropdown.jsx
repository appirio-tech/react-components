require('./SelectDropdown.scss')

import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown/Dropdown'

class SelectDropdown extends Component {
  constructor(props) {
    super(props)
    let option = null
    if(props && props.options && props.value) {
      option = _.find(props.options, {value: props.value})
    }
    this.state = _.assign(this.state, { selectedOption : option })
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
    let selectedValue = selectedOption ? selectedOption.title : options[0].title

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
  options  : PropTypes.arrayOf(PropTypes.object).isRequired,
  theme    : PropTypes.string
}

export default SelectDropdown