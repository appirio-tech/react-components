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

import React from 'react';

import { ChallengeFilters, DATA_SCIENCE_TRACK, DESIGN_TRACK, DEVELOP_TRACK } from './ChallengeFilters.jsx';
import './ChallengeFiltersExample.scss';

const V2_API = 'http://api.topcoder-dev.com/v2';

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

// The demo component itself.
class ChallengeFiltersExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      filter: () => true,
    };

    // When the component is created, this fetches and displays all challenges.
    fetch(`${V2_API}/challenges/active`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        challenges: this.state.challenges.concat(res.data),
      });
    });
  };

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
        const data = `${item.challengeName} ${platforms} ${techs}`.toLowerCase();
        if (data.indexOf(searchString.toLowerCase()) < 0) return false;
      }
      return true;
    }

    // Fetches an array of challenges from the given 'url', filters it with the
    // 'combiFilter' helper, and appends to the list of challenges displayed by
    // this component.
    const fetcher = url => {
      fetch(url).then(res => res.json()).then(res => {
        const d = res.data.filter(combiFilter);
        if (d.length) this.setState({ challenges: this.state.challenges.concat(d) });
      });      
    }

    // Before the search, clears the list of challenges displayed by this component.
    this.setState({challenges: []});

    // NOTE: Challenges from DATA_SCIENCE_TRACK are also included into results
    // from the endpoint for quering DEVELOP_TRACK challenges. Thus, we should
    // not call the data science enpoint, if the develop challenges endpoint
    // was called already.
    if (!tracks.size) fetcher(`${V2_API}/challenges/active`);
    else {
      if (tracks.has(DEVELOP_TRACK)) fetcher(`${V2_API}/challenges/active?type=develop`);
      else if (tracks.has(DATA_SCIENCE_TRACK)) fetcher(`${V2_API}/dataScience/challenges/active`);
      if (tracks.has(DESIGN_TRACK)) fetcher(`${V2_API}/challenges/active?type=design`);
    }
  };

  // ReactJS render method.
  render() {
    const challenges = this.state.challenges.filter(this.state.filter).map(item => (
      <pre className="Challenge" key={item.challengeId}>
        {JSON.stringify(item, null, 2)}
      </pre>
    ));

    return (
      <div>
        <ChallengeFilters
          onFilter={filter => this.setState({filter})}
          onSearch={(query, searchString, tracks, filter) => this.onSearch(searchString, tracks, filter)}
          validKeywords={VALID_KEYWORDS}
          validTracks={VALID_TRACKS}
        />
        {challenges}
      </div>
    );
  };
};

export default ChallengeFiltersExample;
