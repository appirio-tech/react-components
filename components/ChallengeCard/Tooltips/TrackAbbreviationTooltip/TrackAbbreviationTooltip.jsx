/**
 * Track Abbreviation Tooltip Component.
 *
 * USAGE:
 * Wrap with <TrackAbbreviationTooltip></TrackAbbreviationTooltip> tags the element(s)
 * which should show the tooltip when hovered. Pass in 'track' and 'subTrack' props.
 */

import React, { PropTypes as PT } from 'react';
import Tooltip from '../Tooltip';
import './TrackAbbreviationTooltip.scss';

const DESCRIPTION = {
  'APPLICATION_FRONT-END_DESIGN': 'Specific challenge type focused on an application\'s front-end design',
  ASSEMBLY_COMPETITION: 'Specific challenge type focused on assembly of a final product',
  CODE: 'Specific challenge type where the best solution selected by reviewers is the winner',
  FIRST2FINISH: 'Specific challenge type where the first to submit a passable solution is the winner',
  'PRINT/PRESENTATION': 'Specific challenge type focused on design of a print/presentation',
  UI_PROTOTYPE_COMPETITION: 'Specific challenge type focused on UI prototyping',
  ARCHITECTURE: 'Specific challenge type focused on Architecture',
  WEB_DESIGN: 'Specific challenge type where the first to submit a passable solution is the winner',
  WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Specific challenge type focused on design of a mobile widget or screen',
  WIREFRAMES: 'Specific challenge type focused on creation of a wireframes',
  SRM: 'Specific challenge type focused on algorithm',
  MARATHON_MATCH: 'Specific challenge type focused on algorithm',
};

const HEADER = {
  'APPLICATION_FRONT-END_DESIGN': 'Application Front-End Design (AFED)',
  ASSEMBLY_COMPETITION: 'Assembly (As)',
  CODE: 'Code (Cd)',
  FIRST2FINISH: 'First2Finish (F2F)',
  'PRINT/PRESENTATION': 'Print/Presentation (PP)',
  UI_PROTOTYPE_COMPETITION: 'UI Prototype (Pr)',
  ARCHITECTURE: 'Architecture (Ar)',
  WEB_DESIGN: 'Web Design (Wd)',
  WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Widget or Mobile Screen Design (Wg)',
  SRM: 'Single Round Match (SRM)',
  MARATHON_MATCH: 'Marathon Match',
};

const TRACK_COLOR_CLASS = {
  DESIGN: 'blue',
  DEVELOP: 'green',
  DATA_SCIENCE: 'orange',
};

/**
 * Renders the tooltip's content.
 */
function Tip(props) {
  return (
    <div>
      <div className={`header ${TRACK_COLOR_CLASS[props.track]}`}>
        {HEADER[props.subTrack]}
      </div>
      <div className="body">{DESCRIPTION[props.subTrack]}</div>
    </div>
  );
}

Tip.propTypes = {
  subTrack: PT.string.isRequired,
  track: PT.string.isRequired,
};

/**
 * Renders the tooltip.
 */
function TrackAbbreviationTooltip(props) {
  const tip = <Tip track={props.track} subTrack={props.subTrack} />;
  return (
    <Tooltip className="track-abbreviation-tooltip" content={tip}>
      {props.children}
    </Tooltip>
  );
}

TrackAbbreviationTooltip.propTypes = {
  children: PT.node.isRequired,
  subTrack: PT.string.isRequired,
  track: PT.string.isRequired,
};

export default TrackAbbreviationTooltip;
