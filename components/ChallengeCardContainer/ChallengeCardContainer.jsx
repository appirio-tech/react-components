/* global
  sessionStorage, window, Math
*/

/**
 *  This component is responsible for displaying and handling the container
 *  interaction of challenges with respect to their filter categories.
 *
 *  It uses the InfiniteList component to display the challenges in a list. It
 *  passes into InfiniteList all the necessary properties such as the selected
 *  sorting and filtering settings for rendering the challenges in the right
 *  order and format. Refer to that component for the list behaviour.
 *
 *  It will also handle sorting in each category container and store the setting
 *  in sessionStorage. It will load the setting if it exists at the begining. It
 *  uses the SortingSelectBar component for letting the user select the sorting
 *  option for each challenge category.
 *
 *  It loads from files, challengeFilters.js and sortingFunctionStore.js. The first
 *  file lets the component know all the challenge categories with their respective
 *  filtering settings, sorting options, API endpoints and other information. The
 *  second file lets the component know how to sort challenges for different sorting
 *  settings. These files are kept in this folder for now but should be moved to
 *  another place if it is more appropriate.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import SortingSelectBar from '../SortingSelectBar/SortingSelectBar';
import InfiniteList from '../InfiniteList/InfiniteList';
import defaultFilters from './challengeFilters';
import defaultSortingFunctionStore from './sortingFunctionStore';
import {
  getChallengeCardPlaceholder,
  getChallengeCard,
  getExpandBucketButton,
} from './childComponentConstructorHelpers';
import {
  getFilterChallengesStore,
  getFilterSortingStore,
  getFilterTotalCountStore,
} from './storeConstructorHelpers';
import {
  findFilterByName,
  filterFilterChallengesStore,
  fetchChallenges,
  isChallengeCategoryExpandable,
} from './generalHelpers';
import './ChallengeCardContainer.scss';

const { arrayOf, object, shape, func, string, bool, oneOfType } = React.PropTypes;
const initialNumberToShow = 10;
const batchLoadNumber = 50;
const challengeUniqueIdentifier = 'id';

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
      filterTotalCountStore: {},
      expanded,
    };

    getFilterTotalCountStore().then(
      filterTotalCountStore => this.setState({ filterTotalCountStore }),
    );
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
    }, this.props.onExpandFilterResult(filterName)); // pass filterName
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
    const { additionalFilter, filters, fetchCallback } = this.props;
    const {
      currentFilter,
      expanded,
      filterSortingStore,
      sortingFunctionStore,
      filterTotalCountStore,
    } = this.state;

    const filterChallengesStore = filterFilterChallengesStore(
      this.state.filterChallengesStore,
      currentFilter,
    );

    return (
      <div className="challengeCardContainer">
        {
          Object.keys(filterChallengesStore).map((filterName) => {
            let expansionButtion;
            const unfilteredChallenges = filterChallengesStore[filterName];
            const filteredChallenges = _.sortBy(_.filter(unfilteredChallenges, additionalFilter),
             sortingFunctionStore[filterSortingStore[filterName]]);
            let initialChallenges = unfilteredChallenges;

            const challengeCountTotal = filterTotalCountStore[filterName];
            const trimmedFilterName = filterName.replace(/\s+/g, '-').toLowerCase();
            const filter = findFilterByName(filterName, filters);
            const { sortingOptions } = filter;
            const { length: filteredChallengeNumber } = filteredChallenges;
            const { length: unFilteredChallengeNumber } = unfilteredChallenges;
            const challengeCategoryExpandable = isChallengeCategoryExpandable({
              initialNumberToShow,
              filteredChallengeNumber,
              unFilteredChallengeNumber,
              challengeCountTotal,
            });

            if (!expanded) initialChallenges = filteredChallenges.slice(0, initialNumberToShow);
            if (!expanded && challengeCategoryExpandable) {
              expansionButtion = getExpandBucketButton(
                () => this.onExpandFilterResult(filterName),
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
                <InfiniteList
                  items={initialChallenges}
                  itemCountTotal={
                    expanded
                    ? challengeCountTotal || initialChallenges.length
                    : initialChallenges.length
                  }
                  renderItem={_.partialRight(
                    getChallengeCard,
                    this.props.config,
                    tag => this.props.onTechTagClicked(tag),
                  )}
                  renderItemTemplate={getChallengeCardPlaceholder}
                  fetchItems={
                    filter.getApiUrl
                    ? _.partial(fetchChallenges, filter.getApiUrl)
                    : null
                  }
                  fetchItemFinishCallback={fetchCallback}
                  batchNumber={batchLoadNumber}
                  filter={additionalFilter}
                  tempDataFilter={filterName}
                  sort={sortingFunctionStore[filterSortingStore[filterName]]}
                  uniqueIdentifier={challengeUniqueIdentifier}
                />
                {expansionButtion}
              </div>
            );
          })
        }
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
  fetchCallback: _.noop,
  config: {},
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
    getApiUrl: func,
    sortingOptions: arrayOf(string),
    allIncluded: bool,
    info: object,
  })),
  expanded: oneOfType([bool, string]),
  fetchCallback: func,
  config: object,
};

export default ChallengeCardContainer;
