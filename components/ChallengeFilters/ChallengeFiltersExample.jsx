/* global
  fetch, JSON
*/

/**
 * This component implements a demo of ChallengeFilters in action.
 *
 * It uses ChallengeFilters component to show the challenge search & filter panel,
 * and it implements a simple logic to search, filter, and display the challenges
 * using TC API V2. As TC API V2 does not really provides the necessary ways to
 * filter and search the challenges, this example component always query all
 * challenges from the queried competition tracks (Data Science, Design, or
 * Development), and then performs the filtering of the results at the front-end
 * side, achieving the same behavior, visible for the end-user, as was requested in
 * the related challenge.
 */

import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import Sticky from 'react-stickynode';

import { DESIGN_TRACK, DEVELOP_TRACK, DATA_SCIENCE_TRACK } from './ChallengeFilter';
import ChallengeFilterWithSearch from './ChallengeFilterWithSearch';
import ChallengeFilters from './ChallengeFilters';
import SideBarFilter, { MODE as SideBarFilterModes } from '../SideBarFilters/SideBarFilter';
import SideBarFilters from '../SideBarFilters';
import './ChallengeFiltersExample.scss';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import ChallengeCardContainer from '../ChallengeCardContainer/ChallengeCardContainer';
import ChallengeCardPlaceholder from '../ComponentPlaceholders/ChallengeCardPlaceholder/ChallengeCardPlaceholder';
import SidebarFilterPlaceholder from '../ComponentPlaceholders/SidebarFilterPlaceholder/SidebarFilterPlaceholder';
import SRMCard from '../SRMCard/SRMCard';
import ChallengesSidebar from '../ChallengesSidebar/ChallengesSidebar';
import '../ChallengeCard/ChallengeCard.scss';

/**
 * Helper function for generation of VALID_KEYWORDS and VALID_TRACKS arrays.
 * @param {String} keyword
 * @return {Object} The valid object to include into the array which will be
 *  passed into the ChallengeFilters component.
 */
function keywordsMapper(keyword) {
  return {
    label: keyword,
    value: keyword,
  };
}

// Number of challenge placeholder card to display
const CHALLENGE_PLACEHOLDER_COUNT = 8;

// List of keywords to allow in the Keywords filter.
const VALID_KEYWORDS = [];

// List of keywords to allow in the Tracks filter.
const VALID_SUBTRACKS = [];

// A mock list of SRMs side bar
const SRMsSidebarMock = {
  all: { name: 'All SRMs', value: 853 },
  myChallenges: { name: 'My Challenges', value: 3 },
  others: [
    { name: 'Upcoming SRM', value: 16 },
    { name: 'Past SRM', value: 34 },
  ],
  myFilters: [
    { name: 'TCO Finals', value: 23 },
  ],
};

// helper function to serialize object to query string
const serialize = filter => filter.getURLEncoded();


// helper function to de-serialize query string to filter object
const deserialize = (queryString) => {
  const filter = new SideBarFilter({
    filter: queryString,
    isSavedFilter: true, // So that we can reuse constructor for deserializing
  });
  if (!_.values(SideBarFilterModes).includes(filter.name)) {
    filter.isCustomFilter = true;
  }
  return filter;
};

