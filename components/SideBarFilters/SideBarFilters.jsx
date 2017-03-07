/**
 * Sidebar Filters Component (for an additional filtering of the challenge listing).
 *
 * It renders a list of filters separated in a few sections. Each filter shows
 * the number of challenges matching it, and, when clicked, it is highlighted
 * and triggers the onFilter() callback to order the parent container to filter
 * the challenge listing.
 *
 * This componet has My Filters section, where the filters can be added by
 * the parent component, using the addFilter() method. That section has a button,
 * which switches the sidebar into My Filters Edit mode, where the names of
 * My Filters, and their ordering can be changed. Also the filters can be removed
 * in that mode.
 */

import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import EditMyFilters from './EditMyFilters';
import SideBarFilter, { MODE } from './SideBarFilter';
import { FilterItem } from './FilterItems';
import './SideBarFilters.scss';

const V2_API = 'https://api.topcoder-dev.com/v2';
const CHALLENGES_API = `${V2_API}/challenges/`;
const MY_CHALLENGES_API = `${V2_API}/user/challenges?challengeType=Copilot+Posting,
  Conceptualization,Specification,Architecture,Design,Development,
  RIA+Build+Competition,UI+Prototype+Competition,Assembly+Competition,
  Test+Suites,Test+Scenarios,Content+Creation,Marathon+Match,Bug+Hunt,
  First2Finish,Code&type=active`
const RSS_LINK = 'http://feeds.topcoder.com/challenges/feed?list=active&contestType=all';

/*
 * Default set of filters displayed in the component.
 * Note that groupping of these into difference sections is defined in the jsx
 * layout markup. The js logic behind this does not care about that groupping.
 */
const DEFAULT_FILTERS = [
  new SideBarFilter(MODE.ALL_CHALLENGES),
  new SideBarFilter(MODE.MY_CHALLENGES),
  new SideBarFilter(MODE.OPEN_FOR_REGISTRATION),
  new SideBarFilter(MODE.ONGOING_CHALLENGES),
  new SideBarFilter(MODE.PAST_CHALLENGES),
  new SideBarFilter(MODE.OPEN_FOR_REVIEW),
];

/*
 * This auxiliary object holds the indices of standard filters in the filters array.
 */
const FILTER_ID = {
  ALL_CHALLENGES: 0,
  MY_CHALLENGES: 1,
  OPEN_FOR_REGISTRATION: 2,
  ONGOING_CHALLENGES: 3,
  PAST_CHALLENGES: 4,
  OPEN_FOR_REVIEW: 5,
  FIRST_USER_DEFINED: 6,
};

/*
 * Component modes.
 */
const MODES = {
  EDIT_MY_FILTERS: 0,
  SELECT_FILTER: 1,
};

/*
 * When a new filter is added via the addFilter() method, its name is set equal
 * to `${MY_FILTER_BASE_NAME} N` where N is least integers, which is still larger
 * that all other such indices in the similar filter names.
 */
const MY_FILTER_BASE_NAME = 'My Filter';

const SAVE_FILTERS_API = 'https://lc1-user-settings-service.herokuapp.com/saved-searches';

class SideBarFilters extends React.Component {

