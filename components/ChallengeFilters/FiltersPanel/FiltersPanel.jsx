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
import React from 'react';
import Select from 'react-select';
import moment from 'moment';

import './FiltersPanel.scss';
import DateRangePicker from '../DateRangePicker/DateRangePicker.jsx';

// Default state: no filters are set.
const DEFAULT_STATE = {
  endDate: null,
  keywords: [],
  startDate: null,
  tracks: [],
}

class FiltersPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  };

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
            <label>Keywords</label>
            <Select
              multi={true}
              onChange={value => this.setState({ keywords: value ? value.split(',') : [] }, this.filter)}
              options={this.props.validKeywords}
              value={this.state.keywords.join(',')}
            />
          </div>
          <div className="filter" id="track">
            <label>Track</label>
            <Select
              multi={true}
              onChange={value => this.setState({ tracks: value ? value.split(',') : [] }, this.filter)}
              options={this.props.validTracks}
              value={this.state.tracks.join(',')}
            />
          </div>
          <div className="filter" id="dates">
            <label>Date range</label>
            <DateRangePicker
              endDate={this.state.endDate}
              onDatesChange={dates => this.setState(dates, this.filter)}
              startDate={this.state.startDate}
            />
          </div>
        </div>
        <div id="buttons">
          <button
            className="white"
            onClick={() => this.setState(DEFAULT_STATE, this.filter)}>
            Clear filters
          </button>
          <button className="blue">Save filter</button>
        </div>
      </div>
    );
  };
};

export default FiltersPanel;
