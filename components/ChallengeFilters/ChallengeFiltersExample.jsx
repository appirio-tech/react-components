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
import ChallengeCardContainer from '../ChallengeCardContainer/ChallengeCardContainer';
import SRMCard from '../SRMCard/SRMCard';
import ChallengesSidebar from '../ChallengesSidebar/ChallengesSidebar';
import '../ChallengeCard/ChallengeCard.scss';

/**
 * Base API version 3 URL
 */
const API_V3 = `https://api.topcoder.com/v3/srms`

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
      srmChallenges: [],
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

    /* Fetching of SRM challenges */
    fetch(`${API_V3}/?filter=status=FUTURE`)
      .then(res => res.json())
      .then((json) => {
        this.setState({srmChallenges: json.result.content})
      })
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
    /* Normalizes challenge objects received from different API endpoints,
     * and adds them to the list of loaded challenges. */
    function helper2(response, community) {
      return response.json().then(res => res.data.forEach((item) => {
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
            currentPhaseName: endTimestamp > Date.now() ? 'Submission' : '',
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
          map[item.challengeId] = item;
        } else if (item.challengeType === 'SRM') {
          /* We don't support SRM yet, so we don't want them around */
        } else { /* All challenges from other endpoints have the same format. */
          const existing = map[item.challengeId];
          if (existing) existing.communities.add(community);
          else {
            const endTimestamp = new Date(item.submissionEndDate).getTime();
            _.defaults(item, {
              communities: new Set([community]),
              platforms: [],
              registrationOpen: endTimestamp > Date.now() ? 'Yes' : 'No',
              technologies: [],
              track: item.challengeCommunity.toUpperCase(),
              status: endTimestamp > Date.now() ? 'Active' : 'Completed',
              submissionEndTimestamp: endTimestamp,
              subTrack: item.challengeType.toUpperCase().split(' ').join('_'),
            });
            map[item.challengeId] = item;
            item.platforms.forEach(helper1);
            item.technologies.forEach(helper1);
          }
        }
      }));
    }
    const api = this.props.config.API_URL_V2;
    return Promise.all([
      /* Fetching of active challenges */
      fetch(`${api}/challenges/active?type=design`).then(res => helper2(res, DESIGN_TRACK)),
      fetch(`${api}/challenges/active?type=develop`).then(res => helper2(res, DEVELOP_TRACK)),
      fetch(`${api}/dataScience/challenges/active`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
      fetch(`${api}/data/marathon/challenges/?listType=active`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
      /* Fetching of some past challenges */
      fetch(`${api}/challenges/past?type=design&pageSize=20`).then(res => helper2(res, DESIGN_TRACK)),
      fetch(`${api}/challenges/past?type=develop&pageSize=20`).then(res => helper2(res, DEVELOP_TRACK)),
      fetch(`${api}/dataScience/challenges/past?pageSize=20`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
      fetch(`${api}/data/marathon/challenges/?listType=past&pageSize=20`).then(res => helper2(res, DATA_SCIENCE_TRACK)),
    ]).then(() => {
      _.forIn(map, item => challenges.push(item));
      challenges.sort((a, b) => b.submissionEndTimestamp - a.submissionEndTimestamp);
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
    // TODO: This is bad code. Generation of myChallengesId array is O(N),
    // using it to mark `My Challenges` using that array is O(N^2). Not that
    // critical for now, as nobody has huge amount of challenges he is participating,
    // but... One should generate a set of myChallengesId, which is O(N), and
    // then use it to mark `My Challenges`, which also will be O(N).
    let myChallengesId = [];
    // get my challenges id
    if (this.props.myChallenges) {
      myChallengesId = this.props.myChallenges.map(function(challenge) {
        return challenge.id;
      });
    }
    let challenges = this.state.challenges.filter(this.state.filter.getFilterFunction());
    challenges = challenges.map((item) => {
      // check the challenge id exist in my challenges id
      // TODO: This is also should be moved to a better place, fetchChallenges() ?
      if (_.indexOf(myChallengesId, item.challengeId) > -1) {
        _.assign(item, { myChallenge: true });
      }
      return item;
    });

    const { sidebarFilter } = this.state
    const { mode: sidebarFilterMode, name: sidebarFilterName } = sidebarFilter

    let challengeCardContainer
    if (sidebarFilterMode === 'custom') {
      const cardify = challenge => (
        <ChallengeCard
          challenge={challenge}
          onTechTagClicked={(tag) => {
            if (this.challengeFilters) this.challengeFilters.setKeywords(tag);
          }}
          key={challenge.challengeId}
        />
      )

      challengeCardContainer = (
        <div className="challenge-cards-container">
          <div className="ChallengeCardExamples example-lg">
            {challenges.filter(sidebarFilter.getFilterFunction()).map(cardify)}
          </div>
        </div>
      )
    } else {
      challengeCardContainer = (
        <ChallengeCardContainer
          onTechTagClicked={(tag) => this.challengeFilters.setKeywords(tag)}
          challenges={challenges}
          currentFilterName={sidebarFilterName}
          expanded={sidebarFilterMode !== 'All Challenges'}
          additionalFilter={sidebarFilter.getFilterFunction()}
        />
      )
    }

    // Upcoming srms
    let futureSRMChallenge = this.state.srmChallenges.filter(function(challenge) {
      return challenge.status === "FUTURE"
    })

    futureSRMChallenge = futureSRMChallenge.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    const UpcomingSrm = futureSRMChallenge.map((srmChallenge, i) => {
      return <SRMCard category={'upcoming'} srmChallenge={srmChallenge} key={i}/>
    })

    return (
      <div className="ChallengeFiltersExample">
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
              <SRMCard category={'now'}/>
            </div>
            {/* upcoming SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Upcoming SRMs</div>
              { UpcomingSrm }
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
          {challengeCardContainer}

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
