/**
 * The SideBarFilter extends the ChallengeFilter from the ChallengeFilters
 * component. This way any ChallengeFilter can be easily added to the sidebar.
 * At the same time, it adds some functionality necessary for standard filters
 * in the sidebar.
 */

import _ from 'lodash';
import uuid from 'uuid/v4';
import ChallengeFilter from '../ChallengeFilters/ChallengeFilter';

export const MODE = {
  ALL_CHALLENGES: 'All Challenges',
  MY_CHALLENGES: 'My Challenges',
  OPEN_FOR_REGISTRATION: 'Open for registration',
  ONGOING_CHALLENGES: 'Ongoing challenges',
  PAST_CHALLENGES: 'Past challenges',
  OPEN_FOR_REVIEW: 'Open for review',
  CUSTOM: 'custom',
};

class SideBarFilter extends ChallengeFilter {

  // In addition to the standard arguments accepted by all parent filter classes,
  // argument of this class may also be one of the filter modes, defined above.
  constructor(arg) {
    if (!arg) {
      super();
      this.mode = MODE.ALL_CHALLENGES;
      this.name = MODE.ALL_CHALLENGES;
      this.uuid = MODE.ALL_CHALLENGES;
    } else if (_.isObject(arg)) {
      if (!arg._isSideBarFilter) throw new Error('Invalid argument!');
      super(arg);
      this.mode = _.clone(arg.mode);
      this.name = _.clone(arg.name);
      this.uuid = _.clone(arg.uuid);
    } else if (_.isString(arg)) {
      try {
        const f = JSON.parse(atob(arg));
        super(f[0]);
        this.mode = f[1];
        this.name = f[2];
        this.uuid = f[3];
      } catch (e) {
        super();
        this.mode = arg;
        this.name = arg;
        this.uuid = arg === MODE.CUSTOM ? uuid() : this.mode;
      }
    } else throw new Error('Invalid argument!');
    this._isSideBarFilter = true;
  }

  count() {
    if (this.mode === MODE.CUSTOM) return super.count();
    return this.mode === MODE.ALL_CHALLENGES ? 0 : 1;
  }

  getFilterFunction() {
    switch (this.mode) {
      case MODE.ALL_CHALLENGES: return () => true;
      case MODE.MY_CHALLENGES: return item => item.myChallenge;
      case MODE.OPEN_FOR_REGISTRATION: return item => item.registrationOpen.startsWith('Yes');
      case MODE.OPEN_FOR_REVIEW: return item => item.currentPhaseName === 'Review';
      case MODE.ONGOING_CHALLENGES:
        return item => !item.registrationOpen.startsWith('Yes')
          && item.status === 'Active';
      case MODE.PAST_CHALLENGES: return item => item.status === 'Completed';
      default: return super.getFilterFunction();
    }
  }

  merge(filter) {
    super.merge(filter);
    if (!filter._isSideBarFilter) return this;
    this.mode = _.clone(filter.mode);
    this.name = _.clone(filter.name);
    this.uuid = _.clone(filter.uuid);
    return this;
  }

  stringify() {
    return btoa(JSON.stringify([
      super.stringify(),
      this.mode,
      this.name,
      this.uuid,
    ]));
  }
}

export default SideBarFilter;
