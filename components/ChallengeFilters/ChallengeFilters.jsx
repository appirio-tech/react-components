/**
 * Challenge search & filters panel.
 *
 * It consists of the always visible search panel and of the filters pannel,
 * which can be hidden/shown by the dedicated switch in the search panel.
 *
 * Thus the search panel contains:
 *  - Search string input field & search button;
 *  - Data Science / Design / Development switches;
 *  - Filters panel hide/show switch.
 *
 * For the content of filters panel look into docs of the FiltersPanel component.
 *
 * This component accepts two optional callbacks via the 'onFilter' and 'onSearch'
 * properties.
 *
 * When provided, the 'onFilter' callback is triggered each time the user changes
 * any filter. An auxiliary filter function is passed in as the first argument.
 * That function can be passed into the .filter() method of challenge objects
 * array to filter it according to the current set of filters.
 *
 * When provided, the 'onSearch' callback is triggered each time the user presses
 * Enter inside the search input field, or clicks the search button next to that
 * field. The search&filter query string is passed as the first argument into
 * this callback. This query string can be appended to a call to V2 TopCoder API
 * to perform the search. IMPORTANT: As it seems that V2 API is not really compatible
 * with the search and filtering demanded, in the current implementation an empty
 * string is passed into the first argument of this callback, and the next three
 * arguments are used to pass in:
 *  - The search string;
 *  - The set of Data Science / Design / Development switch values,
 *    which is a JS set of DATA_SCIENCE_TRACK, DESIGN_TRACK, and DEVELOP_TRACK
 *    constants;
 *  - The filter function.
 * Using this data we can use existing V2 API to fetch challenges from the
 * Design and Development tracks, and then filter them on the front-end side.
 */

import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import ChallengeSearchBar from './ChallengeSearchBar/ChallengeSearchBar.jsx';
import FiltersPanel from './FiltersPanel/FiltersPanel.jsx';
import FiltersSwitch from './FiltersSwitch/FiltersSwitch.jsx';
import SimpleSwitch from './SimpleSwitch/SimpleSwitch.jsx';
import FiltersCardsType from './FiltersCardsType/FiltersCardsType.jsx';
import './ChallengeFilters.scss';

const DATA_SCIENCE_TRACK = 'datasci';
const DESIGN_TRACK = 'design';
const DEVELOP_TRACK = 'develop';

class ChallengeFilters extends React.Component {

  constructor(props) {
    super(props);
    this.activeFilters = {
      keywords: [],
      tracks: [],
    };
    this.state = {
      filtersCount: 0,
      showFilters: false,
    };
    this.tracks = new Set();
  };

  /**
   * Generates, for the specified set of filters, the filter function, which can
   * be passed into the filter method of an array of challenges to filter them.
   * @param {Object} filters The object received from the FiltersPanel component.
   * @return {Function(Object)} This function takes a challenge object,
   *  and returns 'true' if that challenge passes the filter.
   */
  generateFilterFunction(filters) {

    // In case the startDate or endDate are present, we clone filters, and convert
    // these fields from 'moment' objects into ISO strings. This allows to use Date
    // object to manipulate with dates inside the filter function. This, in turns,
    // simplifies serialization / deserialization of filter functions to / from
    // strings, which is necessary when we save filter functions.
    if (filters.startDate || filters.endDate) {
      filters = _.clone(filters);
      if (filters.startDate) filters.startDate = filters.startDate.toISOString();
      if (filters.endDate) filters.endDate = filters.endDate.toISOString();
    }

    return item => {

      // Takes a challenge object, and a keywords array.
      // Returns 'true' if keywords array is empty, or at least one of the keywords
      // can be found inside the challenge name, platforms or technologies.
      const keywordsFilter = (item, keywords) => {
        let platforms = ''
        if (!keywords.length || (keywords.length === 1 && !keywords[0])) return true;
        if (item.platforms) { platforms = item.platforms.join(' '); }
        const technologies = item.technologies.join(' ');
        const data = `${item.challengeName} ${platforms} ${technologies}`.toLowerCase();
        for (let i = 0; i < keywords.length; ++i) {
          if (data.indexOf(keywords[i].toLowerCase()) >= 0) return true;
        }
        return false;
      };

      if (!keywordsFilter(item, filters.keywords)) return false;
      if (filters.tracks.length && !filters.tracks.includes(item.challengeType)) return false;
      if (filters.startDate) {
        const fa = new Date(filters.startDate);
        const fb = new Date(item.submissionEndDate);
        if (fa.getTime() > fb.getTime()) return false;
      }
      if (filters.endDate) {
        const fa = new Date(filters.endDate);
        const fb = new Date(item.postingDate);
        if (fa.getTime() < fb.getTime()) return false;
      }
      return true;
    };
  };

