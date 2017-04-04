/**
 * This file exports two similar components: one represents a row in the sidebar,
 * when the sidebar is in its regular state; the other represents a row in the
 * sidebar, when the sidebar is in the Edit My Filters state.
 */

import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import './FilterItems.scss';

import ArrowsMoveVertical from '../../Icons/ArrowsMoveVertical';
import UiSimpleRemove from '../../Icons/UiSimpleRemove';

/**
 * A single line in the sidebar in the 'Edit My Filters' mode. It shows the filter
 * name, and additional controls, if hovered. It triggers a few callbacks on user
 * interactions.
 */
function ActiveFilterItem(props) {
  return (
    <div
      className="ActiveFilterItem"
      draggable
      onDrag={event => props.onDrag(event)}
      onDragStart={event => props.onDragStart(event)}
    >
      <ArrowsMoveVertical className="icon-arrows-v" />
      <input
        className="left"
        onChange={event => props.onNameChange(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') event.target.blur();
        }}
        value={props.name}
        type="text"
      />
      <span className="right" onClick={props.onRemove}>
        <UiSimpleRemove className="icon-cross" />
        <div className="cross-tooltip">Delete Filter</div>
      </span>
    </div>
  );
}

ActiveFilterItem.defaultProps = {
  onDrag: _.noop,
  onDragStart: _.noop,
  onNameChange: _.noop,
  onRemove: _.noop,
};

ActiveFilterItem.propTypes = {
  name: PT.string.isRequired,
  onRemove: PT.func,
  onDrag: PT.func,
  onDragStart: PT.func,
  onNameChange: PT.func,
};

/**
 * A single line in the sidebar in its normal mode. It shows the filter name and
 * the count of matching items. Can be highlighted.
 */
function FilterItem(props) {
  let baseClasses = 'FilterItem';
  if (props.highlighted) baseClasses += ' highlighted';
  return (
    <div className={baseClasses} onClick={props.onClick}>
      <span className="left">{props.name}</span>
      <span className="right">{props.name === 'Past challenges' ? '' : props.count}</span>
    </div>
  );
}

FilterItem.defaultProps = {
  highlighted: false,
  onClick: _.noop,
};

FilterItem.propTypes = {
  count: PT.number.isRequired,
  highlighted: PT.bool,
  onClick: PT.func,
  name: PT.string.isRequired,
};

export { ActiveFilterItem, FilterItem };
