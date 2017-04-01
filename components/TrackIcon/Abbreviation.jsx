const Abbreviation = {
  DEVELOP: {
    DESIGN: 'Ds',
    DEVELOPMENT: 'Dv',
    SECURITY: 'Sc',
    PROCESS: 'Ps',
    TESTING_COMPETITION: 'Tg',
    SPECIFICATION: 'Sp',
    ARCHITECTURE: 'Ar',
    COMPONENT_PRODUCTION: 'Cp',
    BUG_HUNT: 'BH',
    DEPLOYMENT: 'Dp',
    TEST_SUITES: 'TS',
    ASSEMBLY_COMPETITION: 'As',
    UI_PROTOTYPE_COMPETITION: 'Pr',
    CONSEPTUALIZATION: 'Cn',
    RIA_BUILD_COMPETITION: 'RB',
    RIA_COMPONENT_COMPETITION: 'RC',
    TEST_SCENARIOS: 'Ts',
    SPEC_REVIEW: 'SR',
    COPILOT_POSTING: 'CP',
    CONTENT_CREATION: 'CC',
    REPORTING: 'Rp',
    DEVELOP_MARATHON_MATCH: 'MM',
    FIRST2FINISH: 'F2F',
    CODE: 'Cd',
  },
  DESIGN: {
    'BANNERS/ICONS': 'BI',
    WEB_DESIGN: 'Wb',
    WIREFRAMES: 'Wf',
    LOGO_DESIGN: 'Lg',
    'PRINT/PRESENTATION': 'PP',
    WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Wg',
    FRONT_END_FLASH: 'FL',
    'APPLICATION_FRONT-END_DESIGN': 'FE',
    STUDIO_OTHER: 'O',
    IDEA_GENERATION: 'IG',
    DESIGN_FIRST2FINISH: 'DF2F',
  },

  // TODO: When data science challenges are returned by the API v2, they have
  // their track set to `data` instead of `data_science` and their sub-track set
  // to `marathon` rather than `marathon_match`. However, just renaming existing
  // fields crushes the code, thus, as a rapid fix, the alternative entry is added
  // below.
  DATA_SCIENCE: {
    SRM: 'SRM',
    MARATHON_MATCH: 'MM',
  },
  DATA: {
    SRM: 'SRM',
    MARATHON: 'MM',
  },

  GENERIC: {
    GENERIC_SCORECARDS: 'G',
  }
}

export default Abbreviation;
