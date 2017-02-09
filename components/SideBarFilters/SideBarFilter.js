/**
 * The SideBarFilter extends the ChallengeFilter from the ChallengeFilters
 * component. This way any ChallengeFilter can be easily added to the sidebar.
 * At the same time, it adds some functionality necessary for standard filters
 * in the sidebar.
 */

import _ from 'lodash';
import uuid from 'uuid/v4';
import BaseFilter from '../ChallengeFilters/ChallengeFilter';

export const MODE = {
  ALL_CHALLENGES: 'All Challenges',
  MY_CHALLENGES: 'My Challenges',
  OPEN_FOR_REGISTRATION: 'Open for registration',
  ONGOING_CHALLENGES: 'Ongoing challenges',
  PAST_CHALLENGES: 'Past challenges',
  CUSTOM: 'custom',
};

class SideBarFilter extends BaseFilter {

  constructor(modeOrFilterString) {
    let f;
    try {
      f = JSON.parse(modeOrFilterString);
    } catch (e) { /* noop */ }
    if (f) {
      super(f[0]);
      this.mode = f[1];
      this.name = f[2];
      this.uuid = f[3];
    } else {
      super();
      this.name = this.mode = modeOrFilterString || MODE.ALL_CHALLENGES;
      this.uuid = uuid();
    }
  }

  clone() {
    const res = new SideBarFilter();
    _.merge(res, _.cloneDeep(this));
    return res;
  }

  count() {
    if (this.mode === MODE.CUSTOM) return super.count();
    return this.mode === MODE.ALL_CHALLENGES ? 0 : 1;
  }

  getFilterFunction() {
    switch (this.mode) {
      case MODE.ALL_CHALLENGES: return () => true;
      case MODE.MY_CHALLENGES: return item => item.registered;
      case MODE.OPEN_FOR_REGISTRATION: return item => item.registrationOpen.startsWith('Yes');
      case MODE.ONGOING_CHALLENGES: return item => !item.registrationOpen.startsWith('Yes');
      default: return super.getFilterFunction();
    }
  }

  stringify() {
    return JSON.stringify([
      super.stringify(),
      this.mode,
      this.name,
      this.uuid,
    ]);
  }
}

export default SideBarFilter;
