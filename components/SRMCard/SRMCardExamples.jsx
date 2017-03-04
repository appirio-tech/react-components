import React from 'react';
import SRMCard from './SRMCard.jsx';

require('./SRMCardExamples.scss');

/**
 * Base API version 3 URL
 */
const API_V3 = `https://api.topcoder.com/v3/srms`

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
class SRMCardExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srmChallenges: [],
    }

    /* Fetching of SRM challenges */
    fetch(`${API_V3}s/?filter=status=FUTURE`)
      .then(res => res.json())
      .then((json) => {
        this.setState({srmChallenges: json.result.content})
      })
  }

  render() {
    // Upcoming srms
    let futureSRMChallenge = this.state.srmChallenges.filter(function(challenge) {
      return challenge.status === "FUTURE"
    })

    futureSRMChallenge = futureSRMChallenge.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    const UpcomingSrm = futureSRMChallenge.map((srmChallenge, i) => {
      return <SRMCard category={'upcoming'} srmChallenge={srmChallenge} key={i}/>
    })

    return(
      <div className="SRMsCardExamples">
        <div className={"tc-content-wrapper srm"}>
          <div className="challenges-container SRMs-container">
            {/* happening now */}
            <div className="SRMCardExamples example-lg">
              <SRMCard category={'now'}></SRMCard>
            </div>
            {/* upcoming SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Upcoming SRMs</div>
              { UpcomingSrm }
            </div>
            {/* past SRMs */}
            <div className="SRMCardExamples example-lg">
              <div className="title">Past SRMs</div>
              <SRMCard category={'past'}></SRMCard>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default SRMCardExamples;
