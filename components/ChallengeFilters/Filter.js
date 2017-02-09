/**
 * An abstract filter object.
 * It is the base class for hierarchy of filter objects implemented in various
 * components inside the challenge listing page. It describes their common
 * interface, thus making it easier to combine and handle them together.
 */

import _ from 'lodash';

export default class Filter {

  /**
   * Creates a new filter object.
   * @param {String} filterString An optional string to set the properties of
   *  the filter. When not provided, the filter will be created with default
   *  parameters.
   */
  constructor(filterString) {
    _.noop(filterString);
  }

  /**
   * Returns a deep copy of this filter object.
   * As we assume that
   */
  clone() {
    _.noop(this);
    return new Filter();
  }

  /**
   * Returns the count of active primitive filters. Just for visualization
   * purposes.
   * @return The count.
   */
  count() {
    _.noop(this);
    return 0;
  }

  /**
   * Returns a filter function, which can be passed to an array's fitler()
   * method to filter it with this filter. This is more efficient, than providing
   * a filter() method, which applies current filter to an array passed in as
   * the argument.
   * @return (Function(Object)) Filter function.
   */
  getFilterFunction() {
    _.noop(this);
    return () => true;
  }

  /**
   * Serialises the filter into a string.
   * @return {String} String representation of the filter.
   */
  stringify() {
    _.noop(this);
    return '';
  }
}