  constructor(props) {
    super(props);
    let that = this;
    let myFilters = localStorage.filters ? JSON.parse(localStorage.filters) : [];
    try {
      myFilters = myFilters.map(item => new SideBarFilter(item));
    } catch (e) {
      // Ooops, serialization format for custom filters has changed, we cannot
      // load filters stored in the local storage. Thus, we clear the storage,
      // forget about all previously saved filters.
      // TODO: Probably, some smarter way of tracking serialization format version
      // should be implemented, as we move closer to the final release?
      myFilters = [];
      localStorage.filters = '';
    }
    this.state = {
      currentFilter: DEFAULT_FILTERS[3],
      filters: _.clone(DEFAULT_FILTERS).concat(myFilters),
      mode: MODES.SELECT_FILTER,
    };

    for (let i = 0; i < this.state.filters.length; i += 1) {
      const item = this.state.filters[i];
      item.count = props.challenges.filter(item.getFilterFunction()).length;
    }
    for (let i = 0; i !== this.state.filters.length; i += 1) {
      const f = this.state.filters[i];
      // Match of UUID means that one of the filters we have already matches
      // the one passed from the parent component, so we have just select it,
      // and we can exit the constructor right after.
      if (f.uuid === props.filter.uuid) {
        this.state.currentFilter = f;
        return;
      }
    }
    // A fancy staff: if the parent has passed a filter, which does not exists
    // (it is taken from a deep link), we add it to the list of filters and
    // also select it.
    const f = new SideBarFilter(props.filter);
    f.count = props.challenges.filter(f.getFilterFunction()).length;
    this.state.currentFilter = f;
    this.state.filters.push(f);
  }

  /**
   * When a new array of challenges is passed from the parent component via props,
   * this method updates counters of challenges matching each of the filters in
   * this sidebar.
   */
  componentWillReceiveProps(nextProps) {
    let currentFilter;
    const filters = [];
    this.state.filters.forEach((filter) => {
      const filterClone = new SideBarFilter(filter);
      if (this.state.currentFilter === filter) currentFilter = filterClone;
      filterClone.count = nextProps.challenges.filter(filter.getFilterFunction()).length;
      filters.push(filterClone);
    });
    this.setState({
      currentFilter,
      filters,
    });
  }

  /**
   * When sidebar updates, this method checks that some of the fitlers is highlighted,
   * if not, it resets the current filter to the All Challenges.
   * This allows to handle properly the following situation:
   *  - The user selects a custom filter from My Filters;
   *  - Then it clicks Edit My Filters and remove that filter;
   *  - Then he clicks Done and returns to the standard component mode.
   * Without this method, he will still see the set of challenges filtered by
   * the already removed filter, and no indication in the sidebar, by what filtered
   * they are filtered.
   */
  componentDidUpdate() {
    if (this.state.filters.indexOf(this.state.currentFilter) < 0) {
      this.selectFilter(FILTER_ID.ALL_CHALLENGES);
    }
  }

  /**
   * Generates the default name for a new filter.
   * It will be `${MY_FILTER_BASE_NAME} N`, where N is an integer, which makes
   * this filter name unique among other filters in the sidebar.
   */
  getAvailableFilterName() {
    let maxId = 0;
    for (let i = FILTER_ID.FIRST_USER_DEFINED; i < this.state.filters.length; i += 1) {
      const name = this.state.filters[i].name;
      if (name.startsWith(MY_FILTER_BASE_NAME)) {
        const id = Number(name.slice(1 + MY_FILTER_BASE_NAME.length));
        if (!isNaN(id) && (maxId < id)) maxId = id;
      }
    }
    return `${MY_FILTER_BASE_NAME} ${1 + maxId}`;
  }

  /**
   * Adds new custom filter to the sidebar.
   * @param {String} filter.name Name of the filter to show in the sidebar.
   * @param {Func} filter.filter Filter function, which should be serializable
   *  via toString() and deserializable via eval() (i.e. it should not depend on
   *  variables/functions in its outer scope).
   */
  addFilter(filter) {
    const f = (new SideBarFilter(MODE.CUSTOM)).merge(filter);
    const filters = _.clone(this.state.filters);
    f.count = this.props.challenges.filter(f.getFilterFunction()).length;
    filters.push(f);
    this.setState({ filters });
    this.saveFilters(filters.slice(FILTER_ID.FIRST_USER_DEFINED));
  }

