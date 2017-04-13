/**
 *  The component displays a Sidebar Placeholder without any data.
 *  The empty data is replaced with grey background.
 */

import React from 'react';
import '../../SideBarFilters/SideBarFilters.scss';
import './SidebarFilterPlaceholder.scss';
import '../ComponentPlaceholder.scss';

const domain = '';
const { string, number, oneOfType } = React.PropTypes;

const SidebarFilterPlaceholder = () => (
  <div className="SideBarFilters placeholder">
    <div className="FilterBox">
      <div className="filter-item placeholder-template" />
      <div className="filter-item placeholder-template" />
      <div className="filter-item placeholder-template" />
      <div className="filter-item placeholder-template" />
      <hr />
      <div className="filter-item placeholder-template" />
      <hr />
      <div className="get-rss">
        <a href={'RSS_LINK'}>Get the RSS feed</a>
      </div>
    </div>
    <div className="sidebar-footer">
      <ul>
        <li><a href={`https://www.${domain}/about`}>About</a>&nbsp;•&nbsp;</li>
        <li><a href={`https://help.${domain}/hc/en-us/articles/219069687-Contact-Support`}>Contact</a>&nbsp;•&nbsp;</li>
        <li><a href={`https://help.${domain}`}>Help</a>&nbsp;•&nbsp;</li>
        <li><a href={`https://www.${domain}/community/how-it-works/privacy-policy/`}>Privacy</a>&nbsp;•&nbsp;</li>
        <li><a href={`https://www.${domain}/community/how-it-works/terms/`}>Terms</a></li>
      </ul>
      <p className="copyright">Topcoder © 2017</p>
    </div>
  </div>
);

SidebarFilterPlaceholder.defaultProps = {
};

SidebarFilterPlaceholder.propTypes = {

};

export default SidebarFilterPlaceholder;
