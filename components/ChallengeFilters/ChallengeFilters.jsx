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
import React, { PropTypes as PT } from 'react';
import ChallengeFilter, { DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK } from './ChallengeFilter';
import ChallengeSearchBar from './ChallengeSearchBar/ChallengeSearchBar';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import FiltersSwitch from './FiltersSwitch/FiltersSwitch';
import SimpleSwitch from './SimpleSwitch/SimpleSwitch';
import FiltersCardsType from './FiltersCardsType/FiltersCardsType';
import './ChallengeFilters.scss';

class ChallengeFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: props.filter,
      filtersCount: props.filter.count(),
      showFilters: false,
    };
  }

  /**
   * Clears the filters.
   */
  onClearFilters() {
    const filter = new ChallengeFilter();
    this.setState({ filter, filtersCount: 0 });
    this.props.onFilter(filter);
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
  onFilter(filter) {
    const f = (new ChallengeFilter(this.state.filter)).merge(filter);
    this.setState({
      filter: f,
      filtersCount: filter.count(),
    });
    this.props.onFilter(f);
  }

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
    this.props.onSearch(searchString, this.state.filter);
  }

  /**
   * Sets the keywords filter in the FilterPanel to the specified value.
   * @param {String} keywords A comma-separated list of the keywords.
   */
  setKeywords(keywords) {
    if (this.filtersPanel) this.filtersPanel.onKeywordsChanged([keywords]);
  }

  /**
   * Sets/unsets the specified track in the this.tracks set.
   * @param {String} community One of DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK.
   * @param {Boolean} set True to include the track into the set, false to remove it.
   */
  setTracks(track, set) {
    const filter = new ChallengeFilter(this.state.filter);
    if (set) filter.tracks.add(track);
    else filter.tracks.delete(track);
    this.props.onFilter(filter);
    this.setState({ filter });
  }

  render() {
    return (
      <div className="challenge-filters" ref={this.props.ref}>
        <div className="filter-header">
          <FiltersCardsType
            isCardTypeSet={this.props.isCardTypeSet}
            setCardType={this.props.setCardType}
          />
          <ChallengeSearchBar
            onSearch={str => this.onSearch(str)}
            placeholder="Search Challenges"
          />
          <SimpleSwitch
            checked={this.state.filter.tracks.has(DESIGN_TRACK)}
            label="Design"
            onSwitch={on => this.setTracks(DESIGN_TRACK, on)}
          />
          <SimpleSwitch
            checked={this.state.filter.tracks.has(DEVELOP_TRACK)}
            label="Development"
            onSwitch={on => this.setTracks(DEVELOP_TRACK, on)}
          />
          <SimpleSwitch
            checked={this.state.filter.tracks.has(DATA_SCIENCE_TRACK)}
            label="Data Science"
            onSwitch={on => this.setTracks(DATA_SCIENCE_TRACK, on)}
          />
          <FiltersSwitch
            active={this.state.showFilters}
            filtersCount={this.state.filtersCount}
            onSwitch={active => this.setState({ showFilters: active })}
          />
        </div>
        <FiltersPanel
          hidden={!this.state.showFilters}
          filter={this.state.filter}
          onClearFilters={() => this.onClearFilters()}
          onFilter={filter => this.onFilter(filter)}
          onSaveFilter={() => this.props.onSaveFilter(this.state.filter)}
          ref={(node) => { this.filtersPanel = node; }}
          validKeywords={this.props.validKeywords}
          validSubtracks={this.props.validSubtracks}
        />
      </div>
    );
  }
}

const TagShape = PT.shape({
  label: PT.string.isRequired,
  value: PT.string.isRequired,
});

ChallengeFilters.defaultProps = {
  filter: new ChallengeFilter(),
  isCardTypeSet: '',
  onFilter: _.noop,
  onSaveFilter: _.noop,
  onSearch: _.noop,
  ref: _.noop,
  setCardType: _.noop,
};

ChallengeFilters.propTypes = {
  filter: PT.instanceOf(ChallengeFilter),
  isCardTypeSet: PT.string,
  onFilter: PT.func,
  onSearch: PT.func,
  onSaveFilter: PT.func,
  setCardType: PT.func,
  ref: PT.func,
  validKeywords: PT.arrayOf(TagShape).isRequired,
  validSubtracks: PT.arrayOf(TagShape).isRequired,
};

export default ChallengeFilters;