  /**
   * Renders the component in the Edit My Filters mode.
   */
  editMyFiltersMode() {
    return (
      <div className="SideBarFilters" ref={ref => this.props.ref(ref)}>
        <div className="FilterBox">
          <EditMyFilters
            filters={this.state.filters.slice(FILTER_ID.FIRST_USER_DEFINED)}
            onDone={(myFilters) => {
              const filters = _.clone(this.state.filters).slice(0, FILTER_ID.FIRST_USER_DEFINED);
              this.setState({
                filters: filters.concat(myFilters),
                mode: MODES.SELECT_FILTER,
              });
              this.saveFilters(myFilters);
            }}
          />
          </div>
        <a className="rss-link" href={RSS_LINK}>Get the RSS feed</a>
      </div>
    );
  }

  /**
   * Saves My Filters to a permanent storage. Will be the backend in future,
   * but for now it stores in the browser's localStorage.
   */
  saveFilters(filters) {
    // TODO: In theory, this code should save the stringified representation of
    // the filters to the remote server. In practice, we cannot test it, as the
    // development version of the save filters endpoint is down, and we cannot
    // test against the production one, as production authentication system
    // rejects to authenicate a locally deployed App.
    fetch(SAVE_FILTERS_API, {
      headers: {
        Authorization: `Bearer ${this.tcjwt}`,
      },
      method: 'POST',
      body: JSON.stringify(JSON.stringify(filters.map(item => item.stringify()))),
    }).catch(() => {
      // As the fallback, we save filters to the browser's local storage.
      localStorage.filters = JSON.stringify(filters.map(item => item.stringify()));
    });
  }

  /**
   * Renders the component in the regular mode.
   */
  selectFilterMode() {
    const filters = this.state.filters.map((filter, index) => (
      <FilterItem
        count={filter.count}
        highlighted={filter === this.state.currentFilter}
        key={index}
        name={filter.name}
        onClick={() => this.selectFilter(index)}
      />
    ));
    const myFilters = filters.slice(FILTER_ID.FIRST_USER_DEFINED);
    return (
      <div className="SideBarFilters" ref={ref => this.props.ref(ref)}>
        <div className="FilterBox">
          {filters[FILTER_ID.ALL_CHALLENGES]}

          {this.props.isAuth ?<span><hr /> {filters[FILTER_ID.MY_CHALLENGES]}</span> : ''}
          <hr />
          {filters[FILTER_ID.OPEN_FOR_REGISTRATION]}
          {filters[FILTER_ID.ONGOING_CHALLENGES]}
          {filters[FILTER_ID.PAST_CHALLENGES]}
          {filters[FILTER_ID.OPEN_FOR_REVIEW]}
          {
            myFilters.length ?
              <span>
                <hr />
                <h1>My filters</h1>
                <button
                  id="edit-button"
                  onClick={() => {
                    this.setState({ mode: MODES.EDIT_MY_FILTERS });
                  }}
                >
                  Edit
                </button>
                {myFilters}
              </span> : ''
          }
        </div>
        <a className="rss-link" href={RSS_LINK} target="_blank">Get the RSS feed</a>
      </div>
    );
  }

  /**
   * Selects the filter with the specified ID.
   */
  selectFilter(id) {
    const currentFilter = this.state.filters[id];
    this.setState({ currentFilter }, () => this.props.onFilter(currentFilter));
  }

  /**
   * Renders the component.
   */
  render() {
    switch (this.state.mode) {
      case MODES.SELECT_FILTER: return this.selectFilterMode();
      case MODES.EDIT_MY_FILTERS: return this.editMyFiltersMode();
      default: return <div className="SideBarFilters" />;
    }
  }
}

SideBarFilters.defaultProps = {
  filter: new SideBarFilter(MODE.ALL_CHALLENGES),
  onFilter: _.noop,
  ref: _.noop,
};

SideBarFilters.propTypes = {
  challenges: PT.arrayOf(PT.shape({
    registrationOpen: PT.string.isRequired,
  })).isRequired,
  filter: PT.instanceOf(SideBarFilter),
  onFilter: PT.func,
  ref: PT.func,
};

export default SideBarFilters;
