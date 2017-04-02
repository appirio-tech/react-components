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
import uuid from 'uuid/v4';
import React, { PropTypes as PT } from 'react';
import EditMyFilters, { SAVE_FILTERS_API } from './EditMyFilters';
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
const TOKEN_KEY = 'tcjwt';

class SideBarFilters extends React.Component {

  constructor(props) {
    super(props);
    let that = this;

    // TODO: Get the auth token from cookie for now.
    // Ideally the token should be passed in from a parent container component
    // http://stackoverflow.com/questions/5639346/
    const token = document.cookie.match(`(^|;)\\s*${TOKEN_KEY}\\s*=\\s*([^;]+)`);
    const authToken = token ? token.pop() : '';

    this.state = {
      authToken,
      currentFilter: DEFAULT_FILTERS[3],
      filters: _.clone(DEFAULT_FILTERS),
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
   * Retrieve the saved filters for a logged in user.
   */
  componentDidMount() {
    if (this.state.authToken) {
      fetch(SAVE_FILTERS_API, {
        headers: {
          Authorization: `Bearer ${this.state.authToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((data) => {
          const myFilters = data.map((item) => {
            const filter = item;
            filter.isSavedFilter = true;
            filter.isCustomFilter = true;
            return new SideBarFilter(filter);
          });
          this.setState({
            filters: this.state.filters.concat(myFilters),
          });
        });
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
      const filterClone = new SideBarFilter(filter);
      if (this.state.currentFilter === filter) currentFilter = filterClone;
      filterClone.count = nextProps.challenges.filter(filter.getFilterFunction()).length;
      filters.push(filterClone);
    });
    for (let i = 0; i < filters.length; ++i) 
      if (filters[i].mode === "All Challenges") {
        console.log(filters[i].count);
        filters[i].count = 0;
        for (let j = 0; j < filters.length; ++j)
          if (filters[j].mode === "Open for registration" || filters[j].mode === "Ongoing challenges")
            filters[i].count += filters[j].count;
      }
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
    f.uuid = uuid();
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
            token={this.state.authToken}
            filters={this.state.filters.slice(FILTER_ID.FIRST_USER_DEFINED)}
            onDone={(myFilters) => {
              const filters = _.clone(this.state.filters).slice(0, FILTER_ID.FIRST_USER_DEFINED);
              this.setState({
                filters: filters.concat(myFilters),
                mode: MODES.SELECT_FILTER,
              });
              this.updateFilters(myFilters);
            }}
          />
          </div>
          <div className="sidebar-footer">
            <ul>
              <li><a href="javascript:;">About</a>&nbsp;•&nbsp;</li>
              <li><a href="javascript:;">Contact</a>&nbsp;•&nbsp;</li>
              <li><a href="javascript:;">Help</a>&nbsp;•&nbsp;</li>
              <li><a href="javascript:;">Privacy</a>&nbsp;•&nbsp;</li>
              <li><a href="javascript:;">Terms</a></li>
              <li><a href="javascript:;">Get the RSS</a></li>
            </ul>
            <p className="copyright">Topcoder © 2017.</p>
          </div>
      </div>
    );
  }

/**
 * Updates already saved filters on the backend.
 * Used to update name of the filter but can be used to update
 * other properties if needed.
 */
  updateFilters(filters) {
    // For each filter in filters, serialize it and then
    // make a fetch PUT request
    // there is no need to do anything with the response
    filters.forEach((filter) => {
      fetch(`${SAVE_FILTERS_API}/${filter.uuid}`, {
        headers: {
          Authorization: `Bearer ${this.state.authToken}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          name: filter.name,
          filter: filter.getURLEncoded(),
          // TODO: The saved-search API requires type to be one of develop, design,
          // or data. As this is not consistent with the frontend functionality, the API
          // needs to be updated in future, till then we use hardcoded 'develop'.
          type: 'develop',
        }),
      });
    });
  }
  /**
   * Saves My Filters to the backend
   */
  saveFilters(filters) {
    // This code saves the stringified representation of
    // the filters to the remote server.
    const [filter] = _.takeRight(filters);

    fetch(SAVE_FILTERS_API, {
      headers: {
        Authorization: `Bearer ${this.state.authToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.getAvailableFilterName(),
        filter: filter.getURLEncoded(),
        // The saved-search API requires type to be one of develop, design,
        // or data. We are using the filter property to store tracks info and passing
        // in type as develop just to keep the backend happy.
        type: 'develop',
      }),
    })
    .then(res => res.json())
    .then((res) => {
      // Replace the SideBarFilter object created at the client side with a new
      // SideBarFilter object which has correct id from the server response.
      const updatedFilters = this.state.filters.filter(e => e.uuid !== filter.uuid);
      const savedFilter = res;
      savedFilter.isSavedFilter = true;
      savedFilter.isCustomFilter = true;
      updatedFilters.push(new SideBarFilter(savedFilter));
      this.setState({ filters: updatedFilters });
    });
  }

  /**
   * Renders the component in the regular mode.
   */
  selectFilterMode() {
    if (this.state.filters[FILTER_ID.ALL_CHALLENGES].count === 0) return null;

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
              <div>
                <hr />
                <div className="my-filters">
                  <h1>My filters</h1>
                  <a className="edit-link" href="javascript:;" onClick={() => {
                      this.setState({ mode: MODES.EDIT_MY_FILTERS });
                    }}
                  >
                    edit
                  </a>
                </div>
                {myFilters}
              </div> : ''
          }
        </div>
        <div className="sidebar-footer">
          <ul>
            <li><a href="javascript:;">About</a>&nbsp;•&nbsp;</li>
            <li><a href="javascript:;">Contact</a>&nbsp;•&nbsp;</li>
            <li><a href="javascript:;">Help</a>&nbsp;•&nbsp;</li>
            <li><a href="javascript:;">Privacy</a>&nbsp;•&nbsp;</li>
            <li><a href="javascript:;">Terms</a>&nbsp;•&nbsp;</li>
            <li><a href={RSS_LINK}>Get the RSS</a></li>
          </ul>
          <p className="copyright">Topcoder © 2016.</p>
        </div>
      </div>
    );
  }

  /**
   * Selects the filter with the specified index.
   */
  selectFilter(index) {
    const currentFilter = this.state.filters[index];
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
  isAuth: false,
  onFilter: _.noop,
  ref: _.noop,
};

SideBarFilters.propTypes = {
  challenges: PT.arrayOf(PT.shape({
    registrationOpen: PT.string.isRequired,
  })).isRequired,
  filter: PT.instanceOf(SideBarFilter),
  onFilter: PT.func,
  isAuth: PT.bool,
  ref: PT.func,
};

export default SideBarFilters;
