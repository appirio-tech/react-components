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
 * provided via the 'onFilter' property, if any, passing in the current filter
 * object.
 */

import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import Select from 'react-select';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import FilterPanelFilter from './FilterPanelFilter';
import UiSimpleRemove from '../../Icons/UiSimpleRemove';

import './FiltersPanel.scss';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

class FiltersPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: props.filter,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.setState({
        filter: nextProps.filter,
      });
    }
  }

  /**
   * Clears the the filters.
   * Note that this method does not call the onFilter() callback passed via props,
   * if any, just the onClearFilters().
   */
  onClearFilters() {
    this.props.onClearFilters();
    this.setState({ filter: new FilterPanelFilter() });
  }

  /**
   * Handles updates of the dates filter.
   * @param {Moment} startDate
   * @param {Moment} endDate
   */
  onDatesChanged(startDate, endDate) {
    const filter = new FilterPanelFilter(this.state.filter);
    filter.startDate = moment(startDate);
    filter.endDate = moment(endDate);
    this.props.onFilter(filter);
    this.setState({ filter });
  }

  /**
   * Handles updates of the keywords filter.
   * @param {Array} keywords An array of selected keywords.
   */
  onKeywordsChanged(keywords) {
    const filter = new FilterPanelFilter(this.state.filter);
    filter.keywords = keywords;
    this.props.onFilter(filter);
    this.setState({ filter });
  }

  /**
   * Handles updates of the subtracks filter.
   * @param {Array} subtracks An array of selected subtracks.
   */
  onSubtracksChanged(subtracks) {
    const filter = new FilterPanelFilter(this.state.filter);
    filter.subtracks = subtracks;
    this.props.onFilter(filter);
    this.setState({ filter });
  }

  /**
   * Triggers the 'onFilter' callback, if it is provided in properties.
   */
  filter() {
    this.props.onFilter(this.state.filter);
  }

  render() {
    let className = 'FiltersPanel';
    if (this.props.hidden) className += ' hidden';
    return (
      <div className={className} ref={this.props.ref}>
        <div className="header">
          <span className="title">Filters</span>
          <span className="close-icon" onClick={() => this.props.onClose()}>
            <UiSimpleRemove className="cross" />
          </span>
        </div>
        <div id="filters">
          <div className="filter" id="keywords">
            <label htmlFor="keyword-select">Keywords</label>
            <Select
              id="keyword-select"
              multi
              onChange={value => this.onKeywordsChanged(value ? value.split(',') : [])}
              options={this.props.validKeywords}
              simpleValue
              value={this.state.filter.keywords.join(',')}
            />
          </div>
          <div className="filter-row">
            <div className="filter" id="track">
              <label htmlFor="track-select">Subtrack</label>
              <Select
                id="track-select"
                multi
                onChange={value => this.onSubtracksChanged(value ? value.split(',') : [])}
                options={this.props.validSubtracks}
                simpleValue
                value={this.state.filter.subtracks.join(',')}
              />
            </div>
            <div className="filter" id="dates">
              <label htmlFor="date-range-picker">Date range</label>
              <DateRangePicker
                endDate={this.state.filter.endDate}
                id="date-range-picker"
                onDatesChange={dates => this.onDatesChanged(dates.startDate, dates.endDate)}
                startDate={this.state.filter.startDate}
              />
            </div>
          </div>
        </div>
        <div id="buttons">
          <button
            className="white tc-outline-btn"
            onClick={() => this.onClearFilters()}
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
  filter: new FilterPanelFilter(),
  hidden: false,
  onClearFilters: _.noop,
  onFilter: _.noop,
  onSaveFilter: _.noop,
  ref: _.noop,
  onClose: _.noop,
};

const SelectOptions = PT.arrayOf(
  PT.shape({
    label: PT.string.isRequired,
    value: PT.string.isRequired,
  }),
);

FiltersPanel.propTypes = {
  filter: PT.instanceOf(FilterPanelFilter),
  hidden: PT.bool,
  onClearFilters: PT.func,
  onFilter: PT.func,
  onSaveFilter: PT.func,
  ref: PT.func,
  validKeywords: SelectOptions.isRequired,
  validSubtracks: SelectOptions.isRequired,
  onClose: PT.func,
};

export default FiltersPanel;
