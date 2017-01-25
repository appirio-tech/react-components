/**
 * This Filter class represents the filters managed by the FiltersPanel component.
 * Have a look at the base class for additional details.
 */

import _ from 'lodash';
import moment from 'moment';
import BaseFilter from '../Filter';

class Filter extends BaseFilter {

  constructor(filterString) {
    if (filterString) {
      // We expect the same format of the filterString, as created in stringify().
      const f = JSON.parse(filterString);
      super(f[0]);
      this.endDate = f[1] === '0' ? undefined : moment(f[1]);
      this.keywords = f[2].split(',');
      this.startDate = f[3] === '0' ? undefined : moment(f[3]);
      this.subtracks = f[4].split(',');
    } else {
      super();
      this.endDate = null;
      this.keywords = [];
      this.startDate = null;
      this.subtracks = [];
    }
  }

  clone() {
    const res = new Filter();
    _.merge(res, _.cloneDeep(this));
    return res;
  }

  count() {
    let res = super.count();
    res += this.keywords.length;
    res += this.subtracks.length;
    if (this.endDate || this.startDate) res += 1;
    return res;
  }

  getFilterFunction() {
    const parent = super.getFilterFunction();
    return (item) => {
      if (!parent(item)) return false;
      if (this.subtracks.length && this.subtracks[0]
      && !this.subtracks.includes(item.challengeType)) return false;
      if (this.startDate && this.startDate.isAfter(item.submissionEndDate)) return false;
      if (this.endDate && this.endDate.isBefore(item.postingDate)) return false;
      if (!this.keywords.length || !this.keywords[0]) return true;
      const platforms = item.platforms.join(' ');
      const techs = item.technologies.join(' ');
      const data = `${item.challengeName} ${platforms} ${techs}`.toLowerCase();
      for (let i = 0; i !== this.keywords.length; i += 1) {
        if (data.indexOf(this.keywords[i].toLowerCase()) >= 0) return true;
      }
      return false;
    };
  }

  stringify() {
    return JSON.stringify([
      super.stringify(),
      this.endDate ? this.endDate.toString() : '0',
      this.keywords.join(','),
      this.startDate ? this.startDate.toString() : '0',
      this.subtracks.join(','),
    ]);
  }
}

export default Filter;
