import _ from 'lodash';
import React, { Component, PropTypes as PT } from 'react';
import Dropdown from 'react-dropdown'
import './SortingSelectBar.scss';

const { string, arrayOf, func } = React.PropTypes;

class SortingSelectBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSortingOption: props.value,
      optionsVisible: false,
    };
  }

  onViewOptions() {
    this.setState({ optionsVisible: true });
  }

  onSelectOption(optionName) {
    console.log(optionName);
    this.props.onSortingSelect(optionName);
    this.setState({ selectedSortingOption: optionName });
  }

  _onSelect(optionName) {
    console.log(optionName);
  }

  render() {
    const { filterName, sortingOptions } = this.props;
    const { selectedSortingOption, optionsVisible } = this.state;
    let options;

    if (optionsVisible) {
      options = (
        <div className="view-options">
          {
            sortingOptions.map(optionName => (
              <button
                className="view-option"
                key={`${filterName.replace(/\s+/g, '-').toLowerCase()}-${optionName}-sorting-bar`}
                onClick={() => this.onSelectOption(optionName)}
              >
                {optionName}
              </button>
            ))
          }
        </div>
      );
    }

    // temporary dropdown options
    const dropdownOptions = ['one', 'two', 'three'];
    const defaultOption = dropdownOptions[0];

    return (
      <div className="sortingBar">
        <h1 className="title">{filterName}</h1>
        <div className="view-options-toggle-container">
          <p className="view-options-toggle-container-label">
            Sort by:
          </p>
          <Dropdown options={sortingOptions} onChange={optionName => this.onSelectOption(optionName.value)} value={selectedSortingOption} placeholder="Select an option" />
        </div>
        {options}
      </div>
    );
  }
}

SortingSelectBar.defaultProps = {
  onSortingSelect: _.noop,
  value: '',
  sortingOptions: [],
  filterName: '',
};

SortingSelectBar.propTypes = {
  filterName: PT.string,
  sortingOptions: PT.arrayOf(PT.string),
  onSortingSelect: PT.func
};

export default SortingSelectBar;