// The demo component itself.
class ChallengeFiltersExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      srmChallenges: [],
      currentCardType: 'Challenges',
      filter: new SideBarFilter(),
      lastFetchId: 0,
      isLoaded: false,
    };
    if (props.filterFromUrl) {
      this.state.filter = deserialize(props.filterFromUrl);
      this.state.searchQuery = props.filterFromUrl.split('&').filter(e => e.startsWith('query')).map(element => element.split('=')[1])[0];
    }
    this.setCardType.bind(this);
    this.fetchChallenges(0).then(res => this.setChallenges(0, res));

    /* Fetching of SRM challenges */
    fetch(`${props.config.API_URL}/srms/?filter=status=FUTURE`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ srmChallenges: json.result.content });
      });


    // APIs to fetch valid subtracks.
    const SUBTRACKS_DESIGN_API = `${this.props.config.API_URL_V2}/design/challengetypes`;
    const SUBTRACKS_DEVELOP_API = `${this.props.config.API_URL_V2}/develop/challengetypes`;

    /* Fetching of design subtracks */
    fetch(SUBTRACKS_DESIGN_API)
      .then(res => res.json())
      .then((json) => {
        json.forEach(item => VALID_SUBTRACKS.push(keywordsMapper(item.name)));
      });

    /* Fetching of develop subtracks */
    fetch(SUBTRACKS_DEVELOP_API)
      .then(res => res.json())
      .then((json) => {
        json.forEach(item => VALID_SUBTRACKS.push(keywordsMapper(item.name)));
      });

    // API to fetch valid keywords
    const KEYWORDS_API = `${this.props.config.API_URL}/technologies/`;

    /* Fetching of keywords */
    fetch(KEYWORDS_API)
      .then(res => res.json())
      .then((json) => {
        json.result.content.forEach(item => VALID_KEYWORDS.push(keywordsMapper(item.name)));
      });
    // callback to listings.controller.js
    props.setChallengeFilter(this);
  }

  /**
   * Searches the challenges for with the specified search string, competition
   * tracks, and filters.
   *
   * As TopCoder API v2 does not provide all necessary search & filtering
   * capabilites, this function fetches all challenges from the requested
   * tracks, then filters them by searching for 'searchString' in challenge
   * name, platforms, and techologies, and by filtering them with 'filter'
   * function, and then sets the remaining challenges into the component state.
   *
   * @param {String} searchString The search string.
   * @param {Function(Challenge)} filter Additional filter function.
   */
  onSearch(searchString, filter) {
    const f = new ChallengeFilterWithSearch();
    _.merge(f, filter);
    f.query = searchString;
    const fetchId = 1 + this.state.lastFetchId;
    this.setState({ challenges: [], lastFetchId: fetchId, searchQuery: searchString });
    this.fetchChallenges(fetchId).then(res => this.setChallenges(fetchId, res, f));
    this.onFilterByTopFilter(f);
  }

  /**
   * Writes array of challenges into the state.
   * @param {Number} fetchId Nothing will be done, if this ID mismatches the one
   *  stored in the state (this way we deal with async fetches: only the latest
   *  fetch will be able to write its result into the state).
   * @param {Array} challenges Array of challenge objects.
   * @param {Function(Object)} filter An optional filter function. If provided,
   *  the array of challenges, given as the second argument, will be prefiltered
   *  with this function before writing into the state.
   */
  setChallenges(fetchId, challenges, filter) {
    if (fetchId !== this.state.lastFetchId) return;
    const c = filter ? challenges.filter(filter.getFilterFunction()) : challenges;
    this.setState({ challenges: c, isLoaded: true });
  }

  // set current card type
  setCardType(cardType) {
    this.setState({
      currentCardType: cardType,
    });
  }

  /**
   * Saves current filters to the URL hash.
   */
  saveFiltersToHash(filter) {
    let urlString = this.state.searchQuery ? `&query=${this.state.searchQuery}` : '';
    urlString += serialize(filter);
    this.props.onSaveFilterToUrl(urlString);
  }

  /**
   * Fetches challenges from the backend API v2.
   *
   * As there is no single endpoint to fetch and filter challenges from all tracks,
   * this function calls three separate enpoints (design, development, and dataScience
   * science), and fetches all active challenges from each of them.
   *
   * As some of the challenges may belong to several tracks (currently some challenges
   * are returned both for development and data science listings, although technically
   * they are registered as development challenges), this function appends to all
   * fetched challenges a new `communities` field, which is a set of all tracks a
   * challenge belongs to, based on the endpoints which have returned that challenge.
   *
   * As pure data science challenges don't have in their objects some of the fields
   * the challenges in other tracks have, this function also attaches some of the
   * missing fields to them, in order to avoid the need for aditional conditions
   * in the dependent code.
   *
   * @return Promise which resolves to the array of challenges.
   */
  fetchChallenges() {
    const challenges = [];
    const knownKeywords = new Set();
    VALID_KEYWORDS.forEach(item => knownKeywords.add(item.value));
    const map = {};
    let forceUpdate = false;
    function helper1(key) {
      if (knownKeywords.has(key)) return;
      knownKeywords.add(key);
      forceUpdate = true;
    }
    /* Normalizes challenge objects received from different API endpoints,
     * and adds them to the list of loaded challenges. */
    function helper2(response, community) {
      return response.json().then(res => res.result.content.forEach((item) => {
        /* Only marathon matches, when received from the /data/marathon/challenges
         * endpoint, satisfy this. */
        if (item.roundId) {
          const endTimestamp = new Date(item.endDate).getTime();
          _.defaults(item, {
            challengeId: item.roundId,
            challengeName: item.fullName,
            challengeCommunity: 'Data',
            challengeType: 'Marathon',
            communities: new Set([community]),
            currentPhaseEndDate: item.endDate,
            currentPhaseName: endTimestamp > Date.now() ? 'Registration' : '',
            numRegistrants: item.numberOfRegistrants,
            numSubmissions: item.numberOfSubmissions,
            platforms: [],
            prize: [],
            registrationOpen: endTimestamp > Date.now() ? 'Yes' : 'No',
            registrationStartDate: item.startDate,
            submissionEndDate: item.endDate,
            submissionEndTimestamp: endTimestamp,
            technologies: [],
            totalPrize: 0,
            track: 'DATA_SCIENCE',
            status: endTimestamp > Date.now() ? 'Active' : 'Completed',
            subTrack: 'MARATHON_MATCH',
          });
          map[item.id] = item;
        } else if (item.track === 'SRM') {
          /* We don't support SRM yet, so we don't want them around */
        } else { /* All challenges from other endpoints have the same format. */
          const existing = map[item.id];
          if (existing) existing.communities.add(community);
          else {
            _.defaults(item, {
              communities: new Set([community]),
              platforms: '',
              registrationOpen: item.allPhases.filter(d => d.phaseType === 'Registration')[0].phaseStatus === 'Open' ? 'Yes' : 'No',
              technologies: '',
              track: item.track,
              status: item.status,
              submissionEndTimestamp: item.submissionEndDate,
              subTrack: item.subTrack,
            });
            map[item.id] = item;
            if (item.platforms) {
              item.platforms.split(',').forEach(helper1);
            }
            if (item.technologies) {
              item.technologies.split(',').forEach(helper1);
            }
          }
        }
      }));
    }
    const api = this.props.config.API_URL;
    return Promise.all([
      /* Fetching of active challenges */
      fetch(`${api}/challenges/?filter=track%3Ddesign`).then(res => helper2(res, DESIGN_TRACK)),
      fetch(`${api}/challenges/?filter=track%3Ddevelop`).then(res => helper2(res, DEVELOP_TRACK)),
      fetch(`${api}/challenges/marathonMatches`),
    ]).then(() => {
      _.forIn(map, item => challenges.push(item));
      challenges.sort((a, b) => b.submissionEndDate - a.submissionEndDate);
      // TODO: Using forceUpdate() in ReactJS is a bad practice. The reason here
      // is that we need to update the component if we have updated the mock list
      // VALID_KEYWORDS. In the real App the list of valid keywords will be passed
      // via props from the parent component, and no force update will be necessary.
      // Thus, it is a temporary solution, which will be changed later.
      if (forceUpdate) this.forceUpdate();
      return challenges;
    });
  }

  onFilterByTopFilter(filter, isSidebarFilter) {
    const mergedFilter = Object.assign({}, this.state.filter, filter);
    const updatedFilter = new SideBarFilter(mergedFilter);
    if (!isSidebarFilter) {
      updatedFilter.mode = SideBarFilterModes.CUSTOM;
    }
    this.setState({ filter: updatedFilter }, this.saveFiltersToHash.bind(this, updatedFilter));
  }

  updateFilter(hash) {
    // get the latest filter and update current challenges
    this.state = {
      challenges: [],
      srmChallenges: [],
      currentCardType: 'Challenges',
      filter: new SideBarFilter(),
      lastFetchId: 0,
    };
    if (hash) {
      this.state.filter = deserialize(hash);
      this.state.searchQuery = hash.split('&').filter(e => e.startsWith('query')).map(element => element.split('=')[1])[0];
    }
    this.fetchChallenges(0).then(res => this.setChallenges(0, res));
  }

  // ReactJS render method.
  render() {
    // TODO: This is bad code. Generation of myChallengesId array is O(N),
    // using it to mark `My Challenges` using that array is O(N^2). Not that
    // critical for now, as nobody has huge amount of challenges he is participating,
    // but... One should generate a set of myChallengesId, which is O(N), and
    // then use it to mark `My Challenges`, which also will be O(N).
    let myChallengesId = [];
    // get my challenges id
    if (this.props.myChallenges) {
      myChallengesId = this.props.myChallenges.map(challenge => challenge.id);
    }

    let challenges = this.state.challenges;
    const currentFilter = this.state.filter;
    challenges = challenges.map((item) => {
      // check the challenge id exist in my challenges id
      // TODO: This is also should be moved to a better place, fetchChallenges() ?
      if (_.indexOf(myChallengesId, item.id) > -1) {
        _.assign(item, { myChallenge: true });
      }
      return item;
    });

    const { filter } = this.state;
    const { name: sidebarFilterName } = filter;

    let challengeCardContainer;
    if (!this.state.isLoaded) {
      const challengeCards = _.range(CHALLENGE_PLACEHOLDER_COUNT)
      .map(key => <ChallengeCardPlaceholder id={key} key={key} />);
      challengeCardContainer = (
        <div className="challenge-cards-container">
          <div className="ChallengeCardExamples">
            { challengeCards }
          </div>
        </div>
      );
    } else if (filter.isCustomFilter) {
      if (currentFilter.mode === SideBarFilterModes.CUSTOM) {
        challenges = this.state.challenges.filter(currentFilter.getFilterFunction());
      }

      const cardify = challenge => (
        <ChallengeCard
          challenge={challenge}
          config={this.props.config}
          onTechTagClicked={(tag) => {
            if (this.challengeFilters) this.challengeFilters.setKeywords(tag);
          }}
          key={challenge.id}
        />
      );

      challengeCardContainer = (
        <div className="challenge-cards-container">
          <div className="ChallengeCardExamples">
            {challenges.filter(filter.getFilterFunction()).map(cardify)}
          </div>
        </div>
      );
    } else {
      const { config } = this.props;
      const filterFunc = filter.getFilterFunction();
      const sidebarFilterFunc = (challenge) => {
        if (currentFilter.mode !== SideBarFilterModes.CUSTOM) {
          return true;
        }
        return currentFilter.getFilterFunction()(challenge);
      };
      challengeCardContainer = (
        <ChallengeCardContainer
          config={config}
          onTechTagClicked={(tag) => {
            if (this.challengeFilters) this.challengeFilters.setKeywords(tag);
          }}
          challenges={_.uniqBy(challenges, 'id')}
          currentFilterName={sidebarFilterName}
          expanded={sidebarFilterName !== 'All Challenges'}
          fetchCallback={(fetchedChallenges) => {
            this.setState({
              challenges: _.uniqBy(
                challenges.concat(fetchedChallenges),
                'id',
              ),
            });
          }}
          additionalFilter={
            challenge => filterFunc(challenge) && sidebarFilterFunc(challenge)
          }
          // Handle onExpandFilterResult to update the sidebar
          onExpandFilterResult={
            filterName => this.sidebar.selectFilterWithName(filterName)
          }
        />
      );
    }


    // Upcoming srms
    let futureSRMChallenge = this.state.srmChallenges.filter(challenge => challenge.status === 'FUTURE');

    futureSRMChallenge = futureSRMChallenge.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );


    const UpcomingSrm = futureSRMChallenge.map(
      srmChallenge => (
        <SRMCard
          category={'upcoming'}
          srmChallenge={srmChallenge}
          key={JSON.stringify(srmChallenge)}
        />
      ),
    );
    VALID_SUBTRACKS.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } return 0;
    });

    VALID_KEYWORDS.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } return 0;
    });


    return (
      <div className="ChallengeFiltersExample">
        <ChallengeFilters
          filter={this.state.filter}
          onFilter={topFilter => this.onFilterByTopFilter(topFilter)}
          onSaveFilter={(filterToSave) => {
            if (this.sidebar) {
              const f = (new SideBarFilter(SideBarFilterModes.CUSTOM)).merge(filterToSave);
              f.name = this.sidebar.getAvailableFilterName();
              this.sidebar.addFilter(f);
            }
          }}
          searchQuery={this.state.searchQuery}
          onSearch={(query, existingFilter) => this.onSearch(query, existingFilter)}
          validKeywords={VALID_KEYWORDS}
          validSubtracks={VALID_SUBTRACKS}
          setCardType={cardType => this.setCardType(cardType)}
          isCardTypeSet={this.state.currentCardType}
          ref={(node) => { this.challengeFilters = node; }}
        />
        <div className={`tc-content-wrapper ${this.state.currentCardType === 'SRMs' ? '' : 'hidden'}`}>
          <div className="sidebar-container xs-to-sm">
            <ChallengesSidebar SidebarMock={SRMsSidebarMock} />
          </div>

          <div className="challenges-container SRMs-container">
            {/* happening now */}
            <div className="SRMCardExamples">
              <SRMCard category={'now'} />
            </div>
            {/* upcoming SRMs */}
            <div className="SRMCardExamples">
              <div className="title">Upcoming SRMs</div>
              { UpcomingSrm }
            </div>
            {/* past SRMs */}
            <div className="SRMCardExamples">
              <div className="title">Past SRMs</div>
              <SRMCard category={'past'} />
            </div>
          </div>

          <Sticky
            className="sidebar-container desktop"
            top={20}
          >
            <ChallengesSidebar SidebarMock={SRMsSidebarMock} />
          </Sticky>
        </div>

        <div className={`tc-content-wrapper ${this.state.currentCardType === 'Challenges' ? '' : 'hidden'}`}>
          <div className="sidebar-container xs-to-sm">
            {this.state.isLoaded ? (<SideBarFilters
              config={this.props.config}
              challenges={challenges}
              filter={this.state.sidebarFilter}
              onFilter={
                selectedFilter => this.setState(
                  { sidebarFilter: selectedFilter },
                  () => this.saveFiltersToHash(),
                )
              }
              ref={(node) => {
                this.sidebar = node;
              }}
              isAuth={this.props.isAuth}
              myChallenges={this.props.myChallenges}
            />) : <SidebarFilterPlaceholder />}
          </div>

          {challengeCardContainer}

          <Sticky
            className="sidebar-container desktop"
            top={20}
          >
            {this.state.isLoaded ? (<SideBarFilters
              config={this.props.config}
              challenges={challenges}
              filter={this.state.filter}
              onFilter={topFilter => this.onFilterByTopFilter(topFilter, true)}
              ref={(node) => {
                this.sidebar = node;
              }}
              isAuth={this.props.isAuth}
              myChallenges={this.props.myChallenges}
            />) : <SidebarFilterPlaceholder />}
          </Sticky>
        </div>
      </div>
    );
  }
}

ChallengeFiltersExample.defaultProps = {
  config: {
    API_URL_V2: process.env.API_URL_V2,
    API_URL: process.env.API_URL,
    MAIN_URL: process.env.MAIN_URL,
    COMMUNITY_URL: process.env.COMMUNITY_URL,
  },
  filterFromUrl: '',
  onSaveFilterToUrl: _.noop,
  setChallengeFilter: _.noop,
  myChallenges: [],
  // challengeFilters: undefined,
  isAuth: false,
};

ChallengeFiltersExample.propTypes = {
  config: PT.shape({
    API_URL_V2: PT.string,
    API_URL: PT.string,
    MAIN_URL: PT.MAIN_URL,
    COMMUNITY_URL: PT.COMMUNITY_URL,
  }),
  filterFromUrl: PT.string,
  onSaveFilterToUrl: PT.func,
  setChallengeFilter: PT.func,
  myChallenges: PT.array,
  // challengeFilters: PT.object,
  isAuth: PT.bool,
};

export default ChallengeFiltersExample;
