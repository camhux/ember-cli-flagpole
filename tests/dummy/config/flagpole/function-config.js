/* eslint-env node */
'use strict';

module.exports = function(flag) {
  flag('alwaysTrue')
    .default(true);

  flag('alwaysFalse')
    .default(false);

  flag('trueInTest')
    .default(false)
    .env('test', true);
};
