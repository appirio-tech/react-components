/* global
  Math, window, Promise
*/

/**
 *  This component handles the display of an infinite list of items as well as
 *  their sorting, filtering and any further loading.
 *
 *  It takes an initial list of items and once the user scrolls to the bottom of
 *  the list. The component adds a batch of new item ids, loads a batch of templates
 *  with those ids, fetch more items and then load these items into the DOM in
 *  smaller batches to replace the templates with the ids.
 *
 *  The above-mentioned behaviour will continue until the number of the cached
 *  items is equal to or more than the total item count passed in as props
 *  to the component. The total item count should be the total amount of items
 *  available for retrieval from the database.
 *
 *  For performance purposes, this component does not keep any state. All the
 *  state properties are kept at the component object level. And the component
 *  will only re-render if forceUpdate is called. forceUpdate is called in three
 *  methods, reCacheItemElements, setLoadingStatus and addNewItems. This is
 *  similar to how Redux updates a component.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import {
  fetchAdditionalItems,
  generateIds,
  stopNewItemReturnChain,
  organizeItems,
} from './generalHelpers';

const assignedIdKey = 'assignedId';
const loadpointBottomOffset = -150;
const initialPageIndex = 1;
const { arrayOf, object, func, string, bool, number, oneOfType } = React.PropTypes;

class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.initializeProperties(props, true);
  }

  // from the new props determine what have changed and blow away cache
  // and reload items based on new props
  componentWillReceiveProps(nextProps) {
    const { filter: oldFilter, sort: oldSort, uniqueIdentifier } = this.props;
    const { itemCountTotal, filter, sort } = nextProps;
    const [newlyOrganizedItems, oldOrganizedItems] = [
      [filter, sort], [oldFilter, oldSort],
    ].map(organizers => organizeItems(this.items, organizers[0], organizers[1]));
    const [newItemOrderRepresentation, oldItemOrderRepresentation] = [
      newlyOrganizedItems, oldOrganizedItems,
    ].map(items => _.map(items, uniqueIdentifier).join(''));

    if (itemCountTotal !== this.props.itemCountTotal) {
      stopNewItemReturnChain();
      this.initializeProperties(nextProps);
      this.setLoadingStatus(false);
    } else if (newItemOrderRepresentation !== oldItemOrderRepresentation) {
      this.reCacheItemElements(newlyOrganizedItems, nextProps.renderItem);
    }
  }

  componentWillUnmount() {
    stopNewItemReturnChain();
  }

  // initialize properties/state of the component
  // load an initial number of items and then cache the rest from
  // the passed-in items
  initializeProperties(props, isMounting = false) {
    const { items, batchNumber, sort } = props;
    const sortedItems = organizeItems(items, () => true, sort);
    const initialLoadNumber = batchNumber + (items.length % batchNumber);

    this.currentPageIndex = initialPageIndex;
    this.items = [];
    this.cachedItemElements = [];
    this.ids = [];
    this.addBatchIds(initialLoadNumber);
    this.addNewItems(sortedItems.slice(0, initialLoadNumber), props, isMounting);
    this.cachedPassedInItems = sortedItems.slice(initialLoadNumber);
  }

  reCacheItemElements(organizedItems, renderItem) {
    this.cachedItemElements = organizedItems
      .map(item => renderItem(item[assignedIdKey], item));

    this.forceUpdate();
  }

  addNewItems(newItems, nextProps = null, isInitialization = false) {
    if (!newItems) return;

    const { renderItem, sort, filter } = nextProps || this.props;
    const { items: existingItems, cachedItemElements, ids, idPrefix } = this;
    const { length: existingItemCount } = existingItems;

    const stampedNewItems = newItems.map((item, index) => {
      const idIndex = existingItemCount + index;

      return _.set(item, assignedIdKey, ids[idIndex] || `${idPrefix}-${idIndex}`);
    });

    const newElements = organizeItems(stampedNewItems, filter, sort)
      .map(item => renderItem(item[assignedIdKey], item));

    this.items = existingItems.concat(stampedNewItems);
    this.cachedItemElements = cachedItemElements.concat(newElements);
    if (!isInitialization) this.forceUpdate();
  }

  setLoadingStatus(status) {
    if (this.loading !== status) {
      this.loading = status;
      this.forceUpdate();
    }
  }

  addBatchIds(numberToAdd) {
    const { batchNumber } = this.props;
    const { ids = [], idPrefix } = this;

    this.idPrefix = idPrefix || Math.random().toString(36).substring(7);
    this.ids = ids.concat(generateIds(numberToAdd || batchNumber, this.idPrefix, ids.length));
  }

  // fetch new items either from cache or API endpoint
  fetchNewItems() {
    const { fetchItems, batchNumber } = this.props;
    const { cachedPassedInItems } = this;

    if (cachedPassedInItems.length === 0) {
      return fetchItems(this.currentPageIndex + 1);
    } else {
      this.cachedPassedInItems = cachedPassedInItems.slice(batchNumber);
      return Promise.resolve(cachedPassedInItems.slice(0, batchNumber));
    }
  }

  onScrollToLoadPoint() {
    if (this.loading || this.items.length >= this.props.itemCountTotal) return;

    this.addBatchIds();

    const { uniqueIdentifier } = this.props;
    this.setLoadingStatus(true);

    fetchAdditionalItems({
      itemUniqueIdentifier: uniqueIdentifier,
      currentItems: this.items,
      fetchItems: () => this.fetchNewItems(),
      finishCallback: (newItems) => {
        this.props.fetchItemFinishCallback(newItems);
        this.currentPageIndex += 1;
        this.setLoadingStatus(false);
      },
      successCallback: newItems => this.addNewItems(newItems),
    });
  }

  render() {
    const { ids, cachedItemElements, items: { length: loadedCount } } = this;
    const { renderItemTemplate, batchNumber } = this.props;
    let templates;

    if (this.loading) {
      templates = _.slice(ids, loadedCount, loadedCount + batchNumber)
        .map(id => renderItemTemplate(id));
    } else {
      templates = [];
    }

    return (
      <div>
        {cachedItemElements}
        {templates}
        <Waypoint
          onEnter={() => this.onScrollToLoadPoint()}
          scrollableAncestor={window}
          bottomOffset={loadpointBottomOffset}
          key={Math.random()}
        />
      </div>
    );
  }
}

InfiniteList.defaultProps = {
  items: [],
  itemCountTotal: 0,
  batchNumber: 50,
  fetchMoreItems: _.noop,
  renderItem: _.noop,
  renderItemTemplate: _.noop,
  filter: () => true,
  sort: () => true,
  fetchItems: null,
  uniqueIdentifier: false,
  fetchItemFinishCallback: _.noop,
};

InfiniteList.propTypes = {
  items: arrayOf(object),
  itemCountTotal: number,
  batchNumber: number,
  fetchItems: func,
  renderItem: func,
  renderItemTemplate: func,
  filter: func,
  sort: func,
  uniqueIdentifier: oneOfType([string, bool]),
  fetchItemFinishCallback: func,
};

export default InfiniteList;
