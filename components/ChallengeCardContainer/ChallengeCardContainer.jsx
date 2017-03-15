/* global
  sessionStorage, window
*/

/**
 *  This component is responsbile for displaying and handling the interaction
 *  of challenges contained in different categories.
 *
 *  It will handle the expansion of each cateogry container to see more challenges
 *  than the initial number which is 10 as well as the further expansion of the container.
 *  if the user scrolls down to the last challenge in the state and there are
 *  more challenges, additional 50 challenges will be fetched.
 *
 *  It will also handle sorting in each cateogry container and store the setting
 *  in sessionStorage. It will load the setting if it exists at the begining.
 *
 *  It loads from files, filters.js and sortingFunctionStore.js, to know the filter
 *  categories and their information as well as all the sorting options for each
 *  filter category.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import SortingSelectBar from './SortingSelectBar/SortingSelectBar';
import defaultFilters from './filters';
import defaultSortingFunctionStore from './sortingFunctionStore';
import {
  getFilterChallengesStore,
  findFilterByName,
  getFilterSortingStore,
  fetchAdditionalChallenges,
  filterFilterChallengesStore,
  getMaxWindowScrollY,
} from './ChallengeCardContainerHelpers';
import './ChallengeCardContainer.scss';

const { arrayOf, object, shape, func, string, bool, oneOfType } = React.PropTypes;

class ChallengeCardContainer extends Component {
  constructor(props) {
    super(props);
    const { challenges, filters, currentFilterName, expanded } = props;
    let userSessionFilterSortingStore;

    if (sessionStorage && sessionStorage.challengeFilterSortingStore) {
      userSessionFilterSortingStore = JSON.parse(sessionStorage.challengeFilterSortingStore);
    }

    this.state = {
      filterChallengesStore: getFilterChallengesStore(filters, challenges),
      currentFilter: findFilterByName(currentFilterName, filters),
      filterSortingStore: getFilterSortingStore(filters, userSessionFilterSortingStore),
      sortingFunctionStore: defaultSortingFunctionStore,
      expanded,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { challenges, filters, currentFilterName, expanded } = nextProps;
    const { filterSortingStore } = this.state;

    this.setState({
      filterChallengesStore: getFilterChallengesStore(filters, challenges),
      currentFilter: findFilterByName(currentFilterName, filters),
      filterSortingStore: getFilterSortingStore(filters, filterSortingStore),
      expanded,
    });
  }

  onExpandFilterResult(filterName) {
    this.setState({
      currentFilter: findFilterByName(filterName, this.props.filters),
      expanded: true,
    }, this.props.onExpandFilterResult);
  }

  onScrollChallenges() {
    if (this.loading) return;
    const { currentFilter } = this.state;
    const { filterChallengesStore } = this.state;
    const maximumScrollY = getMaxWindowScrollY();

    if (!currentFilter || currentFilter.totalReached === true) return;

    // put the fetch and update operation to the end of the queue to allow
    // the scrolling to finish
    setTimeout(() => {
      const pageIndex = currentFilter.currentPageIndex || 1;
      this.loading = true;

      fetchAdditionalChallenges({
        filterChallengesStore,
        filter: currentFilter,
        pageIndex: (pageIndex + 1),
        challenges: filterChallengesStore[currentFilter.name],
        successCallback: (newFilterChallengesStore, filter) => (
          this.setState(
            { filterChallengesStore: newFilterChallengesStore, currentFilter: filter },
            () => {
              // NOTE: have to scroll by the increase of max scroll due to expansion
              // of the category container because the browser will attempt to
              // scroll to the bottom and thereby trigger almost an infinite loop
              // of challenge fetches. This should definitely be improved in the future.
              window.scrollBy(0, maximumScrollY - getMaxWindowScrollY());
              this.loading = false;
            },
          )
        ),
      });
    });
  }

  onSortingSelect(filterName, sortingOptionName) {
    const filterSortingStore = _.assign(
      {},
      this.state.filterSortingStore,
      { [filterName]: sortingOptionName },
    );
    sessionStorage.challengeFilterSortingStore = JSON.stringify(filterSortingStore);

    this.setState({ filterSortingStore });
  }

  render() {
    const initialNumberToShow = 10;
    const { additionalFilter, filters } = this.props;
    const { currentFilter, expanded, filterSortingStore, sortingFunctionStore } = this.state;
    const filterChallengesStore = filterFilterChallengesStore(
      this.state.filterChallengesStore,
      currentFilter,
      additionalFilter,
    );
    let needToFetchMore = false;

    if (expanded) {
      needToFetchMore =
        this.state.filterChallengesStore[currentFilter.name].length >= initialNumberToShow * 5;
    }

    const loadingIndication = needToFetchMore && expanded && !currentFilter.totalReached
      ? <h1 className="loading">Loading...</h1>
      : null;

    const loadingWaypoint = needToFetchMore && expanded && !currentFilter.totalReached
      ? <Waypoint
          onEnter={value => this.onScrollChallenges(value)}
          scrollableAncestor={window}
        />
      : null;

    return (
      <div className="challengeCardContainer">
        {
          Object.keys(filterChallengesStore).map((filterName) => {
            let expansionButtion;
            let challenges = _.sortBy(
              filterChallengesStore[filterName],
              [sortingFunctionStore[filterSortingStore[filterName]]],
            );

            const trimmedFilterName = filterName.replace(/\s+/g, '-').toLowerCase();
            const filter = findFilterByName(filterName, filters);
            const { sortingOptions } = filter;
            const { length: challengeNumber } = challenges;

            if (!expanded && challengeNumber > initialNumberToShow) {
              challenges = challenges.slice(0, initialNumberToShow);
              expansionButtion = (
                <button
                  onClick={() => this.onExpandFilterResult(filterName)}
                  className="view-more"
                >
                  View {filterChallengesStore[filterName].length - 10} more challenges
                </button>
              );
            }

            return (
              <div className="category-challenges-container example-lg" key={`${trimmedFilterName}-container`}>
                <SortingSelectBar
                  sortingOptions={sortingOptions}
                  filterName={filterName}
                  onSortingSelect={optionName => this.onSortingSelect(filterName, optionName)}
                  value={filterSortingStore[filterName]}
                  key={`${trimmedFilterName}-sorting-bar`}
                />
                {
                  _.map(challenges, challenge => (
                    <ChallengeCard
                      challenge={challenge}
                      onTechTagClicked={tag => this.props.onTechTagClicked(tag)}
                      key={`${challenge.challengeId}-${trimmedFilterName}`}
                    />
                  ))
                }
                {expansionButtion}
                {loadingIndication}
              </div>
            );
          })
        }
        {loadingWaypoint}
      </div>
    );
  }
}

ChallengeCardContainer.defaultProps = {
  onTechTagClicked: _.noop,
  onExpandFilterResult: _.noop,
  filters: defaultFilters,
  additionalFilter() {
    return true;
  },
  currentFilterName: '',
  challenges: [],
  expanded: false,
};

ChallengeCardContainer.propTypes = {
  onTechTagClicked: func,
  onExpandFilterResult: func,
  additionalFilter: func,
  challenges: arrayOf(object),
  currentFilterName: string,
  filters: arrayOf(shape({
    check: func,
    name: string,
    apiEndpoint: string,
    sortings: arrayOf(string),
    allIncluded: bool,
    info: object,
  })),
  expanded: oneOfType([bool, string]),
};

export default ChallengeCardContainer;
