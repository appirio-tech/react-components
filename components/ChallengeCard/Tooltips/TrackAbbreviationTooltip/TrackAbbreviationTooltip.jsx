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
  'APPLICATION_FRONT-END_DESIGN': 'Design UI and front end experiences for apps',
  ASSEMBLY_COMPETITION: 'Develop code for a variety of use cases. Rigorous review and final fix process is included.',
  CODE: 'Develop code for apps, services, etc. Final fixes are not included',
  FIRST_2_FINISH: 'Be the first to deliver the solution',
  DESIGN_FIRST_2_FINISH: 'Be the first to deliver the solution',
  'PRINT/PRESENTATION': 'Design print and presentation assets',
  UI_PROTOTYPE_COMPETITION: 'Develop the front end of a UX',
  ARCHITECTURE: 'Architect modules, components, or full applications',
  WEB_DESIGN: 'Design UI and front end experiences for web experiences',
  WEB_DESIGNS: 'Design UI and front end experiences for web experiences',
  WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Design UI and front end experiences for mobile',
  WIREFRAMES: 'Produce the information architecture for user experiences',
  SRM: 'Single Round Match - quickly write code to solve algorythm problems head to head against other competitors',
  MARATHON_MATCH: 'Write algorythms to solve complex problems, often for real world issues',
};

const HEADER = {
  'APPLICATION_FRONT-END_DESIGN': 'Application Front-End Design (AFED)',
  ASSEMBLY_COMPETITION: 'Assembly (As)',
  CODE: 'Code (Cd)',
  FIRST_2_FINISH: 'First2Finish (F2F)',
  'PRINT/PRESENTATION': 'Print/Presentation (PP)',
  UI_PROTOTYPE_COMPETITION: 'UI Prototype (Pr)',
  ARCHITECTURE: 'Architecture (Ar)',
  WEB_DESIGN: 'Web Design (Wd)',
  WEB_DESIGNS: 'Web Design (Wd)',
  WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Widget or Mobile Screen Design (Wg)',
  SRM: 'Single Round Match (SRM)',
  MARATHON_MATCH: 'Marathon Match',
  DESIGN_FIRST_2_FINISH: 'Design First2Finish(DF2F)',
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
