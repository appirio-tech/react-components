import _ from 'lodash';
import React, { Component } from 'react';
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
    this.props.onSortingSelect(optionName);
    this.setState({ selectedSortingOption: optionName });
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

    return (
      <div className="sortingBar">
        <h1 className="title">{filterName}</h1>
        <div className="view-options-toggle-container">
          <p className="view-options-toggle-container-label">
            Sort by:
          </p>
          <button
            className="view-options-toggle"
            onClick={() => this.setState({ optionsVisible: !this.state.optionsVisible })}
          >
            {selectedSortingOption}
            <div className="down-arrow" />
          </button>
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
  filterName: string,
  sortingOptions: arrayOf(string),
  onSortingSelect: func,
  value: string,
};

export default SortingSelectBar;
