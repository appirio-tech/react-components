/**
 * Challenge filters panel.
 *
 * It contains:
 *  - Challenge keywords filter;
 *  - Challenge tracks filter;
 *  - Challenge dates range filter;
 *  - Clear and save filter buttons.
 *
 * Challenge keywords and tracks filters allow to choose multiple keywords from
 * the predefined sets, which should be passed into the component as string arrays
 * via the 'validKeywords' and 'validTracks' properties. The whole filters panel
 * can be hidden/displayed by setting the boolean 'hidden' property.
 *
 * Each time the user modifies any filter, this component triggers the callback
 * provided via the 'onFilter' property, if any, passing in the current filters,
 * formated as the following object:
 * {
 *  endDate: momentObj,
 *  keywords: string[],
 *  startDate: momentObj,
 *  tracks: string[],
 * }
 * The parent component should use this object to implement the actual filtering.
 */

import 'react-dates/lib/css/_datepicker.css';
import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import Select from 'react-select';

import './FiltersPanel.scss';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

// Default state: no filters are set.
const DEFAULT_STATE = {
  endDate: null,
  keywords: [],
  startDate: null,
  tracks: [],
};

class FiltersPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  /**
   * Triggers the 'onFilter' callback, if it is provided in properties.
   */
  filter() {
    if (this.props.onFilter) this.props.onFilter(this.state);
  }

  render() {
    let className = 'FiltersPanel';
    if (this.props.hidden) className += ' hidden';

    return (
      <div className={className}>
        <div id="filters">
          <div className="filter" id="keywords">
            <label htmlFor="keyword-select">Keywords</label>
            <Select
              id="keyword-select"
              multi
              onChange={value => this.setState({ keywords: value ? value.split(',') : [] }, this.filter)}
              options={this.props.validKeywords}
              simpleValue
              value={this.state.keywords.join(',')}
            />
          </div>
          <div className="filter-row">
            <div className="filter" id="track">
              <label htmlFor="track-select">Subtrack</label>
              <Select
                id="track-select"
                multi
                onChange={value => this.setState({ tracks: value ? value.split(',') : [] }, this.filter)}
                options={this.props.validTracks}
                simpleValue
                value={this.state.tracks.join(',')}
              />
            </div>
            <div className="filter" id="dates">
              <label htmlFor="date-range-picker">Date range</label>
              <DateRangePicker
                endDate={this.state.endDate}
                id="date-range-picker"
                onDatesChange={dates => this.setState(dates, this.filter)}
                startDate={this.state.startDate}
              />
            </div>
          </div>
        </div>
        <div id="buttons">
          <button
            className="white tc-outline-btn"
            onClick={() => this.setState(DEFAULT_STATE, this.filter)}
          >
            Clear filters
          </button>
          <button
            className="blue tc-blue-btn"
            onClick={this.props.onSaveFilter}
          >
            Save filter
          </button>
        </div>
      </div>
    );
  }
}

FiltersPanel.defaultProps = {
  hidden: false,
  onFilter: _.noop,
  onSaveFilter: _.noop,
};

const SelectOptions = PT.arrayOf(
  PT.shape({
    label: PT.string.isRequired,
    value: PT.string.isRequired,
  }),
);

FiltersPanel.propTypes = {
  hidden: PT.bool,
  onFilter: PT.func,
  onSaveFilter: PT.func,
  validKeywords: SelectOptions.isRequired,
  validTracks: SelectOptions.isRequired,
};

export default FiltersPanel;
