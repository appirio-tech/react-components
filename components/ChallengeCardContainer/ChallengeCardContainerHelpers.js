/* global
  document, fetch
*/

import _ from 'lodash';

export function getFilterChallengesStore(filters, challenges) {
  const nonAllInclusiveFilters = _.filter(filters, filter => (!filter.allIncluded));
  const filterChallengesStore = nonAllInclusiveFilters.reduce(
    (filterStore, filter) => _.set(filterStore, filter.name, []),
    {},
  );

  return challenges.reduce((filterStore, challenge) => (
    nonAllInclusiveFilters.reduce((store, filter) => {
      if (filter.check(challenge)) store[filter.name].push(challenge);
      return store;
    }, filterStore)
  ), filterChallengesStore);
}

export function getFilterSortingStore(filters, sortingSetting = {}) {
  return filters.reduce((filterSortingStore, filter) => (
    _.set(
      filterSortingStore,
      filter.name,
      sortingSetting[filter.name] || filter.sortingOptions[0],
    )
  ), {});
}

export function filterFilterChallengesStore(
  filterChallengesStore,
  currentFilter,
  additionalFilter,
) {
  const allFilters = [
    (store) => {
      if (currentFilter && !currentFilter.allIncluded) {
        return _.pick(store, [currentFilter.name]);
      }

      return store;
    },
    _.partialRight(_.pickBy, challenges => !_.isEmpty(challenges)),
    _.partialRight(_.mapValues, challenges => _.filter(challenges, additionalFilter)),
  ];

  return _.flow(allFilters)(_.assign({}, filterChallengesStore));
}

export function findFilterByName(filterName, filters) {
  const foundfilter = _.find(filters, filter => filter.name === filterName);

  if (foundfilter) return _.assign({}, foundfilter);
  return foundfilter;
}

const challengesFetchCache = {};
let fetchPromise = Promise.resolve();

function handleChallengesFetchResult({
  resJson,
  filter,
  challenges,
  pageIndex,
  filterChallengesStore,
}) {
  let { data: fetchedChallenges } = resJson;

  fetchedChallenges = fetchedChallenges.map((challenge) => {
    const formattedChallenge = _.assign({}, challenge);

    formattedChallenge.track = challenge.challengeCommunity.toUpperCase();
    formattedChallenge.subTrack = challenge.challengeType.toUpperCase().split(' ').join('_');

    return formattedChallenge;
  });

  const newChallenges = _.uniqBy(_.concat(challenges, fetchedChallenges), 'challengeId');

  const totalReached = newChallenges.length === challenges.length;
  const newFilterChallengesStore = _.assign(
    {},
    filterChallengesStore,
    { [filter.name]: newChallenges },
  );

  const newFilter = _.assign(
    {},
    filter,
    { currentPageIndex: pageIndex, totalReached },
  );

  return { newFilterChallengesStore, newFilter, totalReached };
}

// fetch challenges and then fetch again to cache
export function fetchAdditionalChallenges({
    filter,
    challenges,
    pageIndex,
    filterChallengesStore,
    successCallback,
    toCache,
}) {
  const { name: filterName } = filter;

  // Check if there is cache and use it if there is
  if (challengesFetchCache[filterName] && challengesFetchCache[filterName][pageIndex] && !toCache) {
    const resJson = challengesFetchCache[filter.name][pageIndex];
    const { newFilterChallengesStore, newFilter, totalReached } =
      handleChallengesFetchResult({
        resJson,
        filter,
        challenges,
        pageIndex,
        filterChallengesStore,
      });
    successCallback(newFilterChallengesStore, newFilter, totalReached);

    if (totalReached) return;

    fetchAdditionalChallenges({ filter, pageIndex: (pageIndex + 1), toCache: true });
    return;
  }

  fetchPromise = fetchPromise.then(
    fetch(filter.getApiUrl(pageIndex))
      .then(res => res.json())
      .then((resJson) => {
        challengesFetchCache[filter.name] = challengesFetchCache[filter.name] || {};
        challengesFetchCache[filter.name][pageIndex] = resJson;
        if (toCache) return;

        const { newFilterChallengesStore, newFilter, totalReached } =
          handleChallengesFetchResult({
            resJson,
            filter,
            challenges,
            pageIndex,
            filterChallengesStore,
          });
        successCallback(newFilterChallengesStore, newFilter, totalReached);

        if (totalReached) return;

        fetchAdditionalChallenges({ filter, pageIndex: (pageIndex + 1), toCache: true });
      }),
  );
}

export function getMaxWindowScrollY() {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
}