  /**
   * Generates, for the specified set of filters, the filter function, which can
   * be passed into the filter method of an array of challenges to filter them.
   * Unlike generateFilterFunction(), this method wraps the filters object into
   * the function, so that it can be serialized using toString() method, and
   * deserialized later using eval().
   * @param {Object} filters The object received from the FiltersPanel component.
   * @return {Function(Object)} This function takes a challenge object,
   *  and returns 'true' if that challenge passes the filter.
   */
  generateSerializableFilterFunction(filters) {
    let res;
    eval(`res = function(item) {
      const filters = ${JSON.stringify(filters)};
      const filter = ${this.generateFilterFunction(filters).toString()};
      return filter(item);
    }`);
    return res;
  }

  /**
   * Updates the count of active filters (displayed in the filter panel switch),
   * caches the set of active filters for subsequent searches, and triggers the
   * 'onFilter' callback provided by the parent component, if any.
   *
   * When the parent 'onFilter' callback is triggered, an auxiliary filter function
   * is passed in as the first argument. That filter function should be passed into
   * the .filter() method of the challenge objects array to perform the filtering.
   *
   * @param {Object} filters Filters object, received from the FiltersPanel component.
   */
  onFilter(filters) {
    this.activeFilters = filters;
    let filtersCount = filters.keywords.length + filters.tracks.length;
    if (filters.endDate || filters.startDate) ++filtersCount;
    if (filtersCount !== this.state.filtersCount) this.setState({filtersCount});
    if (this.props.onFilter) this.props.onFilter(this.generateFilterFunction(filters));
  };

  /**
   * Triggers the 'onSearch' callback provided by the parent component, if any.
   *
   * The challenge query string for V2 API is passed into the callback as the
   * first argument. As V2 API does not really support the intended searching
   * and filtering, at the moment an empty string is always passed into the
   * first argument, and all search & filtering data are passed into the next
   * three arguments:
   *  - The search string;
   *  - The set of values of Data Science / Design / Development track switches
   *    (JS Set of DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK constants);
   *  - The filter function.
   *
   * @param {String} searchString
   */
  onSearch(searchString) {
    if (!this.props.onSearch) return;
    const filter = this.activeFilters ? this.generateFilterFunction(this.activeFilters) : () => true;
    this.props.onSearch('', searchString, this.tracks, filter);
  };

  render() {
    return (
      <div className="challenge-filters">
        <div className="filter-header">
          <FiltersCardsType setCardType={this.props.setCardType} isCardTypeSet={this.props.isCardTypeSet}></FiltersCardsType>
          <ChallengeSearchBar
            onSearch={str => this.onSearch(str)}
            placeholder="Search Challenges"
          />
          <SimpleSwitch label="Design" onSwitch={on => this.setTrack(DESIGN_TRACK, on)} />
          <SimpleSwitch label="Development" onSwitch={on => this.setTrack(DEVELOP_TRACK, on)} />
          <SimpleSwitch label="Data Science" onSwitch={on => this.setTrack(DATA_SCIENCE_TRACK, on)} />
          <FiltersSwitch
            active={this.state.showFilters}
            filtersCount={this.state.filtersCount}
            onSwitch={active => this.setState({ showFilters: active })}
          />
        </div>
        <FiltersPanel
          hidden={!this.state.showFilters}
          onFilter={filters => this.onFilter(filters)}
          onSaveFilter={() => this.props.onSaveFilter(this.generateSerializableFilterFunction(this.activeFilters))}
          validKeywords={this.props.validKeywords}
          validTracks={this.props.validTracks}
        />
      </div>
    );
  };

  /**
   * Sets/unsets the specified track in the this.tracks set.
   * @param {String} track One of DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK.
   * @param {Boolean} set True to include the track into the set, false to remove it.
   */
  setTrack(track, set) {
    if (set) this.tracks.add(track);
    else this.tracks.delete(track);
    this.props.onTrackSwitch(this.tracks);
  };
};

ChallengeFilters.defaultProps = {
  onSaveFilter: _.noop,
  onTrackSwitch: _.noop,
};

export {
  DATA_SCIENCE_TRACK,
  DESIGN_TRACK,
  DEVELOP_TRACK,
  ChallengeFilters,
};
