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
import React from 'react';

import { ChallengeFilters, DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK } from './ChallengeFilters.jsx';
import SideBarFilters from '../SideBarFilters';
import Sticky from 'react-stickynode';
import './ChallengeFiltersExample.scss';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import SRMCard from '../SRMCard/SRMCard';
import ChallengesSidebar from '../ChallengesSidebar/ChallengesSidebar';
import '../ChallengeCard/ChallengeCard.scss';

const ID_LENGTH = 6
const V2_API = 'https://api.topcoder.com/v2';
const CHALLENGES_API = `${V2_API}/challenges/`;
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
const VALID_KEYWORDS = [
  'ActionScript', 'ADO.NET', 'AJAX', 'Android', 'Angular.js', 'Apache Derby',
  'Apex', 'AWS', 'Box', 'Brivo Labs', 'Cisco', 'Cloud Foundry', 'CloudFactor',
  'Data Science', 'EC2', 'Force.com', 'iOS', 'Java', '.NET', '.NET System.Addins',
  'Salesforce', 'Salesforce.com'
].map(keywordsMapper);

// A mock list of keywords to allow in the Tracks filter.
const VALID_TRACKS = [
  'Code', 'Design First2Finish', 'First2Finish', 'Web Design',
  'Widget or Mobile Screen Design'
].map(keywordsMapper);

// A mock list of challenges side bar
const ChallengesSidebarMock = {
  all: {name: 'All Challenges', value: 3},
  myChallenges: {name: 'My Challenges', value: 3},
  others: [
    {name: 'Open for registration', value: 16},
    {name: 'Ongoing challenges', value: 34},
    {name: 'Past challenges', value: 580},
  ],
  myFilters: [
    {name: 'iOS Design Challenges', value: 6},
    {name: 'TCO Wireframing', value: 0},
    {name: 'My Winnings', value: 56},
  ]
}
// A mock list of SRMs side bar
const SRMsSidebarMock = {
  all: {name: 'All SRMs', value: 853},
  myChallenges: {name: 'My Challenges', value: 3},
  others: [
    {name: 'Upcoming SRM', value: 16},
    {name: 'Past SRM', value: 34},
  ],
  myFilters: [
    {name: 'TCO Finals', value: 23},
  ]
}

