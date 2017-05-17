/* global
  JSON
*/

import React from 'react'
import SidebarRow from './SidebarRow/SidebarRow'
import './ChallengesSidebar.scss'

const { object } = React.PropTypes

const ChallengesSidebar = ({ SidebarMock }) => {
  const all = () => {
    return(
      <SidebarRow>
        <p className={'l-row'}>{SidebarMock.all.name}</p>
        <p className={'r-row'}>{SidebarMock.all.value}</p>
      </SidebarRow>
    )
  }

  const myChallenges = () => {
    return(
      <SidebarRow>
        <p className={'l-row'}>{SidebarMock.myChallenges.name}</p>
        <p className={'r-row'}>{SidebarMock.myChallenges.value}</p>
      </SidebarRow>
    )
  }

  const others = SidebarMock.others.map((other) => {
    return (
      <SidebarRow key={JSON.stringify(other)}>
        <p className={'l-row'}>{other.name}</p>
        <p className={'r-row'}>{other.value}</p>
      </SidebarRow>
    )
  })

  const myFilters = SidebarMock.myFilters.map((other) => {
    return (
      <SidebarRow key={JSON.stringify(other)}>
        <p className={'l-row'}>{other.name}</p>
        <p className={'r-row'}>{other.value}</p>
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
              <p className={'l-row'}>MY FILTERS</p>
              <p className={'r-row'}><a href="javascript:;">edit</a></p>
            </SidebarRow>
          </div>
          {myFilters}
        </div>
      </div>
      <div className="sidebar-footer">
        <ul>
          <li><a href="/about">About</a>&nbsp;•&nbsp;</li>
          <li><a href="https://help.topcoder.com/hc/en-us/articles/219069687-Contact-Support">Contact</a>&nbsp;•&nbsp;</li>
          <li><a href="https://help.topcoder.com/">Help</a>&nbsp;•&nbsp;</li>
          <li><a href="/community/how-it-works/privacy-policy/">Privacy</a>&nbsp;•&nbsp;</li>
          <li><a href="/community/how-it-works/terms/">Terms</a>&nbsp;•&nbsp;</li>
        </ul>
        <p className="copyright">Topcoder © 2017.</p>
      </div>
    </div>
  )
}

ChallengesSidebar.defaultProps = {
  SidebarMock: undefined,
}

ChallengesSidebar.propTypes = {
  SidebarMock: object,
}

export default ChallengesSidebar
