import React from 'react';
import SRMCard from './SRMCard.jsx';

require('./SRMCardExamples.scss');

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

const SRMCardExamples = () => (
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
          <SRMCard category={'upcoming'}></SRMCard>
          <SRMCard category={'upcoming'}></SRMCard>
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

export default SRMCardExamples;
