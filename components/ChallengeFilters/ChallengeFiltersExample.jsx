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

import ChallengeFilter, { DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK } from './ChallengeFilter';
import ChallengeFilterWithSearch from './ChallengeFilterWithSearch';
import ChallengeFilters from './ChallengeFilters';
import SideBarFilter, { MODE as SideBarFilterModes } from '../SideBarFilters/SideBarFilter';
import SideBarFilters from '../SideBarFilters';
import './ChallengeFiltersExample.scss';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
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

// A mock list of keywords to allow in the Keywords filter.
// Note that each time challenges are fetched, all their platform and technology
// tags are appended there, if they are missing.
const VALID_KEYWORDS = [
  'ActionScript', 'ADO.NET', 'AJAX', 'Android', 'Angular.js', 'Apache Derby',
  'Apex', 'AWS', 'Box', 'Brivo Labs', 'Cisco', 'Cloud Foundry', 'CloudFactor',
  'Data Science', 'EC2', 'Force.com', 'iOS', 'Java', '.NET', '.NET System.Addins',
  'Salesforce', 'Salesforce.com',
].map(keywordsMapper);

// A mock list of keywords to allow in the Tracks filter.
const VALID_SUBTRACKS = [
  'Code', 'Design First2Finish', 'First2Finish', 'Web Design',
  'Widget or Mobile Screen Design',
].map(keywordsMapper);

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