// The demo component itself.
class ChallengeFiltersExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      filter: () => true,
      currentCardType: 'Challenges',
      sidebarFilter: () => true,
    };

    const that = this;
    // When the component is created, this fetches and displays all challenges.
    fetch(`${V2_API}/challenges/active`)
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          challenges: this.state.challenges.concat(json.data),
        })
      })
    })
    fetch(`${V2_API}/data/marathon/challenges/?listType=active`)
    .then((response) => {
      response.json().then((json) => {
        that.setState({
          challenges: this.state.challenges.concat(json.data),
        })
      })
    })

    this.setCardType.bind(this)
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
   * @param {Set} tracks A set of DATA_SCIENCE_TRACK, DESIGN_TRACK, and DEVELOP_TRACK
   *  where the search should be done.
   * @param {Function(Challenge)} filter Additional filter function.
   */
  onSearch(searchString, tracks, filter) {

    // Returns true or false when the specified challenge 'item' satisfies
    // the 'searchString' and 'filter'.
    const combiFilter = item => {
      if (!filter(item)) return false;
      if (searchString) {
        const platforms = item.platforms ? item.platforms.join(' ') : '';
        const techs = item.technologies ? item.technologies.join(' ') : '';
        const marathonMatchName = item.fullName ? item.fullName : '';

        const data = `${marathonMatchName} ${item.challengeName} ${platforms} ${techs}`.toLowerCase();
        if (data.indexOf(searchString.toLowerCase()) < 0) return false;
      }
      return true;
    }

    // Fetches an array of challenges from the given 'url', filters it with the
    // 'combiFilter' helper, and appends to the list of challenges displayed by
    // this component.
    const fetcher = url => {
      let that = this
      fetch(url)
      .then(res => res.json()).then(res => {
        const data = res.data.filter(combiFilter);

        if (data.length) {
          this.setState({ challenges: this.state.challenges.concat(data) });
        }
      })
    }

    // Before the search, clears the list of challenges displayed by this component.
    this.setState({challenges: []});

    // NOTE: Challenges from DATA_SCIENCE_TRACK are also included into results
    // from the endpoint for quering DEVELOP_TRACK challenges. Thus, we should
    // not call the data science enpoint, if the develop challenges endpoint
    // was called already.
    if (!tracks.size) {
      fetcher(`${V2_API}/challenges/active`);
      fetcher(`${V2_API}/data/marathon/challenges/?listType=active`);
    }
    else {
      if (!tracks.size || tracks.has(DEVELOP_TRACK)) fetcher(`${V2_API}/challenges/active?type=develop`);
      else if (tracks.has(DATA_SCIENCE_TRACK)) {
        fetcher(`${V2_API}/data/marathon/challenges/?listType=active`);
        fetcher(`${V2_API}/challenges/active?challengeType=First2Finish,Code&technologies=Data+Science&type=develop`);
      }
      if (tracks.has(DESIGN_TRACK)) fetcher(`${V2_API}/challenges/active?type=design`);
    }
  };

  // set current card type
  setCardType(cardType) {
    this.setState({
      currentCardType: cardType
    })
  }
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

  // ReactJS render method.
  render() {
    var cardify = challenge => {
      return (
        <ChallengeCard key={challenge.challengeId} challenge={challenge} />
      )
    }
    let myChallengesId = []
    // get my challenges id
    if(this.props.myChallenges) {
       myChallengesId = this.props.myChallenges.map(function(challenge) {
        return challenge.id
      })
    }

    let challenges = this.state.challenges.filter(this.state.filter).map(item => {
      if(item.roundId) {
        this.constDataForMarathonMatch(item)
      } else {
        item.subTrack = item.challengeType.toUpperCase().split(' ').join('_')
        item.track = item.challengeCommunity.toUpperCase()
      }
      // check the challenge id exist in my challenges id
      if(_.indexOf(myChallengesId, item.challengeId) > -1) {
        item.myChallenge = true
      }
      return item
    });

    var length = challenges.length;
    const filterChallenges = challenges.filter(this.state.sidebarFilter).map(function(challenge) {
      return (
        <ChallengeCard key={challenge.challengeId} challenge={challenge} />
      );
    });

    return (
      <div>
        <ChallengeFilters
          onFilter={filter => this.setState({ filter })}
          onSaveFilter={(filter) => {
            if (this.sidebar) {
              const name = this.sidebar.getAvailableFilterName();
              this.sidebar.addFilter({
                name,
                filter,
              });
            }
          }}
          onSearch={(query, searchString, tracks, filter) => this.onSearch(searchString, tracks, filter)}
          onTrackSwitch={_.noop}
          validKeywords={VALID_KEYWORDS}
          validTracks={VALID_TRACKS}
          setCardType={(cardType) => this.setCardType(cardType)}
          isCardTypeSet={this.state.currentCardType}
        />
        <div className={"tc-content-wrapper srm " + (this.state.currentCardType === 'SRMs' ? '': 'hidden') }>
          <div className="challenges-container SRMs-container">
            {/* happening now */}
            <div className="SRMCardExamples example-lg">
              <SRMCard category={'now'}></SRMCard>
            </div>
            {/* upcoming SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Upcoming SRMs</div>
              <SRMCard category={'upcoming'}></SRMCard>
              <SRMCard category={'upcoming'}></SRMCard>
            </div>
            {/* past SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Past SRMs</div>
              <SRMCard category={'past'}></SRMCard>
            </div>
          </div>

          <div className="sidebar-container srm">
            <ChallengesSidebar SidebarMock={SRMsSidebarMock}></ChallengesSidebar>
          </div>
        </div>

        <div className={"tc-content-wrapper " + (this.state.currentCardType === 'Challenges' ? '': 'hidden') }>
          <div className="challenge-cards-container">
            <div className="ChallengeCardExamples example-lg">
              <div className="title">Active Develop Challenges</div>
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
              onFilter={filter => this.setState({ sidebarFilter: filter })}
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
  };
};

export default ChallengeFiltersExample;
