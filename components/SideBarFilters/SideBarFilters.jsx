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
import { FilterItem } from './FilterItems';
import './SideBarFilters.scss';

const V2_API = 'https://api.topcoder.com/v2';
const CHALLENGES_API = `${V2_API}/challenges/`;
const MY_CHALLENGES_API = `${V2_API}/user/challenges?challengeType=Copilot+Posting,
  Conceptualization,Specification,Architecture,Design,Development,
  RIA+Build+Competition,UI+Prototype+Competition,Assembly+Competition,
  Test+Suites,Test+Scenarios,Content+Creation,Marathon+Match,Bug+Hunt,
  First2Finish,Code&type=active`

/*
 * Default set of filters displayed in the component.
 * Note that groupping of these into difference sections is defined in the jsx
 * layout markup. The js logic behind this does not care about that groupping.
 */
const DEFAULT_FILTERS = [{
  name: 'All Challenges',
  filter: () => true,
}, {
  name: 'My Challenges',
  filter: challenge => challenge.myChallenge,
}, {
  name: 'Open for registration',
  filter: challenge => challenge.registrationOpen.startsWith('Yes'),
}, {
  name: 'Ongoing challenges',
  filter: challenge => !challenge.registrationOpen.startsWith('Yes'),
}, {
  name: 'Past challenges',
  filter: challenge => challenge.status === 'Completed',
}];

/*
 * This auxiliary object holds the indices of standard filters in the filters array.
 */
const FILTER_ID = {
  ALL_CHALLENGES: 0,
  MY_CHALLENGES: 1,
  OPEN_FOR_REGISTRATION: 2,
  ONGOING_CHALLENGES: 3,
  PAST_CHALLENGES: 4,
  FIRST_USER_DEFINED: 5,
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

class SideBarFilters extends React.Component {

  constructor(props) {
    super(props);
    let that = this
    let myFilters = localStorage.filters ? JSON.parse(localStorage.filters) : [];
    myFilters.forEach(f => eval(`f.filter = ${f.filter}`));

    this.state = {
      currentFilter: DEFAULT_FILTERS[0],
      filters: _.clone(DEFAULT_FILTERS).concat(myFilters),
      mode: MODES.SELECT_FILTER,
    };

    for (let i = 0; i < this.state.filters.length; i += 1) {
      const filter = this.state.filters[i];
      filter.count = props.challenges.filter(filter.filter).length;
    }
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
      const filterClone = _.clone(filter);
      if (this.state.currentFilter === filter) currentFilter = filterClone;
      filterClone.count = nextProps.challenges.filter(filter.filter).length;
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
    const f = _.clone(filter);
    const filters = _.clone(this.state.filters);
    f.count = this.props.challenges.filter(f.filter).length;
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
    );
  }

  /**
   * Saves My Filters to a permanent storage. Will be the backend in future,
   * but for now it stores in the browser's localStorage.
   */
  saveFilters(filters) {
    const f = _.cloneDeep(filters);
    for (let i = 0; i < f.length; i += 1) f[i].filter = f[i].filter.toString();
    localStorage.filters = JSON.stringify(f);
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
        {filters[FILTER_ID.ALL_CHALLENGES]}

        {this.props.isAuth ?<span><hr /> {filters[FILTER_ID.MY_CHALLENGES]}</span> : ''}
        <hr />
        {filters[FILTER_ID.OPEN_FOR_REGISTRATION]}
        {filters[FILTER_ID.ONGOING_CHALLENGES]}
        {filters[FILTER_ID.PAST_CHALLENGES]}
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
    );
  }

  /**
   * Selects the filter with the specified ID.
   */
  selectFilter(id) {
    const currentFilter = this.state.filters[id];
    this.setState({ currentFilter }, () => this.props.onFilter(currentFilter.filter));
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
  onFilter: _.noop,
  ref: _.noop,
};

SideBarFilters.propTypes = {
  challenges: PT.arrayOf(PT.shape({
  })).isRequired,
  onFilter: PT.func,
  ref: PT.func,
};

export default SideBarFilters;
