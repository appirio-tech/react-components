export default [
  {
    name: 'All Challenges',
    allIncluded: true,
    sortingOptions: ['Most recent'],
  },
  {
    name: 'Open for registration',
    check(item) {
      return item.registrationOpen.startsWith('Yes') && item.status === 'Active';
    },
    sortingOptions: [
      'Most recent',
      'Time to register',
      'Phase end time',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    info: {
      phaseName: 'registration',
    },
    getApiUrl: pageIndex => `http://api.topcoder.com/v2/challenges/open?pageIndex=${pageIndex}&pageSize=50`,
  },
  {
    name: 'My challenges',
    check(item) {
      return item.myChallenge;
    },
    sortingOptions: [
      'Most recent',
      'Time to submit',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    getApiUrl: pageIndex => `http://api.topcoder.com/v2/user/challenges?&pageIndex=${pageIndex}&pageSize=50`,
  },
  {
    name: 'Ongoing challenges',
    check(item) {
      return !item.registrationOpen.startsWith('Yes') && item.status === 'Active';
    },
    sortingOptions: [
      'Most recent',
      'Current phase',
      'Title A-Z',
      'Prize high to low',
    ],
    getApiUrl: pageIndex => `http://api.topcoder.com/v2/challenges/active?pageIndex=${pageIndex}&pageSize=50`,
  },
  {
    name: 'Past challenges',
    check(item) {
      return item.status === 'Completed';
    },
    sortingOptions: [
      'Most recent',
      'Title A-Z',
      'Prize high to low',
    ],
    getApiUrl: pageIndex => `http://api.topcoder.com/v2/challenges/past?pageIndex=${pageIndex}&pageSize=50`,
  },
  {
    name: 'Open for review',
    check(item) {
      return item.currentPhaseName === 'Review';
    },
    sortingOptions: [
      'Most recent',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    getApiUrl: (pageIndex) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toJSON().slice(0, 10);

      return `http://api.topcoder.com/v2/challenges/open?pageIndex=${pageIndex}&pageSize=50&submissionEndTo=${yesterdayFormatted}`;
    },
  },
];