// The demo component itself.
class ChallengeFiltersExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      currentCardType: 'Challenges',
      filter: new ChallengeFilter(),
      lastFetchId: 0,
      sidebarFilter: new SideBarFilter(),
    };
    if (props.filterFromUrl) {
      const f = JSON.parse(atob(props.filterFromUrl));
      this.state.filter = new ChallengeFilter(f[0]);
      this.state.sidebarFilter = new SideBarFilter(f[1]);
    }
    this.setCardType.bind(this);
    this.fetchChallenges(0).then(res => this.setChallenges(0, res));
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
    this.setState({ challenges: [], lastFetchId: fetchId });
    this.fetchChallenges(fetchId).then(res => this.setChallenges(fetchId, res, f));
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
    this.setState({ challenges: c });
  }

  // set current card type
  setCardType(cardType) {
    this.setState({
      currentCardType: cardType,
    });
  }

  /**
   * TODO: fetchChallenges() method, merged from a parallel dev branch, takes
   * care of normalization of loaded challenge objects, i.e. it attaches to them
   * all expected fields, in case they are missing. Though, as this function does
   * a way more assignments, and probably some of them done differently and other
   * parts of the code rely on them, I don't merge this into fetchChallenges()
   * yet. This should be done carefully at some later point.
   * DEFINITELY DON'T ADD NEW ASSIGNMENTS HERE!
   */
  // construct data for marathon match which its properties name match to develop track
  constDataForMarathonMatch(item) {
    item.subTrack = 'MARATHON_MATCH'
    item.track = 'DATA_SCIENCE'
    item.challengeId = item.roundId
    item.technologies = []
    item.prize = []
    item.submissionEndDate = item.endDate
    item.totalPrize = 0
    item.challengeName = item.fullName
    item.numRegistrants = item.numberOfRegistrants
    item.numSubmissions = item.numberOfSubmissions
    item.registrationStartDate = item.startDate
    item.currentPhaseEndDate = item.endDate
    item.registrationOpen = 'Yes'
  }

  /**
   * Saves current filters to the URL hash.
   */
  saveFiltersToHash() {
    const payload = btoa(JSON.stringify([
      this.state.filter.stringify(),
      this.state.sidebarFilter.stringify(),
    ]));
    this.props.onSaveFilterToUrl(payload);
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
      VALID_KEYWORDS.push(keywordsMapper(key));
      knownKeywords.add(key);
      forceUpdate = true;
    }
    function helper2(response, community) {
      return response.json().then(res => res.data.forEach((item) => {
        const existing = map[item.challengeId];
        if (existing) existing.communities.add(community);
        else {
          _.defaults(item, {
            platforms: [],
            registrationOpen: '',
            technologies: [],
            communities: new Set(),
          });
          map[item.challengeId] = item;
          item.communities.add(community);
          challenges.push(item);
          item.platforms.forEach(helper1);
          item.technologies.forEach(helper1);
        }
      }));
    }
    const api = this.props.config.API_URL_V2;
    return Promise.all([
      fetch(`${api}/challenges/active?type=design`).then(res => helper2(res, DESIGN_TRACK)),
      fetch(`${api}/challenges/active?type=develop`).then(res => helper2(res, DEVELOP_TRACK)),
      fetch(`${api}/dataScience/challenges/active`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
      // TODO: Actually marathon matches loaded by this endpoint, are already
      // present in the results from the previous call, but this endpoint
      // returns some MM specific data. For this method, it is not a problem:
      // it properly merges results fetched from different endpoints, without
      // dublicating challenge objects for the same challenge returned from
      // several calls. But, it will be better to check whether we can
      // avoid this call, and be happy with the data already included
      // by the previous call? Proably, it is related to getting rid of
      // constDataForMarathonMatch() function and related functionality.
      fetch(`${api}/data/marathon/challenges/?listType=active`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
    ]).then(() => {
      // TODO: Using forceUpdate() in ReactJS is a bad practice. The reason here
      // is that we need to update the component if we have updated the mock list
      // VALID_KEYWORDS. In the real App the list of valid keywords will be passed
      // via props from the parent component, and no force update will be necessary.
      // Thus, it is a temporary solution, which will be changed later.
      if (forceUpdate) this.forceUpdate();
      return challenges;
    });
  }

  onFilterByTopFilter(filter) {
    this.setState({ filter }, () => this.saveFiltersToHash(filter));
  }

  // ReactJS render method.
  render() {
    const cardify = challenge => (
      <ChallengeCard
        challenge={challenge}
        onTechTagClicked={(tag) => {
          if (this.challengeFilters) this.challengeFilters.setKeywords(tag);
        }}
        key={challenge.challengeId}
      />
    );
    let myChallengesId = []
    // get my challenges id
    if (this.props.myChallenges) {
       myChallengesId = this.props.myChallenges.map(function(challenge) {
        return challenge.id
      })
    }
    let challenges = this.state.challenges.filter(this.state.filter.getFilterFunction());
    challenges = challenges.map((item) => {
      const i = _.clone(item);
      if (item.roundId) {
        // TODO: This should not be done here! All normalization of fetched challenge
        // objects should happen inside fetchChallenges().
        this.constDataForMarathonMatch(i);
      } else {
        i.subTrack = item.challengeType.toUpperCase().split(' ').join('_');
        i.track = item.challengeCommunity.toUpperCase();
      }
      // check the challenge id exist in my challenges id
      // TODO: This is also should be moved to a better place, fetchChallenges() ?
      if(_.indexOf(myChallengesId, i.challengeId) > -1) {
        i.myChallenge = true
      }
      return i;
    });

    const filterChallenges = challenges.filter(
      this.state.sidebarFilter.getFilterFunction()).map(cardify);

    return (
      <div>
        <ChallengeFilters
          filter={this.state.filter}
          onFilter={filter => this.onFilterByTopFilter(filter)}
          onSaveFilter={(filter) => {
            if (this.sidebar) {
              const f = (new SideBarFilter(SideBarFilterModes.CUSTOM)).merge(filter);
              f.name = this.sidebar.getAvailableFilterName();
              this.sidebar.addFilter(f);
            }
          }}
          onSearch={(query, filter) => this.onSearch(query, filter)}
          validKeywords={VALID_KEYWORDS}
          validSubtracks={VALID_SUBTRACKS}
          setCardType={cardType => this.setCardType(cardType)}
          isCardTypeSet={this.state.currentCardType}
          ref={(node) => { this.challengeFilters = node; }}
        />
        <div className={`tc-content-wrapper srm ${this.state.currentCardType === 'SRMs' ? '' : 'hidden'}`}>
          <div className="challenges-container SRMs-container">
            {/* happening now */}
            <div className="SRMCardExamples example-lg">
              <SRMCard category={'now'} />
            </div>
            {/* upcoming SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Upcoming SRMs</div>
              <SRMCard category={'upcoming'} />
              <SRMCard category={'upcoming'} />
            </div>
            {/* past SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Past SRMs</div>
              <SRMCard category={'past'} />
            </div>
          </div>

          <div className="sidebar-container srm">
            <ChallengesSidebar SidebarMock={SRMsSidebarMock} />
          </div>
        </div>

        <div className={`tc-content-wrapper ${this.state.currentCardType === 'Challenges' ? '' : 'hidden'}`}>
          <div className="challenge-cards-container">
            <div className="ChallengeCardExamples example-lg">
              {filterChallenges}
            </div>
          </div>

          <Sticky
            className="sidebar-container"
            enableTransforms={false}
            top={18}
          >
            <SideBarFilters
              challenges={challenges}
              filter={this.state.sidebarFilter}
              onFilter={filter => this.setState({ sidebarFilter: filter }, () => this.saveFiltersToHash())}
              ref={(node) => {
                this.sidebar = node;
              }}
              isAuth={this.props.isAuth}
              myChallenges={this.props.myChallenges}
            />
          </Sticky>
        </div>
      </div>
    );
  }
}

ChallengeFiltersExample.defaultProps = {
  config: {
    API_URL_V2: 'https://api.topcoder.com/v2',
  },
  filterFromUrl: '',
  onSaveFilterToUrl: _.noop,
};

ChallengeFiltersExample.propTypes = {
  config: PT.shape({
    API_URL_V2: PT.string,
  }),
  filterFromUrl: PT.string,
  onSaveFilterToUrl: PT.func,
};

export default ChallengeFiltersExample;
