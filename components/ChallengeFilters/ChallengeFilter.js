/**
 * This Filter class represents the filters managed by the ChallengeFilters
 * component. It inherits the filters managed by the FilterPanel.
 */

import _ from 'lodash';

import BaseFilter from './FiltersPanel/Filter';

export const DATA_SCIENCE_TRACK = 'datasci';
export const DESIGN_TRACK = 'design';
export const DEVELOP_TRACK = 'develop';

/**
 * Returns true if two sets have at least a single equal element.
 * @param {Set} a
 * @param {Set} b
 * @return Boolean result.
 */
function doIntersect(a, b) {
  const it = a.values();
  let d = it.next();
  while (!d.done) {
    if (b.has(d.value)) return true;
    d = it.next();
  }
  return false;
}

class Filter extends BaseFilter {

  constructor(filterString) {
    if (filterString) {
      const f = JSON.parse(filterString);
      super(f[0]);
      this.tracks = new Set(f[1] !== '' ? f[1].split(',') : undefined);
    } else {
      super();
      this.tracks = new Set();
    }
  }

  clone() {
    const res = new Filter();
    _.merge(res, _.cloneDeep(this));
    return res;
  }

  count() {
    let res = super.count();
    if (this.tracks.size) res += 1;
    return res;
  }

  getFilterFunction() {
    const parent = super.getFilterFunction();
    return (item) => {
      if (this.tracks.size && !doIntersect(this.tracks, item.communities)) {
        return false;
      }
      return parent(item);
    };
  }

  stringify() {
    return JSON.stringify([
      super.stringify(),
      [...this.tracks].join(','),
    ]);
  }
}

export default Filter;
