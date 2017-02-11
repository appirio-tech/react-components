/**
 * Sidebar content in the Edit My Filters mode. Implemented as a stateful component,
 * so that it controls reordering of filters by dragging on its own, using its
 * local state, and when the Done button is clicked, the resulting order is
 * submitted to the parent component via a callback.
 */

import _ from 'lodash';
import React, { PropTypes as PT } from 'react';
import { ActiveFilterItem } from '../FilterItems';
import './EditMyFilters.scss';

const MAX_FILTER_NAME_LENGTH = 35;

class EditMyFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: props.filters.map((filter, index) => ({
        filter,
        key: index,
      })),
    };
  }

  onDone() {
    const filters = this.state.filters.map(item => item.filter);
    this.props.onDone(filters);
  }

  /**
   * Handles dragging of a filter item.
   * @param {Object} event ReactJS onDrag event.
   *
   * NOTE: This implementation of dragging has a flaw: if you take an item and
   * drug it down, you'll see that it is correctly moved down the list, but its
   * highlighting (at least in Chrome) remains in the original position. Compare
   * to the situation, when you drag an item upward the list: the highlighting
   * moves properly with the item. This is related to the way ReactJS interacts
   * with DOM, and, most probably, it is just easier to adopt some 3-rd party
   * Drag-n-Drop library, then to find out a work-around.
   */
  dragHandler(event) {
    // For a reason not clear to me, shortly after starting to drag a filter,
    // and also when the user releases the mouse button, thus ending the drag,
    // this handler gets an event with 'screenY' position equal 0. This breaks
    // the dragging handling, which works just fine otherwise. Hence, this simple
    // fix of the issue, until the real problem is figured out.
    if (!event.screenY) return;

    // Calculation of the target position of the dragged item inside the filters
    // array.
    const filters = this.state.filters;
    const shift = (event.screenY - this.drag.y) / event.target.offsetHeight;
    let index = Math.round(this.drag.startIndex + shift);
    if (index < 0) index = 0;
    else if (index >= filters.length) index = filters.length - 1;
    if (index === this.drag.index) return;

    // If current and target positions are different, we move the filter item,
    // updating the state.
    const newFilters = _.clone(filters);
    const thisFilter = newFilters.splice(this.drag.currentIndex, 1)[0];
    newFilters.splice(index, 0, thisFilter);
    this.drag.currentIndex = index;
    this.setState({ filters: newFilters });
  }

  render() {
    const filters = this.state.filters.map(({ filter, key }, index) => (
      <ActiveFilterItem
        key={key}
        name={filter.name}
        onDrag={event => this.dragHandler(event)}
        onDragStart={(event) => {
          this.drag = {
            currentIndex: index,
            startIndex: index,
            y: event.screenY,
          };
        }}
        onNameChange={(name) => {
          const newFilters = _.clone(this.state.filters);
          newFilters[index].filter = _.clone(newFilters[index].filter);
          newFilters[index].filter.name = name.slice(0, MAX_FILTER_NAME_LENGTH);
          this.setState({ filters: newFilters });
        }}
        onRemove={() => {
          const newFilters = _.clone(this.state.filters);
          newFilters.splice(index, 1);
          this.setState({ filters: newFilters });
        }}
      />
    ));
    return (
      <div className="EditMyFilters">
        <h1>My filters</h1>
        <div id="done-button" onClick={() => this.onDone()}>Done</div>
        {filters}
        <div id="note">
          Drag the filters to set the order you prefer;
          use the "x" mark to delete the filter(s) you don't need.
        </div>
      </div>
    );
  }
}

EditMyFilters.defaultProps = {
  onDone: _.noop,
};

EditMyFilters.propTypes = {
  filters: PT.arrayOf(PT.shape({})).isRequired,
};

export default EditMyFilters;
