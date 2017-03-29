import React from 'react';
import SidebarRow from './SidebarRow/SidebarRow';
require('./ChallengesSidebar.scss');

const ChallengesSidebar = ({ SidebarMock }) => {
  const all = () => {
    return(
      <SidebarRow>
        <p className={"l-row"}>{SidebarMock.all.name}</p>
        <p className={"r-row"}>{SidebarMock.all.value}</p>
      </SidebarRow>
    )
  }

  const myChallenges = () => {
    return(
      <SidebarRow>
        <p className={"l-row"}>{SidebarMock.myChallenges.name}</p>
        <p className={"r-row"}>{SidebarMock.myChallenges.value}</p>
      </SidebarRow>
    )
  }

  const others = SidebarMock.others.map((other, index) => {
    return (
      <SidebarRow key={index}>
        <p className={"l-row"}>{other.name}</p>
        <p className={"r-row"}>{other.value}</p>
      </SidebarRow>
    )
  })

  const myFilters = SidebarMock.myFilters.map((other, index) => {
    return (
      <SidebarRow key={index}>
        <p className={"l-row"}>{other.name}</p>
        <p className={"r-row"}>{other.value}</p>
      </SidebarRow>
    )
  })

  return (
    <div>
      <div className="challenges-sidebar">
        <div className="header">
          {all()}
        </div>

        <div className="challenges">
          {myChallenges()}
        </div>

        <div className="challenges">
          {others}
        </div>

        <div className="challenges">
          <div className="filters">
            <SidebarRow>
              <p className={"l-row"}>MY FILTERS</p>
              <p className={"r-row"}><a href="javascript:;">edit</a></p>
            </SidebarRow>
          </div>
          {myFilters}
        </div>
      </div>
      <div className="sidebar-footer">
        <ul>
          <li><a href="javascript:;">About</a>&nbsp;•&nbsp;</li>
          <li><a href="javascript:;">Contact</a>&nbsp;•&nbsp;</li>
          <li><a href="javascript:;">Help</a>&nbsp;•&nbsp;</li>
          <li><a href="javascript:;">Privacy</a>&nbsp;•&nbsp;</li>
          <li><a href="javascript:;">Terms</a>&nbsp;•&nbsp;</li>
          <li><a href="javascript:;">Get the RSS</a></li>
        </ul>
        <p className="copyright">Topcoder © 2016.</p>
      </div>
    </div>
  )
}

export default ChallengesSidebar;
