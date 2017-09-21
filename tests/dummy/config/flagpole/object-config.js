/* eslint-env node */
'use strict';

module.exports = {
  alwaysTrue: {
    default: true
  },
  alwaysFalse: {
    default: false
  },
  trueInTest: {
    default: false,
    environments: {
      test: true
    }
  }
};
